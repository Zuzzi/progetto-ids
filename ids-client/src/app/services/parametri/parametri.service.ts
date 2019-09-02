import { Injectable } from '@angular/core';
import { Subject, Observable, from, forkJoin, ReplaySubject, combineLatest, concat, of, defer } from 'rxjs';
import { Soglia, SmartContract, SmartContractType, Struttura, CategoriaContabile, Qualifica, Tipologia } from '@app/interfaces';
import { concatMap, take, map, filter, tap, takeUntil, finalize, concatMapTo, withLatestFrom } from 'rxjs/operators';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable({
  providedIn: 'root'
})
export class ParametriService {

  private soglieStream: Subject<Soglia[]>;
  soglie: Observable<any>;
  private soglieStore: Soglia[];
  private isLoadingSoglie: Subject<boolean> = new ReplaySubject(1);

  private categorieStream: Subject<CategoriaContabile[]> = new ReplaySubject(1);
  categorie: Observable<any>;
  private categorieStore: CategoriaContabile[];
  private isLoadingCategorie: Subject<boolean> = new ReplaySubject(1);

  private struttureStream: Subject<Struttura[]> = new ReplaySubject(1);
  strutture: Observable<any>;
  private struttureStore: Struttura[];
  private isLoadingStrutture: Subject<boolean> = new ReplaySubject(1);

  private qualificheStream: Subject<Qualifica[]> = new ReplaySubject(1);
  qualifiche: Observable<any>;
  private qualificheStore: Qualifica[];
  private isLoadingQualifiche: Subject<boolean> = new ReplaySubject(1);

  private attrezzatureStream: Subject<Tipologia[]> = new ReplaySubject(1);
  attrezzature: Observable<any>;
  private attrezzatureStore: Tipologia[];
  private isLoadingAttrezzature: Subject<boolean> = new ReplaySubject(1);

  private valoreTotaleStream: Subject<number> = new ReplaySubject(1);
  valoretotale: Observable<any>;
  private valoreTotaleStore: number;
  private isLoadingValoreTotale: Subject<boolean> = new ReplaySubject(1);


  // isLoadingObs: Observable<boolean>;
  private isContractChanged: Subject<any>;
  private contractId: string;
  private parametri: SmartContract<SmartContractType.Parametri>;

  constructor(private blockchainService: BlockchainService, ) {
    this.soglieStream = new ReplaySubject(1) as ReplaySubject<Soglia[]>;
    // this.isLoading = new ReplaySubject() as ReplaySubject<boolean>;
    // this.isLoadingObs = this.isLoading.asObservable();
    this.isContractChanged = new Subject();
    this.soglie = this.isLoadingSoglie.pipe(
      withLatestFrom(this.soglieStream),
      tap(([isLoading, soglie]) => console.log('soglie: ' + soglie.length, 'isloading: ' + isLoading)),
      map(([isLoading, soglie]) => {
        if (isLoading) {
          return {isLoading, data: []};
        } else {
          return {isLoading, data: soglie};
        }
      }),
    );
    this.categorie = this.isLoadingCategorie.pipe(
      withLatestFrom(this.categorieStream),
      tap(([isLoading, categorie]) => console.log('categorie: ' + categorie.length, 'isloading: ' + isLoading)),
      map(([isLoading, categorie]) => {
        if (isLoading) {
          return {isLoading, data: []};
        } else {
          return {isLoading, data: categorie};
        }
      }),
    );
    this.strutture = this.isLoadingStrutture.pipe(
      withLatestFrom(this.struttureStream),
      tap(([isLoading, strutture]) => console.log('strutture: ' + strutture.length, 'isloading: ' + isLoading)),
      map(([isLoading, strutture]) => {
        if (isLoading) {
          return {isLoading, data: []};
        } else {
          return {isLoading, data: strutture};
        }
      }),
    );

    this.qualifiche = this.isLoadingQualifiche.pipe(
      withLatestFrom(this.qualificheStream),
      tap(([isLoading, qualifiche]) => console.log('qualifiche: ' + qualifiche.length, 'isloading: ' + isLoading)),
      map(([isLoading, qualifiche]) => {
        if (isLoading) {
          return {isLoading, data: []};
        } else {
          return {isLoading, data: qualifiche};
        }
      }),
    );

    this.attrezzature = this.isLoadingAttrezzature.pipe(
      withLatestFrom(this.attrezzatureStream),
      tap(([isLoading, attrezzature]) => console.log('attrezzature: ' + attrezzature.length, 'isloading: ' + isLoading)),
      map(([isLoading, attrezzature]) => {
        if (isLoading) {
          return {isLoading, data: []};
        } else {
          return {isLoading, data: attrezzature};
        }
      }),
    );

    this.valoretotale = this.isLoadingValoreTotale.pipe(
      withLatestFrom(this.valoreTotaleStream),
      tap(([isLoading, valoreTotale]) => console.log('valoreTotale: ' + valoreTotale, 'isloading: ' + isLoading)),
      map(([isLoading, valoreTotale]) => {
        if (isLoading) {
          return {isLoading, data: null};
        } else {
          return {isLoading, data: valoreTotale};
        }
      }),
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
        tap(() => this.isLoadingSoglie.next(true)),
        concatMapTo(this.getSoglie().pipe(
          takeUntil(this.isContractChanged),
          map(soglie => {
            return this.formatSoglie(soglie);
          }),
        tap(soglie => this.updateSoglie(soglie))
    )));
  }

