import { Injectable } from '@angular/core';
import { Subject, Observable, from, forkJoin, ReplaySubject, combineLatest, concat, of, defer } from 'rxjs';
import { Soglia, SmartContract, SmartContractType, Struttura, CategoriaContabile } from '@app/interfaces';
import { concatMap, take, map, filter, tap, takeUntil, finalize, concatMapTo } from 'rxjs/operators';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable({
  providedIn: 'root'
})
export class ParametriService {

  private soglieStream: Subject<Soglia[]>;
  soglie: Observable<Soglia[]>;
  private soglieStore: Soglia[];

  private categorieStream: Subject<CategoriaContabile[]>;
  categorie: Observable<CategoriaContabile[]>;
  private categorieStore: CategoriaContabile[];

  private struttureStream: Subject<Struttura[]>;
  strutture: Observable<Struttura[]>;
  private struttureStore: Struttura[];

  private isLoading: Subject<boolean>;
  isLoadingObs: Observable<boolean>;
  private isContractChanged: Subject<any>;
  private contractId: string;
  private parametri: SmartContract<SmartContractType.Parametri>;

  constructor(private blockchainService: BlockchainService, ) {
    this.soglieStream = new ReplaySubject() as ReplaySubject<Soglia[]>;
    this.isLoading = new ReplaySubject() as ReplaySubject<boolean>;
    this.isLoadingObs = this.isLoading.asObservable();
    this.isContractChanged = new Subject();
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
      SmartContractType.Parametri) as SmartContract<SmartContractType.Parametri>;
    this.isContractChanged.next();
  }

  loadSoglie() {
    return of(true).pipe(
        tap(() => this.isLoading.next(true)),
        concatMapTo(this.getSoglie().pipe(
          takeUntil(this.isContractChanged),
          map(soglie => {
            return this.formatSoglie(soglie);
          }),
        tap(soglie => this.updateSoglie(soglie))
    )));
  }

  loadCategorieContabili() {
    return concat(
      of().pipe(
        finalize(() => this.isLoading.next(true))),
      this.getCategorieContabili().pipe(
        takeUntil(this.isContractChanged),
        map(categorie => {
          return this.formatCategorieContabili(categorie);
        }),
      tap(categorie => this.updateCategorieContabili(categorie))
    ));
  }

  loadStrutture() {
    return concat(
      of().pipe(
        finalize(() => this.isLoading.next(true))),
      this.getStrutture().pipe(
        takeUntil(this.isContractChanged),
        map(strutture => {
          return this.formatStrutture(strutture);
        }),
      tap(strutture => this.updateStrutture(strutture))
    ));
  }

  updateSoglie(soglie) {
    this.soglieStore = soglie;
    this.soglieStream.next(Object.assign([], this.soglieStore));
    this.isLoading.next(false);
  }

  updateCategorieContabili(categorie) {
    this.categorieStore = categorie;
    this.categorieStream.next(Object.assign([], this.categorieStore));
    this.isLoading.next(false);
  }

  updateStrutture(strutture) {
    this.struttureStore = strutture;
    this.struttureStream.next(Object.assign([], this.struttureStore));
    this.isLoading.next(false);
  }

  getSoglie() {
    return defer(() =>
    from(this.parametri.instance.methods.numeroSoglie().call()))
    .pipe(
      concatMap(numeroSoglie => {
        if (Number(numeroSoglie) !== 0) {
          const soglie: any[] = [];
          for (let i = 0; i < numeroSoglie; i++) {
            soglie.push(from(this.parametri.instance.methods.getSoglia(i).call()));
          }
          return forkJoin(soglie); // fare nested forkjoin con object of array
        } else {
          return of([]);
        }
      }),
      take(1), // per sicurezza anche se gli observable generati da promise completano dopo una singola emissione
    );
  }

  getCategorieContabili() {
    return defer(() =>
    from(this.parametri.instance.methods.numeroCategorieContabili().call()))
    .pipe(
      concatMap(numeroCategorie => {
        if (Number(numeroCategorie) !== 0) {
          const categorie: any[] = [];
          for (let i = 0; i < numeroCategorie; i++) {
            categorie.push(from(this.parametri.instance.methods.getCategoriaContabile(i).call()));
          }
          return forkJoin(categorie); // fare nested forkjoin con object of array
        } else {
          return of([]);
        }
      }),
      take(1), // per sicurezza anche se gli observable generati da promise completano dopo una singola emissione
    );
  }

  getStrutture() {
    return defer(() =>
    from(this.parametri.instance.methods.numeroStrutture().call()))
    .pipe(
      concatMap(numeroStrutture => {
        if (Number(numeroStrutture) !== 0) {
          const strutture: any[] = [];
          for (let i = 0; i < numeroStrutture; i++) {
            strutture.push(from(this.parametri.instance.methods.getStruttura(i).call()));
          }
          return forkJoin(strutture); // fare nested forkjoin con object of array
        } else {
          return of([]);
        }
      }),
      take(1), // per sicurezza anche se gli observable generati da promise completano dopo una singola emissione
    );
  }

  formatSoglie(soglie) {
    const formatted: Soglia[] = [];
    soglie.forEach(soglia => {
      formatted.push({no: soglia['0'],
      valore: this.blockchainService.signed64x64ToNumber(soglia['1']),
      superata: soglia['2']});
    });
    return formatted;
  }

  formatCategorieContabili(categorie) {
    const formatted: CategoriaContabile[] = [];
    categorie.forEach(categoria => {
      formatted.push({nome: categoria['0'],
      valore: categoria['1'],
      tariffa: categoria['2']});
    });
    return formatted;
  }

  formatStrutture(strutture) {
    const formatted: Struttura[] = [];
    strutture.forEach(struttura => {
      formatted.push({nome: struttura['0']});
    });
    return formatted;
  }

}
