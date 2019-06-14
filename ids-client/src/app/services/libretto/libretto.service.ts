import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, from, forkJoin } from 'rxjs';
import { concatMap } from 'rxjs/operators'
import {Misura} from '../../interfaces';
import {WEB3} from '@app/web3.token';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import { AuthService } from '../auth/auth.service';
import contractABI from '@app/model/ABIs/ContractMisure.json'
import { AbiItem } from 'web3-utils';

@Injectable({
  providedIn: 'root'
})
export class LibrettoService {
  private readonly TYPE = 'libretto';
  private misureStream: BehaviorSubject<Misura[]>;
  misure: Observable<Misura[]>;
  private misureStore: Misura[];
  private contract: Contract;

  constructor(private blockchainService: BlockchainService, private authService: AuthService) {
    this.misureStream =  new BehaviorSubject([]) as BehaviorSubject<Misura[]>;
    this.misureStore = [];
    this.misure = this.misureStream.asObservable();
  }

  init(contractId: string) {
    this.misureStore = [];
    this.misureStream.next(Object.assign({}, this.misureStore));
    const abi: AbiItem[] = contractABI as AbiItem[];
    const address = this.authService.getAddress(contractId, this.TYPE);
    // TODO: spostare creazione istanza contratto in blockchain
    // in modo da non utilizzare web3 direttamente qui
    const web3 = this.blockchainService.getWeb3();
    this.contract = new web3.eth.Contract(abi, address);
  }

  loadMisure() {
    from(this.contract.methods.getNumeroMisure().call()).pipe(
      concatMap(numeroMisure => {
        const misure: any[] = [];
        for (let i = 0; i < numeroMisure; i++) {
          misure.push(from(this.contract.methods.getMisura(i).call()));
        }
        return forkJoin(misure);
      }),

    ).subscribe(misure => {
      this.misureStore = this.formatMisure(misure);
      this.misureStream.next(Object.assign([], this.misureStore));
    });
  }

  formatMisure(misure) {
    const formatted: Misura[] = [];
    misure.forEach(misura => {
      formatted.push({no: misura['0'], tariffa: misura['1'], data: misura['2'],
      categoriaContabile: misura['3'], descrizione: misura['4'],
      percentuale: this.blockchainService.signed64x64ToNumber(misura['5']),
      riserva: misura['6']});
    });
    return formatted;
  }

  //  loadMisure() {
  //   const contractID = '';
  //   const address: string = this.contract.find(element => element._id === contractID).address;
  //   const abi = this.contract.find(element => element.type === 'master').abi;
  //   const smartContract = new this.web3.eth.Contract(abi, address);
  //   const numeroMisure = smartContract.methods.getNumeroMisure().call();
  //   let i;
  //   for (i = 0; i < numeroMisure; i++) {
  //     this.dataStore.push(smartContract.methods.getMisura(i).call());
  //     this.misureStream.next(Object.assign({}, this.dataStore));
  //   }

  //  }

}
