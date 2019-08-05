import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, from, forkJoin } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';
import {Misura, ContractType, DialogInserimentoMisura} from '@app/interfaces';
import { Contract } from 'web3-eth-contract';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import { AuthService } from '../auth/auth.service';
import contractABI from '@app/model/ABIs/ContractMisure.json';
import { AbiItem, toChecksumAddress } from 'web3-utils';

@Injectable({
  providedIn: 'root'
})
export class LibrettoService {
  private readonly TYPE: ContractType = 'libretto';
  // TODO: valuta utilizzo replaysubject(1)
  private misureStream: BehaviorSubject<Misura[]>;
  misure: Observable<Misura[]>;
  private misureStore: Misura[];
  private contractId: string;
  private contract: Contract;

  constructor(private blockchainService: BlockchainService,
              private authService: AuthService) {
    this.misureStream =  new BehaviorSubject([]) as BehaviorSubject<Misura[]>;
    this.misureStore = [];
    this.misure = this.misureStream.asObservable();
  }

  init(contractId: string) {
    this.misureStore = [];
    this.misureStream.next(Object.assign({}, this.misureStore));
    if (!(this.contractId === contractId)) {
      this.contractId = contractId;
      const abi: AbiItem[] = contractABI as AbiItem[];
      // TODO: gestire il caso in cui l'id del contratto non si trova tra quelli dell'utente
      const address = this.authService.getAddress(contractId, this.TYPE);
      // TODO: spostare creazione istanza contratto in blockchain
      // in modo da non utilizzare web3 direttamente qui
      const web3 = this.blockchainService.getWeb3();
      this.contract = new web3.eth.Contract(abi, address);
    }
  }

  loadMisure() {
    this.getMisure().subscribe(misure => {
      this.misureStore = this.formatMisure(misure);
      this.misureStream.next(Object.assign([], this.misureStore));
    });
  }

  getMisure() {
    return from(this.contract.methods.getNumeroMisure().call()).pipe(
      take(1),
      concatMap(numeroMisure => {
        const misure: any[] = [];
        for (let i = 0; i < numeroMisure; i++) {
          misure.push(from(this.contract.methods.getMisura(i).call()));
        }
        return forkJoin(misure);
      }),
    );
  }

  insertMisura(misura: DialogInserimentoMisura) {
    const percentuale = this.blockchainService
    .numberToSigned64x64(misura.percentuale).toString().replace('+', '');
    const insert = this.contract.methods.inserisciMisura(misura.categoriaContabile,
      misura.descrizione, percentuale, misura.riserva);
    this.blockchainService
      .newTransaction(insert, this.contract.address)
      .subscribe(() => {
        console.log('Transaction completed !');
        this.loadMisure();
      });
  }

  invalidaMisura(noMisura: Misura['no']) {
    const invalidation = this.contract.methods.invalidaMisura(noMisura);
    return this.blockchainService
      .newTransaction(invalidation, this.contract.address);
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
