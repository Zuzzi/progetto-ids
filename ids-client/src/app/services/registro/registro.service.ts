import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, forkJoin, Subject, ReplaySubject, EMPTY } from 'rxjs';
import { concatMap, take, tap, map } from 'rxjs/operators';
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
  registro: SmartContract<SmartContractType.Registro>;
  private contractId: string;


  constructor(private blockchainService: BlockchainService) {
    this.vociRegistroStream =  new ReplaySubject(1) as ReplaySubject<VoceRegistro[]>;
    this.vociRegistroStore = [];
    this.vociRegistro = this.vociRegistroStream.asObservable();
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
  }

  clear() {
    this.vociRegistroStream.next();
  }

  loadContabilita() {
    return this.getContabilita(this.registro).pipe(
      map(vociRegistro => {
        return this.formatContabilita(vociRegistro);
      })
    );
  }

  updateContabilita(vociRegistro) {
    this.vociRegistroStore = vociRegistro;
    this.vociRegistroStream.next(Object.assign([], this.vociRegistroStore));
  }


  getContabilita(contract: SmartContract<SmartContractType.Registro>) {
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
