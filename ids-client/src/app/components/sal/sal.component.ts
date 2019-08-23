import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SalService } from '@app/services/sal/sal.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, shareReplay, publishReplay, refCount } from 'rxjs/operators';
import { SmartContract, SmartContractType, Sal } from '@app/interfaces';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sal',
  templateUrl: './sal.component.html',
  styleUrls: ['./sal.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SalComponent implements OnInit, OnDestroy {

  columnsToDisplay = ['no', 'valore', 'data'];
  internalColumns = ['no', 'tariffa', 'data', 'categoriaContabile', 'descrizione',
  'percentuale', 'prezzoValore', 'prezzoPercentuale', 'debitoValore', 'debitoPercentuale'];
  dataSource;
  expandedElement: Sal[] | null;
  isLoadingSal: Observable<boolean>;

  constructor(private salService: SalService, private activatedRoute: ActivatedRoute,
              private blockchainService: BlockchainService) { }

  ngOnInit() {
    this.dataSource = this.salService.vociSal.pipe(
      tap(value => console.log(value)),
      publishReplay(1),
      refCount()
    );
    this.isLoadingSal = this.salService.isLoadingObs.pipe(
      tap(value => console.log(value)),
      publishReplay(1),
      refCount()
    );
  }

  ngOnDestroy(): void {
  }
}


