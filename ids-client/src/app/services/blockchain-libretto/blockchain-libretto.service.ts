import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Misura} from '../../interfaces';
import {WEB3} from '@app/web3.token';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

@Injectable({
  providedIn: 'root'
})
export class BlockchainLibrettoService {
  misureStream: BehaviorSubject<Misura[]>;
  dataStore: Misura[];
  private contract: Contract;

  constructor(@Inject(WEB3) private web3: Web3) {
    this.misureStream =  new BehaviorSubject([]) as BehaviorSubject<Misura[]>;
    this.dataStore = [];
   }
   
   init() {
     abi = this.blockchainService.getAbi();
     address = this.blockchainService.getAddress();
     this.contract = 

  }

   loadMisure() {
    const contractID = '';
    const address: string = this.contract.find(element => element._id === contractID).address;
    const abi = this.contract.find(element => element.type === 'master').abi;
    const smartContract = new this.web3.eth.Contract(abi, address);
    const numeroMisure = smartContract.methods.getNumeroMisure().call();
    let i;
    for (i = 0; i < numeroMisure; i++) {
      this.dataStore.push(smartContract.methods.getMisura(i).call());
      this.misureStream.next(Object.assign({}, this.dataStore));
    }

   }

}
