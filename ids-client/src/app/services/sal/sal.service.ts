import { Injectable } from '@angular/core';
import { Sal, SmartContractType, SmartContract } from '@app/interfaces';
import { Observable, Subject, from, forkJoin } from 'rxjs';
import { concatMap, take, map } from 'rxjs/operators';
import { BlockchainService } from '../blockchain/blockchain.service';
import { NumberFormatStyle } from '@angular/common';
import { ParametriService } from '../parametri/parametri.service';

@Injectable({
  providedIn: 'root'
})
export class SalService {

  private salStream: Subject<any>;
  sal: Observable<any>;
  private salStore: Sal[];
  constructor(private blockchainService: BlockchainService,
              private parametriService: ParametriService) {
    this.salStream =  new Subject() as Subject<any>;
    this.salStore = [];
    this.sal = this.salStream.asObservable();
   }

  // getInfoPagamento()

  loadSal(contractSal: SmartContract<SmartContractType.Sal>,
          contractParametri: SmartContract<SmartContractType.Parametri>) {
    const vociSal = this.getSal(contractSal).pipe(
      map(sal => {
        return this.groupSal(this.formatSal(sal));
      })
    );
    const soglie = this.parametriService.loadSoglie(contractParametri);
    return forkJoin(vociSal, soglie).pipe(
      map(sal => {
      const groupedSal = [];
      const vociSal = sal[0];
      const soglie = sal[1];
      for (let i = 0; (soglie[i].superata) && (i < soglie.length); i++) {
          groupedSal.push({no: soglie[i].no, valore: soglie[i].valore,
            data: vociSal[i][0].data, vociSal: vociSal[i]});
      }
      return groupedSal;
    }));
  }

  updateSal(sal) {
    this.salStore = sal;
    this.salStream.next(Object.assign([], this.salStore));
  }

  getSal(contract: SmartContract<SmartContractType.Sal>) {
    return from(contract.instance.methods.numeroSal().call()).pipe(
      concatMap(numeroSal => {
        const sal: any[] = [];
        for (let i = 0; i < numeroSal; i++) {
          sal.push(from(contract.instance.methods.getSal(i).call()));
        }
        return forkJoin(sal); // fare nested forkjoin con object of array
      }),
      take(1), // per sicurezza anche se gli observable generati da promise completano dopo una singola emissione
    );
  }

  getInfoPagamento(contract: SmartContract<SmartContractType.Sal>) {
    return from(contract.instance.methods.getInfoPagamento().call());
  }

  approvaRegistro(contract: SmartContract<SmartContractType.Sal>) {
    const approva = contract.instance.methods.approvaRegistro();
    return this.blockchainService.newTransaction(approva, contract.instance.address);
  }

  groupSal(sal: Sal[]) {
    const groupedMap = new Map();
    sal.forEach(item => {
      const key = Number(item.data);
      const collection = groupedMap.get(key);
      if (!collection) {
        groupedMap.set(key, [item]);
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
      data: sal['2'],
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

}
