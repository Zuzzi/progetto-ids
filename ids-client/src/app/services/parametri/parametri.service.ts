import { Injectable } from '@angular/core';
import { Subject, Observable, from, forkJoin } from 'rxjs';
import { Soglia, SmartContract, SmartContractType } from '@app/interfaces';
import { concatMap, take, map } from 'rxjs/operators';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable({
  providedIn: 'root'
})
export class ParametriService {

  private soglieStream: Subject<Soglia>;
  soglie: Observable<Soglia>;
  private soglieStore: Soglia[];

  constructor(private blockchainService: BlockchainService, ) {
    this.soglieStream = new Subject() as Subject<Soglia>
    this.soglieStore = [];
    this.soglie = this.soglieStream.asObservable();
  }

  loadSoglie(contract: SmartContract<SmartContractType.Parametri>) {
    return this.getSoglie(contract).pipe(
      map(soglie => {
        return this.formatSoglie(soglie);
      })
    );
  }

  getSoglie(contract: SmartContract<SmartContractType.Parametri>) {
    return from(contract.instance.methods.getSoglieLength().call()).pipe(
      concatMap(numeroSoglia => {
        const soglie: any[] = [];
        for (let i = 0; i < numeroSoglia; i++) {
          soglie.push(from(contract.instance.methods.getSoglia(i).call()));
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
