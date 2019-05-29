import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import Web3 from 'web3';
import { WEB3 } from '@app/web3.token';
import { Account } from 'web3-eth-accounts';
import { Contract } from 'web3-eth-contract';

@Injectable()
export class LibrettoService {
  entries: Observable<any[]>;
  private _entries: BehaviorSubject<any[]>;
  private contract: Contract;
  private account: Account;
  private dataStore: {
    entries: any[]
  };

  constructor(@Inject(WEB3) private web3: Web3) {
    this.dataStore = { entries: [] };
    this._entries = new BehaviorSubject([]) as BehaviorSubject<any[]>;
    this.entries = this._entries.asObservable();
   }

  init(contractId) {

  }
}
