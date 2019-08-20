import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibrettoService } from '@app/services/libretto/libretto.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, concatMap, filter, tap, catchError, onErrorResumeNext } from 'rxjs/operators';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import { SmartContractType, SmartContract } from '@app/interfaces';
import { Observable, of, EMPTY, forkJoin } from 'rxjs';
import { SalService } from '@app/services/sal/sal.service';
import { RegistroService } from '@app/services/registro/registro.service';

@Component({
  selector: 'app-contratto',
  templateUrl: './contratto.component.html',
  styleUrls: ['./contratto.component.css']
})
export class ContrattoComponent implements OnInit, OnDestroy {

  contractId: string;
  routeSub: any;

  constructor(private activatedRoute: ActivatedRoute, private librettoService: LibrettoService,
              private registroService: RegistroService, private salService: SalService,
              private blockchainService: BlockchainService) { }

  ngOnInit() {
    this.routeSub = this.activatedRoute.paramMap.pipe(
      tap(() => this.clear()),
      map(params => {
        return params.get('contractId');
      }),
      switchMap(contractId => {
      // switchToContract per il titolo del contratto
      this.contractId = contractId;
      this.switchToContract();
      return this.loadContract();
      }),
    ).subscribe(valori => {
      this.librettoService.updateMisure(valori[0]);
      this.registroService.updateContabilita(valori[1]);
    });
  }

  clear() {
    this.librettoService.clear();
    this.registroService.clear();
  }

  loadContract() {
    return forkJoin(this.librettoService.loadMisure(),
    this.registroService.loadContabilita());
  }

  switchToContract() {
    this.librettoService.switchToContract(this.contractId);
    this.registroService.switchToContract(this.contractId);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
