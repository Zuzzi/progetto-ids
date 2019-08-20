import { Injectable } from '@angular/core';
import { Subject, Observable, from, forkJoin, ReplaySubject, combineLatest } from 'rxjs';
import { Soglia, SmartContract, SmartContractType } from '@app/interfaces';
import { concatMap, take, map, filter, tap } from 'rxjs/operators';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable({
  providedIn: 'root'
})
export class ParametriService {

  private soglieStream: Subject<Soglia[]>;
  soglie: Observable<Soglia[]>;
  private soglieStore: Soglia[];
  private isLoading: Subject<boolean>;
  private contractId: string;
  private parametri: SmartContract<SmartContractType.Parametri>;

  constructor(private blockchainService: BlockchainService, ) {
    this.soglieStream = new ReplaySubject() as ReplaySubject<Soglia[]>;
    this.isLoading = new ReplaySubject() as ReplaySubject<boolean>;
    this.soglie = combineLatest(this.soglieStream.asObservable(),
    this.isLoading.asObservable()).pipe(
      tap(([soglie, isLoading]) => console.log('misure: ' + soglie.length, 'isloading: ' + isLoading)),
      filter(([_, isLoading]) => !isLoading),
      map(([soglie, _]) => soglie)
    );
  }

  switchToContract(contractId: string) {
    this.contractId = contractId;
    this.parametri = this.blockchainService.getSmartContract(contractId,
      SmartContractType.Parametri) as SmartContract<SmartContractType.Parametri>;  }

  loadSoglie() {
    this.isLoading.next(true);
    return this.getSoglie().pipe(
      map(soglie => {
        return this.formatSoglie(soglie);
      })
    );
  }

  getSoglie() {
    return from(this.parametri.instance.methods.getSoglieLength().call()).pipe(
      concatMap(numeroSoglia => {
        const soglie: any[] = [];
        for (let i = 0; i < numeroSoglia; i++) {
          soglie.push(from(this.parametri.instance.methods.getSoglia(i).call()));
        }
        return forkJoin(soglie); // fare nested forkjoin con object of array
      }),
      take(1), // per sicurezza anche se gli observable generati da promise completano dopo una singola emissione
    );
  }

  formatSoglie(soglie) {
    const formatted: Soglia[] = [];
    soglie.forEach((soglia, index) => {
      formatted.push({no: index,
      valore: soglia['0'],
      superata: soglia['1']});
    });
    return formatted;
  }

}
