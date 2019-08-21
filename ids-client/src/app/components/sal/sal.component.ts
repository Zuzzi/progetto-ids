import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SalService } from '@app/services/sal/sal.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, shareReplay } from 'rxjs/operators';
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

  // contractId: string;
  columnsToDisplay = ['no', 'valore', 'data'];
  internalColumns = ['no', 'tariffa', 'data', 'categoriaContabile', 'descrizione',
  'percentuale', 'prezzoValore', 'prezzoPercentuale', 'debitoValore', 'debitoPercentuale'];
  dataSource;
  expandedElement: Sal[] | null;
  isLoadingSal: Observable<boolean>;
  routeSub: any;
  // sal: SmartContract<SmartContractType.Sal>;
  // parametri: SmartContract<SmartContractType.Parametri>;

  constructor(private salService: SalService, private activatedRoute: ActivatedRoute,
              private blockchainService: BlockchainService) { }

  ngOnInit() {
    this.dataSource = this.salService.vociSal.pipe(
      tap(value => console.log(value)),
      shareReplay()
    );
    this.isLoadingSal = this.salService.isLoadingObs.pipe(
      tap(value => console.log(value)),
      shareReplay()
    );
    // this.dataSource = this.salService.sal;
    // this.routeSub = this.activatedRoute.parent.paramMap.pipe(
    //   switchMap(params => {
    //   this.contractId = params.get('contractId');
    //   console.log(this.contractId);
    //   // switchToContract per il titolo del contratto
    //   this.sal = this.blockchainService.getSmartContract(this.contractId,
    //     SmartContractType.Sal) as SmartContract<SmartContractType.Sal>;
    //   this.parametri = this.blockchainService.getSmartContract(this.contractId,
    //     SmartContractType.Parametri) as SmartContract<SmartContractType.Parametri>;
    //   return this.salService.loadSal(this.sal, this.parametri);
    // })).subscribe(sal => {
    //   this.salService.updateSal(sal);
    //   console.log(sal);
    // });
  }

  ngOnDestroy(): void {
    // this.routeSub.unsubscribe();
  }
}

// export interface PeriodicElement {
//   id_soglia: number;
//   importo: number;
//   data_approvazione: string;
//   id: number;
//   tariffa: string;
//   data: string;
//   indicazione: string;
//   quantita: number;
//   importounitario: number;
//   aliquote1: number;
//   importototale: number;
//   aliquote2: number;
//  }



//  const ELEMENT_DATA: PeriodicElement[] = [
//    // tslint:disable-next-line:max-line-length
//    { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
//    // tslint:disable-next-line:max-line-length
//    { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
//    // tslint:disable-next-line:max-line-length
//    { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
//    // tslint:disable-next-line:max-line-length
//    { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019',  indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
//    // tslint:disable-next-line:max-line-length
//    { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
//    // tslint:disable-next-line:max-line-length
//    { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
//    // tslint:disable-next-line:max-line-length
//    { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
//    // tslint:disable-next-line:max-line-length
//    { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019',  indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
//    { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
//    // tslint:disable-next-line:max-line-length
//    { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
//    // tslint:disable-next-line:max-line-length
//    { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019',  indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
//    // tslint:disable-next-line:max-line-length
//  ];



