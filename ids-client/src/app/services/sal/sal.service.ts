import { Injectable } from '@angular/core';
import { Sal, SmartContractType, SmartContract, InfoPagamento } from '@app/interfaces';
import { Observable, Subject, from, forkJoin, ReplaySubject, combineLatest, of, concat, defer } from 'rxjs';
import { concatMap, take, map, tap, filter, takeUntil, concatMapTo, finalize, withLatestFrom } from 'rxjs/operators';
import { BlockchainService } from '../blockchain/blockchain.service';
import { NumberFormatStyle } from '@angular/common';
import { ParametriService } from '../parametri/parametri.service';
import { until } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class SalService {

  private vociSalStream: Subject<any>;
  vociSal: Observable<any>;
  private vociSalStore: Sal[];
  private isLoading: Subject<boolean>;

  private infoStream: Subject<InfoPagamento>;
  infoPagamento: Observable<any>;
  private infoStore: InfoPagamento;
  private isLoadingInfo: Subject<boolean>;

  // isLoadingObs: Observable<boolean>;
  private isContractChanged: Subject<any>;
  sal: SmartContract<SmartContractType.Sal>;
  private contractId: string;


  constructor(private blockchainService: BlockchainService,
              private parametriService: ParametriService) {
    this.vociSalStream =  new ReplaySubject(1) as ReplaySubject<any>;
    this.isLoading = new ReplaySubject(1) as ReplaySubject<boolean>;
    this.isContractChanged = new Subject();
    this.infoStream = new ReplaySubject(1) as ReplaySubject<InfoPagamento>;
    this.isLoadingInfo = new ReplaySubject(1) as ReplaySubject<boolean>;
    // this.isLoadingObs = this.isLoading.asObservable();
    this.vociSal = this.isLoading.pipe(
      withLatestFrom(this.vociSalStream),
      tap(([isLoading, vociSal]) => console.log('vociSal: ' + vociSal.length, 'isloading: ' + isLoading)),
      map(([isLoading, vociSal]) => {
        if (isLoading) {
          return {isLoading, data: []};
        } else {
          return {isLoading, data: vociSal};
        }
      }),
    );
    this.infoPagamento = this.isLoadingInfo.pipe(
      withLatestFrom(this.infoStream),
      tap(([isLoading, info]) => console.log('infoPagamento: ' + info, 'isloading: ' + isLoading)),
      map(([isLoading, info]) => {
        if (isLoading) {
          return {isLoading, data: {} };
        } else {
          return {isLoading, data: info};
        }
      }),
    );
   }

   switchToContract(contractId: string) {
    this.contractId = contractId;
    this.sal = this.blockchainService.getSmartContract(contractId,
      SmartContractType.Sal) as SmartContract<SmartContractType.Sal>;
    this.isContractChanged.next();
  }

  // getInfoPagamento()

  loadSal() {
    const vociSal = of(true).pipe(
        tap(() => this.isLoading.next(true)),
      concatMapTo(this.getSal().pipe(
        map(sal => {
          return this.groupSal(this.formatSal(sal));
        })
    )));
    const soglie = this.parametriService.loadSoglie();
    return forkJoin(vociSal, soglie).pipe(
      takeUntil(this.isContractChanged),
      map(sal => {
      const groupedSal = [];
      const vociSal = sal[0];
      const soglie = sal[1];
      for (let i = 0; (soglie[i].superata) && (i < soglie.length); i++) {
          groupedSal.push({no: soglie[i].no, valore: soglie[i].valore,
            data: vociSal[i][0].data, vociSal: vociSal[i]});
      }
      return groupedSal;
    }),
    tap(sal => this.updateSal(sal))
    );
  }

  loadInfoPagamento() {
    return of(true).pipe(
      tap(() => this.isLoadingInfo.next(true)),
      concatMapTo(this.getInfoPagamento().pipe(
        takeUntil(this.isContractChanged),
        map(info => {
          return this.formatInfoPagamento(info);
        }),
        tap(info => this.updateInfoPagamento(info))
      )));
  }

  updateSal(sal) {
    this.vociSalStore = sal;
    this.vociSalStream.next(Object.assign([], this.vociSalStore));
    this.isLoading.next(false);
  }

  updateInfoPagamento(info) {
    this.infoStore = info;
    this.infoStream.next(Object.assign([], this.infoStore));
    this.isLoadingInfo.next(false);
  }

  getSal() {
    return defer(() =>
    from(this.sal.instance.methods.numeroSal().call()))
    .pipe(
      concatMap(numeroSal => {
        if (Number(numeroSal) !== 0) {
          const sal: any[] = [];
          for (let i = 0; i < numeroSal; i++) {
            sal.push(from(this.sal.instance.methods.getSal(i).call()));
          }
          return forkJoin(sal); // fare nested forkjoin con object of array
        } else {
          return of([]);
        }
      }),
      take(1), // per sicurezza anche se gli observable generati da promise completano dopo una singola emissione
    );
  }

  getInfoPagamento() {
    return defer(() =>
    from(this.sal.instance.methods.getInfoPagamento().call())
    .pipe(
      take(1), // per sicurezza anche se gli observable generati da promise completano dopo una singola emissione
    ));
  }

  approvaRegistro() {
    const approva = this.sal.instance.methods.approvaRegistro();
    return this.blockchainService.newTransaction(approva, this.sal.instance.address).pipe(
      concatMapTo(this.loadSal()),
      takeUntil(this.isContractChanged)
    );
  }

  groupSal(sal: Sal[]) {
    const groupedMap = new Map();
    sal.forEach(item => {
      const key = item.data;
      const collection = groupedMap.get(key.getTime());
      if (!collection) {
        groupedMap.set(key.getTime(), [item]);
      } else {
        collection.push(item);
      }
    });
    const groupedArray = [];
    groupedMap.forEach(value => {
      groupedArray.push(value);
    });
    return groupedArray;
  }

  formatSal(sal) {
    const formatted: Sal[] = [];
    sal.forEach(sal => {
      formatted.push({no: sal['0'],
      tariffa: sal['1'],
      data: this.blockchainService.epochToDate(sal['2']),
      categoriaContabile: sal['3'],
      descrizione: sal['4'],
      percentuale: this.blockchainService.signed64x64ToNumber(sal['5']),
      prezzoValore: this.blockchainService.signed64x64ToNumber(sal['6']),
      prezzoPercentuale: this.blockchainService.signed64x64ToNumber(sal['7']),
      debitoValore: this.blockchainService.signed64x64ToNumber(sal['8']),
      debitoPercentuale: this.blockchainService.signed64x64ToNumber(sal['9'])});
    });
    return formatted;
  }

  formatInfoPagamento(info): InfoPagamento {
    return {
      totaleLavoriAcorpo: this.blockchainService.signed64x64ToNumber(info[0]),
      percentualeLavoriAcorpo: this.blockchainService.signed64x64ToNumber(info[1]),
      totalePagato: this.blockchainService.signed64x64ToNumber(info[2]),
    };
  }

}
