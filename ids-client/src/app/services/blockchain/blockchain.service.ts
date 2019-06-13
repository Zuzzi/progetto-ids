import { Injectable, Inject } from '@angular/core';
import Web3 from 'web3';
import {WEB3} from '@app/web3.token';
import {writeFileSync, fstat} from 'fs';
import { EncryptedKeystoreV3Json, Account } from 'web3-eth-accounts';
import { from, Observable } from 'rxjs';
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
  private contracts: Array<any>;
  private contractsSources: Array<any>;

  constructor(private http: HttpClient, @Inject(WEB3) private _web3: Web3 ) {
    const options = {
      defaultAccount: '0xed9d02e382b34818e88b88a309c7fe71e65f419d',
      defaultGasPrice: '0',
      defaultGas: 4500000
    };
    // this.web3 = new Web3(new Web3.providers.HttpProvider(
    //   'http://localhost:22000', {headers: [{name: 'Access-Control-Allow-Origin', value: '*'}]}),
    //   null,
    //   options);
    /* this.web3 = new Web3(new Web3.providers.WebsocketProvider(
      'ws://localhost:22000'),
      null,
      options); */
      this.web3 = _web3;
    // http.get('/api/contractSources/getContractSources').subscribe((result) => {
    //   if (result['status'] === 'success') {
    //     this.contractsSources = result['data']
    //   }
    //   else {
    //     console.log('Contract Sources not found');
    //   }
    // });
    console.log(contractAbi);
  }

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

  loadContracts(contracts) {
    this.contracts = contracts;
  }

  unlockAccount(keystore, password: string) {
    this.account = this.web3.eth.accounts.decrypt(keystore, password);
  }

  lockAccount() {
    delete this.account;
  }

  getMisure(contractID) {
    const address: string = this.contracts.find(element => element._id === contractID).address;
    const abi = this.contractsSources.find(element => element.type === 'master').abi;
    const smartContract = new this.web3.eth.Contract(abi, address);
    const misura = from(smartContract.methods.getMisura(0).call())
    .pipe(map(result => this.formatMisura(result))
    );
    return misura;
  }

  formatMisura(misura): Misura  {
    return {no: misura['0'].toNumber(), tariffa: misura['1'], data: misura['2'].toNumber(),
      categoriaContabile: misura['3'], descrizione: misura['4'], percentuale: misura['5'],
      riserva: misura['6']};
  }

  getAbi(type: string) {
    return this.contractsSources.find(element => element.type === type).abi;
  }

  getAddress() {
    return '';
  }

}
