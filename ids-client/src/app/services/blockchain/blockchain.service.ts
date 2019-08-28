import { Injectable, Inject } from '@angular/core';
import Web3 from 'web3';
import {WEB3} from '@app/web3.token';
import {writeFileSync, fstat} from 'fs';
import { EncryptedKeystoreV3Json, Account } from 'web3-eth-accounts';
import { from, Observable, BehaviorSubject, ReplaySubject, Subject, } from 'rxjs';
import { concatMap, take, tap } from 'rxjs/operators';
import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Misura, SmartContractType, SmartContract} from '../../interfaces';
import ParametriAbi from '@app/model/ABIs/ContractParametri.json';
import LibrettoAbi from '@app/model/ABIs/ContractMisure.json';
import SalAbi from '@app/model/ABIs/ContractSal.json';
import GiornaleAbi from '@app/model/ABIs/ContractGiornale.json';
import RegistroAbi from '@app/model/ABIs/ContractRegistro.json';
import { AssertionError } from 'assert';
import { AbiItem } from 'web3-utils';
import { UserService } from '../user/user.service';
// import { AuthService } from '@app/services/auth/auth.service';



@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  private web3: Web3;
  private account: Account;
  private txEventsStream: Subject<any>;
  txEvents: Observable<Misura[]>;
  // private contracts: Array<any>;
  //private contractsSources: Array<any>;
  //TODO: eliminare web3 injectionProvider
  constructor(private http: HttpClient, @Inject(WEB3) private _web3: Web3,
              private userService: UserService) {
    const options = {
      defaultAccount: '0xed9d02e382b34818e88b88a309c7fe71e65f419d',
      defaultGasPrice: '0',
      defaultGas: 4500000,
      transactionConfirmationBlocks: 1,
    };
    // this.web3 = new Web3(new Web3.providers.HttpProvider(
    //   'http://localhost:22000', {headers: [{name: 'Access-Control-Allow-Origin', value: '*'}]}),
    //   null,
    //   options);
    this.web3 = new Web3(new Web3.providers.WebsocketProvider(
      'ws://localhost:22000'),
      null,
      options);
    this.txEventsStream = new Subject();
    this.txEvents = this.txEventsStream.asObservable();
  }
  // TODO: probabilmente questa funzione non serve
  // registerAccount(password: string) {
  //   const newAccount = this.web3.eth.accounts.create();
  //   const newAddress = newAccount.address;
  //   const newPrivateKey = newAccount.privateKey;
  //   const keystore = this.web3.eth.accounts.encrypt(newPrivateKey, password);
  //   // soluzione temporanea, il keystore andrà salvato nel db
  //   try {
  //     writeFileSync('../../../keys/' + newAddress, keystore);
  //     console.log('keystore written in file succesfully');
  //   } catch (err) {
  //     console.log('error in writing keystore to file:');
  //     console.log(err);
  //   }
  //   // salvare indirizzo account nel database
  // }

  /* getAccount() {
    return this.account;
  } */

  // getWeb3() {
  //   return this.web3;
  // }

  // loadContracts(contracts) {
  //   this.contracts = contracts;
  // }

  unlockAccount(keystore, password: string) {
    this.account = this.web3.eth.accounts.decrypt(keystore, password);
  }

  lockAccount() {
    delete this.account;
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
    // TODO: gestire il caso in cui l'id del contratto non si trova tra quelli dell'utente
    const address = this.userService.getAddress(contractId, type);
    const contractInstance = new this.web3.eth.Contract(abi, address);
    return new SmartContract(type, contractInstance);
  }

  newTransaction(data, contractAddress) {
    const encodedData = data.encodeABI();
    return this.getTransactionCount().pipe(
      concatMap(nonce => {
        console.log('Transaction count: ' + nonce);
        return this.signTransaction(encodedData, nonce, contractAddress);
      }),
      concatMap(signedTx => {
        console.log('Transaction Signed!');
        // this.txEventsStream.next({type: 'signed', data: signedTx});
        return this.sendSignedTransaction(signedTx);
      }),
      tap(() => console.log('Transaction Completed!')),
      // tap((receipt) => this.txEventsStream.next({type: 'completed', data: receipt})),
      take(1), // per sicurezza anche se gli observable generati da promise completano dopo una singola emissione
    );
  }

  private getTransactionCount() {
    return from(this.web3.eth.getTransactionCount(this.account.address));
  }

  private signTransaction(encodedData, nonce: number, contractAddress: string) {
    const tx = {from: this.account.address, to: contractAddress,
      gas: this.web3.defaultGas, data: encodedData, chainId: 10, nonce: nonce};
    return from(this.web3.eth.accounts
      .signTransaction(tx, this.account.privateKey));
  }

  private sendSignedTransaction(signedTx) {
    console.log('Sending Transaction...');
    // TODO: implementare da soli la conversione da promise a observable
    // per separare la promise dagli eventi (con from(promise.on()) non vengono emessi valori)
    return from(this.web3.eth.sendSignedTransaction(signedTx.rawTransaction)
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
    );
  }

  numberToSigned64x64(number: number): number {
    return number * Math.pow(2, 64);
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