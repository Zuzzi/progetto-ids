import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, forkJoin } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';
import {VoceRegistro, ContractType, DialogInserimentoMisura} from '@app/interfaces';
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

  private readonly TYPE: ContractType = 'registro';
  // TODO: valuta utilizzo replaysubject(1)
  private vociRegistroStream: BehaviorSubject<VoceRegistro[]>;
  vociRegistro: Observable<VoceRegistro[]>;
  private vociRegistroStore: VoceRegistro[];
  private contract: Contract;

  constructor(private blockchainService: BlockchainService,
              private authService: AuthService) {
    this.vociRegistroStream =  new BehaviorSubject([]) as BehaviorSubject<VoceRegistro[]>;
    this.vociRegistroStore = [];
    this.vociRegistro = this.vociRegistroStream.asObservable();
  }

  init(contractId: string) {
    this.vociRegistroStore = [];
    this.vociRegistroStream.next(Object.assign({}, this.vociRegistroStore));
    const abi: AbiItem[] = contractABI as AbiItem[];
    const address = this.authService.getAddress(contractId, this.TYPE);
    // TODO: spostare creazione istanza contratto in blockchain
    // in modo da non utilizzare web3 direttamente qui
    const web3 = this.blockchainService.getWeb3();
    this.contract = new web3.eth.Contract(abi, address);
  }

  loadContabilita() {
    this.getContabilita().subscribe(vociRegistro => {
      this.vociRegistroStore = this.formatContabilita(vociRegistro);
      this.vociRegistroStream.next(Object.assign([], this.vociRegistroStore));
    });
  }

  getContabilita() {
    return from(this.contract.methods.numeroContabilita().call()).pipe(
      take(1),
      concatMap(numerovociRegistro => {
        const vociRegistro: any[] = [];
        for (let i = 0; i < numerovociRegistro; i++) {
          vociRegistro.push(from(this.contract.methods.getContabilita(i).call()));
        }
        return forkJoin(vociRegistro);
      }),
    );
  }

  approvaMisure() {
    const approva = this.contract.methods.approvaMisure();
    this.blockchainService
      .newTransaction(approva, this.contract.address)
      .subscribe(() => {
        console.log('Transaction completed !');
        this.loadContabilita();
      });
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
