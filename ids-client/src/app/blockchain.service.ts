import { Injectable } from '@angular/core';
import Web3 from 'web3';
import {writeFileSync, fstat} from 'fs';
import { EncryptedKeystoreV3Json, Account } from 'web3-eth-accounts';
import { Eth } from 'web3-eth';


@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  private web3: Web3;
  private account: Account;

  constructor() {
  const options = {
    defaultGasPrice: '0',
    defaultGas: 4500000
  };
  this.web3 = new Web3(new Web3.providers.HttpProvider(
    'http://localhost:22000'),
    null,
    options);
   }

  registerAccount(password: string) {
    const newAccount = this.web3.eth.accounts.create();
    const newAddress = newAccount.address;
    const newPrivateKey = newAccount.address;
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

  unlockAccount(keystore: EncryptedKeystoreV3Json, password: string) {
    this.account = this.web3.eth.accounts.decrypt(keystore, password);
  }

  lockAccount() {
    delete this.account;
  }

}
