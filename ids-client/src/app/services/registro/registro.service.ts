import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, forkJoin, Subject, ReplaySubject, EMPTY, combineLatest, of, concat, defer } from 'rxjs';
import { concatMap, take, tap, map, filter, takeUntil, concatMapTo, finalize } from 'rxjs/operators';
import {VoceRegistro, DialogInserimentoMisura, SmartContractType, SmartContract} from '@app/interfaces';
import {WEB3} from '@app/web3.token';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import { AuthService } from '../auth/auth.service';
import contractABI from '@app/model/ABIs/ContractRegistro.json';
import { AbiItem, toChecksumAddress } from 'web3-utils';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private vociRegistroStream: Subject<VoceRegistro[]>;
  vociRegistro: Observable<VoceRegistro[]>;
  private vociRegistroStore: VoceRegistro[];
  private isLoading: Subject<boolean>;
  isLoadingObs: Observable<boolean>;
  private isContractChanged: Subject<any>;
  private registro: SmartContract<SmartContractType.Registro>;
  private contractId: string;


  constructor(private blockchainService: BlockchainService) {
    this.vociRegistroStream =  new ReplaySubject(1) as ReplaySubject<VoceRegistro[]>;
    this.isLoading = new ReplaySubject(1) as ReplaySubject<boolean>;
    this.isContractChanged = new Subject();
    this.isLoadingObs = this.isLoading.asObservable();
    this.vociRegistro = combineLatest(this.vociRegistroStream.asObservable(),
    this.isLoading.asObservable()).pipe(
      tap(([vociRegistro, isLoading]) => console.log('vociRegistro: ' + vociRegistro.length,'isloading: ' + isLoading)),
      filter(([_, isLoading]) => !isLoading),
      map(([vociRegistro, _]) => vociRegistro)
    );
  }

  switchToContract(contractId: string) {
    this.contractId = contractId;
    this.registro = this.blockchainService.getSmartContract(contractId,
      SmartContractType.Registro) as SmartContract<SmartContractType.Registro>;
    this.isContractChanged.next();
  }

  loadContabilita() {
    return concat(
      of().pipe(
        finalize(() => this.isLoading.next(true))),
      this.getContabilita().pipe(
        takeUntil(this.isContractChanged),
        map(vociRegistro => {
          return this.formatContabilita(vociRegistro);
        }),
      tap(vociRegistro => this.updateContabilita(vociRegistro))
    ));
  }

  updateContabilita(vociRegistro) {
    this.vociRegistroStore = vociRegistro;
    this.vociRegistroStream.next(Object.assign([], this.vociRegistroStore));
    this.isLoading.next(false);
  }

  getContabilita() {
    return defer(() =>
    from(this.registro.instance.methods.numeroContabilita().call()))
    .pipe(
      concatMap(numerovociRegistro => {
        if (Number(numerovociRegistro) !== 0) {
          const vociRegistro: any[] = [];
          for (let i = 0; i < numerovociRegistro; i++) {
            vociRegistro.push(from(this.registro.instance.methods.getContabilita(i).call()));
          }
          return forkJoin(vociRegistro);
        } else {
          return of([]);
        }
      }),
      take(1), // per sicurezza anche se gli observable generati da promise completano dopo una singola emissione
    );
  }

  approvaMisure() {
    const approva = this.registro.instance.methods.approvaMisure();
    return this.blockchainService.newTransaction(approva, this.registro.instance.address).pipe(
      concatMapTo(this.loadContabilita()),
      takeUntil(this.isContractChanged)
    );
  }

  formatContabilita(vociRegistro) {
    const formatted: VoceRegistro[] = [];
    vociRegistro.forEach(voceRegistro => {
      formatted.push({no: voceRegistro['0'],
      tariffa: voceRegistro['1'],
      data: voceRegistro['2'],
      categoriaContabile: voceRegistro['3'],
      descrizione: voceRegistro['4'],
      percentuale: this.blockchainService.signed64x64ToNumber(voceRegistro['5']),
      prezzoValore: this.blockchainService.signed64x64ToNumber(voceRegistro['6']),
      prezzoPercentuale: this.blockchainService.signed64x64ToNumber(voceRegistro['7']),
      debitoValore: this.blockchainService.signed64x64ToNumber(voceRegistro['8']),
      debitoPercentuale: this.blockchainService.signed64x64ToNumber(voceRegistro['9']),
      pagata: voceRegistro['10']});
    });
    return formatted;
  }

}
