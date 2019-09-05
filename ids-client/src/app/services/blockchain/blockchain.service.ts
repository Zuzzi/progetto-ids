import { Injectable, Inject } from '@angular/core';
import Web3 from 'web3';
import { Account } from 'web3-eth-accounts';
import { from, Observable, Subject, BehaviorSubject, interval, } from 'rxjs';
import { concatMap, take, tap, delay, publishReplay, refCount } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Misura, SmartContractType, SmartContract} from '../../interfaces';
import ParametriAbi from '@app/model/ABIs/ContractParametri.json';
import LibrettoAbi from '@app/model/ABIs/ContractMisure.json';
import SalAbi from '@app/model/ABIs/ContractSal.json';
import GiornaleAbi from '@app/model/ABIs/ContractGiornale.json';
import RegistroAbi from '@app/model/ABIs/ContractRegistro.json';
import { AbiItem } from 'web3-utils';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  private web3: Web3;
  private account: Account;
  private txEventsStream = new BehaviorSubject({isTransacting: false, message: ''}) as BehaviorSubject<any>;
  txEvents = this.txEventsStream.asObservable().pipe(
    tap(value => console.log(value)),
    publishReplay(1),
    refCount()
  ) as Observable<any>;

  constructor(private http: HttpClient,
              private userService: UserService) {
    const options = {
      defaultAccount: '0xed9d02e382b34818e88b88a309c7fe71e65f419d',
      defaultGasPrice: '0',
      defaultGas: 4500000,
      transactionConfirmationBlocks: 1,
    };
    this.web3 = new Web3(new Web3.providers.WebsocketProvider(
      'ws://localhost:22000'),
      null,
      options);
  }

  setAccount(privateKey) {
    this.account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
  }

  getSmartContract(contractId: string, type: SmartContractType) {
    let abi: AbiItem[];
    switch (type) {
      case SmartContractType.Libretto: {
        abi = LibrettoAbi as AbiItem[];
        break;
      }
      case SmartContractType.Registro: {
        abi = RegistroAbi as AbiItem[];
        break;
      }
      case SmartContractType.Sal: {
        abi = SalAbi as AbiItem[];
        break;
      }
      case SmartContractType.Giornale: {
        abi = GiornaleAbi as AbiItem[];
        break;
      }
      case SmartContractType.Parametri: {
        abi = ParametriAbi as AbiItem[];
        break;
      }
      default: {
        throw new Error('Invalid Smart Contract Type');
      }
    }
    const address = this.userService.getContractById(contractId)[type].address;
    const contractInstance = new this.web3.eth.Contract(abi, address);
    return new SmartContract(type, contractInstance);
  }

  newTransaction(data, contractAddress) {
    this.txEventsStream.next({isTransacting: true, message: 'Inizio Transazione'});
    const encodedData = data.encodeABI();
    return this.getTransactionCount().pipe(
      concatMap(nonce => {
        console.log('Transaction count: ' + nonce);
        this.txEventsStream.next({isTransacting: true, message: 'Numero Transazione: ' + nonce});
        return this.signTransaction(encodedData, nonce, contractAddress);
      }),
      concatMap(signedTx => {
        console.log('Transaction Signed!');
        this.txEventsStream.next({isTransacting: true, message: 'Transazione in corso'});
        return this.sendSignedTransaction(signedTx);
      }),
      tap(() => {
        console.log('Transaction Completed!');
        this.txEventsStream.next({isTransacting: true, message: 'Transazione Completata'});
        this.txEventsStream.next({isTransacting: false, message: ''});
      }),
      take(1), // per sicurezza anche se gli observable generati da promise completano dopo una singola emissione
    );
  }

  private getTransactionCount() {
    return from(this.web3.eth.getTransactionCount(this.account.address));
  }

  private signTransaction(encodedData, nonce: number, contractAddress: string) {
    const tx = {from: this.account.address, to: contractAddress,
      gas: this.web3.defaultGas, data: encodedData, chainId: 10, nonce: nonce};
      console.log(tx.gas);
    return from(this.web3.eth.accounts
      .signTransaction(tx, this.account.privateKey));
  }

  private sendSignedTransaction(signedTx) {
    console.log('Sending Transaction...');
    // TODO: implementare da soli la conversione da promise a observable
    // per separare la promise dagli eventi (con from(promise.on()) non vengono emessi valori)
    return from(this.web3.eth.sendSignedTransaction(signedTx.rawTransaction));
      // .on('transactionHash', hash => {
      //   console.log('Transaction Hash ' + hash);
      //   this.txEventsStream.next({type: 'confirmation', data: hash});
      // })
      // .on('receipt', receipt => {
      //   console.log('Genereted Transaction Receipt');
      //   this.txEventsStream.next({type: 'receipt', data: receipt});
      // })
      // .on('confirmation', confirmationNumber => {
      //   console.log('Confirmation n. ' + confirmationNumber);
      //   this.txEventsStream.next({type: 'confirmation',
      //                             data: confirmationNumber});
      // })
  }

  numberToSigned64x64(number: number): string {
    return '0x' + (number * Math.pow(2, 64)).toString(16);
  }

  signed64x64ToNumber(signed64x64: number): number {
    return signed64x64 / Math.pow(2, 64);
  }

  epochToDate(epoch: number): Date {
    return new Date(epoch * 1000);
  }

  dateToEpoch(date: Date): number {
    return date.getTime() / 1000.0;
  }

}
