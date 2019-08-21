import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, forkJoin, Subject, ReplaySubject, EMPTY, combineLatest } from 'rxjs';
import { concatMap, take, tap, map, filter, takeUntil } from 'rxjs/operators';
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

  // private readonly TYPE: ContractType = 'registro';
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

  // switchToContract(contractId: string) {
  //   if (!(this.contractId === contractId)) {
  //     this.contractId = contractId;
  //     const abi: AbiItem[] = contractABI as AbiItem[];
  //     // TODO: gestire il caso in cui l'id del contratto non si trova tra quelli dell'utente
  //     const address = this.authService.getAddress(contractId, this.TYPE);
  //     // TODO: spostare creazione istanza contratto in blockchain
  //     // in modo da non utilizzare web3 direttamente qui
  //     const web3 = this.blockchainService.getWeb3();
  //     this.contract = new web3.eth.Contract(abi, address);
  //   }
  // }

  switchToContract(contractId: string) {
    this.contractId = contractId;
    this.registro = this.blockchainService.getSmartContract(contractId,
      SmartContractType.Registro) as SmartContract<SmartContractType.Registro>;
    this.isContractChanged.next();
  }

  // clear() {
  //   this.vociRegistroStream.next();
  // }

  loadContabilita() {
    this.isLoading.next(true);
    return this.getContabilita().pipe(
      takeUntil(this.isContractChanged.asObservable()),
      map(vociRegistro => {
        return this.formatContabilita(vociRegistro);
      })
    );
  }

  updateContabilita(vociRegistro) {
    this.vociRegistroStore = vociRegistro;
    this.vociRegistroStream.next(Object.assign([], this.vociRegistroStore));
    this.isLoading.next(false);
  }


  getContabilita() {
    return from(this.registro.instance.methods.numeroContabilita().call()).pipe(
      concatMap(numerovociRegistro => {
        const vociRegistro: any[] = [];
        for (let i = 0; i < numerovociRegistro; i++) {
          vociRegistro.push(from(this.registro.instance.methods.getContabilita(i).call()));
        }
        return forkJoin(vociRegistro);
      }),
      take(1), // per sicurezza anche se gli observable generati da promise completano dopo una singola emissione
    );
  }

  approvaMisure() {
    const approva = this.registro.instance.methods.approvaMisure();
    return this.blockchainService.newTransaction(approva, this.registro.instance.address);
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
