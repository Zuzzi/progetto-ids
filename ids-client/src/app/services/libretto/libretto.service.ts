import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  misureStream: BehaviorSubject<Misura[]>;
  dataStore: Misura[];
  private contract: Contract;

  constructor(@Inject(WEB3) private web3: Web3, private blockchainService: BlockchainService, private authService: AuthService) {
    this.misureStream =  new BehaviorSubject([]) as BehaviorSubject<Misura[]>;
    this.dataStore = [];
   }

   init(contractId: string) {
     const abi: AbiItem[] = contractABI as AbiItem[];
     const address = this.authService.getAddress(contractId,'libretto');
     this.contract = new this.web3.eth.Contract(abi,address);

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