  loadCategorieContabili() {
    return of(true).pipe(
        tap(() => this.isLoadingCategorie.next(true)),
        concatMapTo(this.getCategorieContabili().pipe(
          takeUntil(this.isContractChanged),
          map(categorie => {
            return this.formatCategorieContabili(categorie);
          }),
        tap(categorie => this.updateCategorieContabili(categorie))
    )));
  }

  loadStrutture() {
    return of(true).pipe(
      tap(() => this.isLoadingStrutture.next(true)),
      concatMapTo(this.getStrutture().pipe(
        takeUntil(this.isContractChanged),
        map(strutture => {
          return this.formatStrutture(strutture);
        }),
      tap(strutture => this.updateStrutture(strutture))
    )));
  }

  loadQualifiche() {
    return of(true).pipe(
      tap(() => this.isLoadingQualifiche.next(true)),
      concatMapTo(this.getQualifiche().pipe(
        takeUntil(this.isContractChanged),
        map(qualifiche => {
          return this.formatQualifiche(qualifiche);
        }),
      tap(qualifiche => this.updateQualifiche(qualifiche))
    )));
  }

  loadAttrezzature() {
    return of(true).pipe(
      tap(() => this.isLoadingAttrezzature.next(true)),
      concatMapTo(this.getAttrezzature().pipe(
        takeUntil(this.isContractChanged),
        map(attrezzature => {
          return this.formatAttrezzature(attrezzature);
        }),
      tap(attrezzature => this.updateAttrezzature(attrezzature))
    )));
  }

  loadValoreTotale() {
    return of(true).pipe(
      tap(() => this.isLoadingValoreTotale.next(true)),
      concatMapTo(defer(() =>
      from(this.parametri.instance.methods.valoreTotale().call()))
      .pipe(take(1))
      ),
      takeUntil(this.isContractChanged),
      map(valoreTotale => this.blockchainService.signed64x64ToNumber(valoreTotale)),
      tap(valoreTotale => this.updateValoreTotale(valoreTotale)),
    );
  }

  updateSoglie(soglie) {
    this.soglieStore = soglie;
    this.soglieStream.next(Object.assign([], this.soglieStore));
    this.isLoadingSoglie.next(false);
  }

  updateCategorieContabili(categorie) {
    this.categorieStore = categorie;
    this.categorieStream.next(Object.assign([], this.categorieStore));
    this.isLoadingCategorie.next(false);
  }

  updateStrutture(strutture) {
    this.struttureStore = strutture;
    this.struttureStream.next(Object.assign([], this.struttureStore));
    this.isLoadingStrutture.next(false);
  }

  updateQualifiche(qualifiche) {
    this.qualificheStore = qualifiche;
    this.qualificheStream.next(Object.assign([], this.qualificheStore));
    this.isLoadingQualifiche.next(false);
  }

  updateAttrezzature(attrezzature) {
    this.attrezzatureStore = attrezzature;
    this.attrezzatureStream.next(Object.assign([], this.attrezzatureStore));
    this.isLoadingAttrezzature.next(false);
  }

  updateValoreTotale(valoreTotale) {
    this.valoreTotaleStore = valoreTotale;
    this.valoreTotaleStream.next(this.valoreTotaleStore);
    this.isLoadingValoreTotale.next(false);
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

  getQualifiche() {
    return defer(() =>
    from(this.parametri.instance.methods.numeroQualifiche().call()))
    .pipe(
      concatMap(numeroQualifiche => {
        if (Number(numeroQualifiche) !== 0) {
          const qualifiche: any[] = [];
          for (let i = 0; i < numeroQualifiche; i++) {
            qualifiche.push(from(this.parametri.instance.methods.getQualifica(i).call()));
          }
          return forkJoin(qualifiche); // fare nested forkjoin con object of array
        } else {
          return of([]);
        }
      }),
      take(1), // per sicurezza anche se gli observable generati da promise completano dopo una singola emissione
    );
  }

  getAttrezzature() {
    return defer(() =>
    from(this.parametri.instance.methods.numeroAttrezzature().call()))
    .pipe(
      concatMap(numeroAttrezzature => {
        if (Number(numeroAttrezzature) !== 0) {
          const attrezzature: any[] = [];
          for (let i = 0; i < numeroAttrezzature; i++) {
            attrezzature.push(from(this.parametri.instance.methods.getAttrezzatura(i).call()));
          }
          return forkJoin(attrezzature); // fare nested forkjoin con object of array
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
      formatted.push({nome: struttura});
    });
    return formatted;
  }

  formatQualifiche(qualifiche) {
    const formatted: Qualifica[] = [];
    qualifiche.forEach(qualifica => {
      formatted.push({nome: qualifica});
    });
    return formatted;
  }

  formatAttrezzature(attrezzature) {
    const formatted: Tipologia[] = [];
    attrezzature.forEach(attrezzatura => {
      formatted.push({nome: attrezzatura});
    });
    return formatted;
  }

}
