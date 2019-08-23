import { Injectable, Inject } from '@angular/core';
import { Subject, Observable, from, forkJoin, ReplaySubject, BehaviorSubject, of, pipe, EMPTY, combineLatest, defer, empty, concat } from 'rxjs';
import { concatMap, take, map, tap, delay, filter, takeUntil, concatMapTo, finalize } from 'rxjs/operators';
import {Misura, SmartContractType, DialogInserimentoMisura, SmartContract} from '@app/interfaces';
import { Contract } from 'web3-eth-contract';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import { AuthService } from '../auth/auth.service';
import contractABI from '@app/model/ABIs/ContractMisure.json';
import { AbiItem, toChecksumAddress } from 'web3-utils';

@Injectable({
  providedIn: 'root'
})
export class LibrettoService {
  // private readonly TYPE: ContractType = 'libretto';
  private misureStream: Subject<Misura[]>;
  misure: Observable<Misura[]>;
  private misureStore: Misura[];
  private isLoading: Subject<boolean>;
  isLoadingObs: Observable<boolean>;
  private isContractChanged: Subject<any>;
  private libretto: SmartContract<SmartContractType.Libretto>;
  private contractId: string;
  // private contract: Contract;

  constructor(private blockchainService: BlockchainService) {
    this.misureStream =  new ReplaySubject(1) as ReplaySubject<Misura[]>;
    this.isLoading = new ReplaySubject(1) as ReplaySubject<boolean>;
    this.isContractChanged = new Subject();
    this.isLoadingObs = this.isLoading.asObservable();
    this.misure = combineLatest(this.misureStream,
      this.isLoading).pipe(
        tap(([misure, isLoading]) => console.log('misure: ' + misure.length, 'isloading: ' + isLoading)),
        filter(([_, isLoading]) => !isLoading),
        map(([misure, _]) => misure)
      );
  }

  switchToContract(contractId: string) {
    this.contractId = contractId;
    this.libretto = this.blockchainService.getSmartContract(contractId,
      SmartContractType.Libretto) as SmartContract<SmartContractType.Libretto>;
    this.isContractChanged.next();
  }

  // switchToContract(contractId: string) {
  //   if (!(this.contractId === contractId)) {
  //     this.contractId = contractId;
  //     const abi: AbiItem[] = contractABI as AbiItem[];
  //     // TODO: gestire il caso in cui l'id del contratto non si trova tra quelli dell'utente
  //     const address = this.authService.getAddress(contractId, this.TYPE);
  //     // TODO: spostare creazione istanza contratto in blockchain
  //     // in modo da non utilizzare web3 direttamente qui
  //     const web3 = this.blockchainService.getWeb3();
  //     this.contract = new web3.eth.Contract(abi, address);
  //   }
  // }

  // clear() {
  //   this.misureStream.next();
  // }

  loadMisure() {
    return concat(
      of().pipe(
        finalize(() => this.isLoading.next(true))),
      this.getMisure().pipe(
        takeUntil(this.isContractChanged),
        map(misure => {
          return this.formatMisure(misure);
        }),
        tap(misure => this.updateMisure(misure))
      ));
  }

  updateMisure(misure) {
    this.misureStore = misure;
    this.misureStream.next(Object.assign([], this.misureStore));
    this.isLoading.next(false);
  }

  getMisure() {
    return defer(() =>
    from(this.libretto.instance.methods.numeroMisure().call()))
    .pipe(
      concatMap(numeroMisure => {
        if (Number(numeroMisure) !== 0) {
          const misure: any[] = [];
          for (let i = 0; i < numeroMisure; i++) {
            misure.push(from(this.libretto.instance.methods.getMisura(i).call()));
          }
          return forkJoin(misure);
        } else {
          return of([]);
        }
      }),
      take(1), // per sicurezza anche se gli observable generati da promise completano dopo una singola emissione
    );
  }

  insertMisura(misura: DialogInserimentoMisura) {
    const percentuale = this.blockchainService
    .numberToSigned64x64(misura.percentuale).toString().replace('+', '');
    const insert = this.libretto.instance.methods.inserisciMisura(misura.categoriaContabile,
      misura.descrizione, percentuale, misura.riserva);
    return this.blockchainService.newTransaction(insert, this.libretto.instance.address).pipe(
      concatMapTo(this.loadMisure()),
      takeUntil(this.isContractChanged),
    );
  }

  invalidaMisura(noMisura: Misura['no']) {
    const invalidation = this.libretto.instance.methods.invalidaMisura(noMisura);
    return this.blockchainService
      .newTransaction(invalidation, this.libretto.instance.address).pipe(
        concatMapTo(this.loadMisure()),
        takeUntil(this.isContractChanged)
      );
  }

  formatMisure(misure) {
    const formatted: Misura[] = [];
    misure.forEach(misura => {
      formatted.push({no: misura['0'],
        tariffa: misura['1'],
        data: misura['2'],
        categoriaContabile: misura['3'],
        descrizione: misura['4'],
        percentuale: this.blockchainService.signed64x64ToNumber(misura['5']),
        riserva: misura['6'],
        valida: misura['7'],
        invalidabile: misura['8'],
        approvata: misura['9']});
    });
    return formatted;
  }

}
