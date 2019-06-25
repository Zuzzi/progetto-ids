import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


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
export class SalComponent implements OnInit {

  columnsToDisplay = ['id_soglia', 'importo', 'data_approvazione'];
  internalColumns = ['id', 'tariffa', 'data', 'indicazione', 'quantita', 'importounitario', 'aliquote1', 'importototale', 'aliquote2'];
  dataSource = ELEMENT_DATA;
  expandedElement: PeriodicElement | null;

  constructor() { }

  ngOnInit() {
  }
}

export interface PeriodicElement {
  id_soglia: number;
  importo: number;
  data_approvazione: string;
  id: number;
  tariffa: string;
  data: string;
  indicazione: string;
  quantita: number;
  importounitario: number;
  aliquote1: number;
  importototale: number;
  aliquote2: number;

 }

 const ELEMENT_DATA: PeriodicElement[] = [
   // tslint:disable-next-line:max-line-length
   { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
   // tslint:disable-next-line:max-line-length
   { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
   // tslint:disable-next-line:max-line-length
   { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
   // tslint:disable-next-line:max-line-length
   { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019',  indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
   // tslint:disable-next-line:max-line-length
   { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
   // tslint:disable-next-line:max-line-length
   { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
   // tslint:disable-next-line:max-line-length
   { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
   // tslint:disable-next-line:max-line-length
   { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019',  indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
   { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
   // tslint:disable-next-line:max-line-length
   { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
   // tslint:disable-next-line:max-line-length
   { id_soglia: 1 , importo: 100000, data_approvazione: '10/02/2019',id: 1 , tariffa: '1.000.001', data: '10/02/2019',  indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
   // tslint:disable-next-line:max-line-length
 ];



