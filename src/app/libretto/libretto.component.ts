import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { DialogBodyInslibrettoComponent } from '../dialog-body-inslibretto/dialog-body-inslibretto.component';


@Component({
  selector: 'app-libretto',
  templateUrl: './libretto.component.html',
  styleUrls: ['./libretto.component.css']
})
export class LibrettoComponent implements OnInit {

  displayedColumns = ['id', 'tariffa', 'data', 'categoriacontabile', 'descrizione', 'percentuale', 'allegati', 'riserva'];
  dataSource = ELEMENT_DATA;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialogInserimento() {
    const dialogRef = this.dialog.open(DialogBodyInslibrettoComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

}

const ELEMENT_DATA: PeriodicElement[] = [
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'METTERE GLYPHICON', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riserva: 'no'}
];

export interface PeriodicElement {
  id: number;
  tariffa: string;
  data: string;
  categoriacontabile: string;
  descrizione: string;
  percentuale: string;
  allegati: string;
  riserva: string;

}