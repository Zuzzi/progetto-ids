import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject, of, defer, from } from 'rxjs';
import { Giornale, SmartContract, SmartContractType } from '@app/interfaces';
import { BlockchainService } from '../blockchain/blockchain.service';
import { withLatestFrom, tap, map, concatMapTo, takeUntil, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GiornaleService {

  private giornaleStream: Subject<Giornale>;
  vocegiornale: Observable<any>;
  private giornaleStore: Giornale;
  private isLoading: Subject<boolean>;
  private isContractChanged: Subject<any>;
  private giornale: SmartContract<SmartContractType.Giornale>;
  private contractId: string;

  constructor(private blockchainService: BlockchainService) {
    this.giornaleStream = new ReplaySubject(1) as ReplaySubject<Giornale>;
    this.isLoading = new ReplaySubject(1) as ReplaySubject<boolean>;
    this.isContractChanged = new Subject();
    this.vocegiornale = this.isLoading.pipe(
      withLatestFrom(this.giornaleStream),
      tap(([isLoading, giornale]) => console.log('giornale: ' + giornale, 'isloading: ' + isLoading)),
      map(([isLoading, giornale]) => {
        if (isLoading) {
          return {isLoading, data: {} };
        } else {
          return {isLoading, data: giornale};
        }
      }),
    );
   }

   switchToContract(contractId: string) {
    this.contractId = contractId;
    this.giornale = this.blockchainService.getSmartContract(contractId,
      SmartContractType.Giornale) as SmartContract<SmartContractType.Giornale>;
    this.isContractChanged.next();
  }

  loadGiornale(date: Date) {
    return of(true).pipe(
        tap(() => this.isLoading.next(true)),
        concatMapTo(this.getGiornale(date).pipe(
          takeUntil(this.isContractChanged),
          map(giornale => {
            return this.formatGiornale(giornale);
          }),
          tap(misure => this.updateGiornale(misure)),
      )));
  }

  updateGiornale(giornale) {
    this.giornaleStore = giornale;
    this.giornaleStream.next(Object.assign({}, this.giornaleStore));
    this.isLoading.next(false);
  }

  getGiornale(date: Date) {
    return defer(() =>
    from(this.giornale.instance.methods.getGiornale(
      this.blockchainService.dateToEpoch(date)).call()))
    .pipe(
      take(1), // per sicurezza anche se gli observable generati da promise completano dopo una singola emissione
    );
  }

  formatGiornale(giornale): Giornale {
    const voceGiornale = giornale['0'];
    const operai = giornale['1'];
    const attrezzature = giornale['2'];
    return {
      no: voceGiornale.no,
      data: this.blockchainService.epochToDate(voceGiornale.data),
      descrizioneLocazione: voceGiornale.descrizioneLocazione,
      allegati: voceGiornale.allegati,
      operai,
      attrezzature,
    };
  }

}
