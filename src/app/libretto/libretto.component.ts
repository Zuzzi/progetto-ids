import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { DialogBodyInslibrettoComponent } from '../dialog-body-inslibretto/dialog-body-inslibretto.component';
import { DialogBodyVisriservaComponent } from '../dialog-body-visriserva/dialog-body-visriserva.component';
import { DialogBodyVisallegatiComponent } from '../dialog-body-visallegati/dialog-body-visallegati.component';
import { DialogBodyAddriservaComponent } from '../dialog-body-addriserva/dialog-body-addriserva.component';


@Component({
  selector: 'app-libretto',
  templateUrl: './libretto.component.html',
  styleUrls: ['./libretto.component.css']
})
export class LibrettoComponent implements OnInit {

  displayedColumns = ['id', 'tariffa', 'data', 'categoriacontabile', 'descrizione', 'percentuale', 'allegati', 'riserva'];
  dataSource = ELEMENT_DATA;

  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== null ) {
      const user = localStorage.getItem('user');
      console.log(user);
      if (user.valueOf() === 'direttore'.valueOf()) {
                this.isDirettoreLogged = true;
                console.log('sono uguali');
      } else if (user.valueOf() === 'ditta'.valueOf()) {
        this.isDittaLogged = true;
        console.log('sono uguali');
    } else {
      console.log('sono diversi');
      this.isDirettoreLogged = false;
      this.isDittaLogged = false;
    }
  }
}

  openDialogInserimento() {
    const dialogRef = this.dialog.open(DialogBodyInslibrettoComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  openDialogVisRiserva() {
    const dialogRef = this.dialog.open(DialogBodyVisriservaComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  openDialogAddRiserva() {
    const dialogRef = this.dialog.open(DialogBodyAddriservaComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  openDialogVisAllegati() {
    const dialogRef = this.dialog.open(DialogBodyVisallegatiComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

}

const ELEMENT_DATA: PeriodicElement[] = [
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza', riservaAdd: 'Aggiungi'}
];

export interface PeriodicElement {
  id: number;
  tariffa: string;
  data: string;
  categoriacontabile: string;
  descrizione: string;
  percentuale: string;
  allegati: string;
  riservaVis: string;
  riservaAdd: string;

}
