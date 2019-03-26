import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sal',
  templateUrl: './sal.component.html',
  styleUrls: ['./sal.component.css']
})
export class SalComponent implements OnInit {

  displayedColumns = ['id', 'tariffa', 'indicazione', 'quantita', 'importounitario', 'aliquote1', 'importototale', 'aliquote2'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}



const ELEMENT_DATA: PeriodicElement[] = [
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '1.000.001', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '1.000.001', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '1.000.001', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '1.000.001', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '1.000.001', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '1.000.001', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '1.000.001', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '1.000.001', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '1.000.001', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '1.000.001', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '1.000.001', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '1.000.001', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '1.000.001', indicazione: 'Categoria 1', quantita: 25, importounitario: 9.000, aliquote1: 10, importototale: 2.000, aliquote2: 2.3}
];

export interface PeriodicElement {
  id: number;
  tariffa: string;
  indicazione: string;
  quantita: number;
  importounitario: number;
  aliquote1: number;
  importototale: number;
  aliquote2: number;

}
