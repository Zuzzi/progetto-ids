import { Injectable, Inject } from '@angular/core';
import Web3 from 'web3';
import {WEB3} from '@app/web3.token';
import {writeFileSync, fstat} from 'fs';
import { EncryptedKeystoreV3Json, Account } from 'web3-eth-accounts';
import { from, Observable, BehaviorSubject, ReplaySubject, Subject, } from 'rxjs';
import { concatMap, take, tap } from 'rxjs/operators';
import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Misura} from '../../interfaces';
import contractAbi from '@app/model/ABIs/ContractParametri.json'


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
  constructor(private http: HttpClient, @Inject(WEB3) private _web3: Web3 ) {
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
  registerAccount(password: string) {
    const newAccount = this.web3.eth.accounts.create();
    const newAddress = newAccount.address;
    const newPrivateKey = newAccount.privateKey;
    const keystore = this.web3.eth.accounts.encrypt(newPrivateKey, password);
    // soluzione temporanea, il keystore andrà salvato nel db
    try {
      writeFileSync('../../../keys/' + newAddress, keystore);
      console.log('keystore written in file succesfully');
    } catch (err) {
      console.log('error in writing keystore to file:');
      console.log(err);
    }
    // salvare indirizzo account nel database
  }

  /* getAccount() {
    return this.account;
  } */

  getWeb3() {
    return this.web3;
  }

  // loadContracts(contracts) {
  //   this.contracts = contracts;
  // }

  unlockAccount(keystore, password: string) {
    this.account = this.web3.eth.accounts.decrypt(keystore, password);
  }

  lockAccount() {
    delete this.account;
  }

  newTransaction(data, contractAddress) {
    const encodedData = data.encodeABI();
    return this.getTransactionCount().pipe(
      take(1),
      concatMap(nonce => {
        console.log('Transaction count: ' + nonce);
        return this.signTransaction(encodedData, nonce, contractAddress);
      }),
      concatMap(signedTx => {
        console.log('Transaction Signed!');
        this.txEventsStream.next({type: 'signed', data: signedTx});
        return this.sendSignedTransaction(signedTx);
      }),
      tap((receipt) => this.txEventsStream.next({type: 'completed', data: receipt}))
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


  // getMisure(contractID) {
  //   const address: string = this.contracts.find(element => element._id === contractID).address;
  //   const abi = this.contractsSources.find(element => element.type === 'master').abi;
  //   const smartContract = new this.web3.eth.Contract(abi, address);
  //   const misura = from(smartContract.methods.getMisura(0).call())
  //   .pipe(map(result => this.formatMisura(result))
  //   );
  //   return misura;
  // }

  // formatMisura(misura): Misura  {
  //   return {no: misura['0'].toNumber(), tariffa: misura['1'], data: misura['2'].toNumber(),
  //     categoriaContabile: misura['3'], descrizione: misura['4'], percentuale: misura['5'],
  //     riserva: misura['6']};
  // }

}
