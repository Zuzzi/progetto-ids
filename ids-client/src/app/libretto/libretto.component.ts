import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { DialogBodyInslibrettoComponent } from '../dialog-body-inslibretto/dialog-body-inslibretto.component';
import { DialogBodyVisriservaComponent } from '../dialog-body-visriserva/dialog-body-visriserva.component';
import { DialogBodyVisallegatiComponent } from '../dialog-body-visallegati/dialog-body-visallegati.component';
import { DialogBodyApprovazionemisureComponent } from '../dialog-body-approvazionemisure/dialog-body-approvazionemisure.component';
import {AuthService} from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { BlockchainService } from '../blockchain.service';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-libretto',
  templateUrl: './libretto.component.html',
  styleUrls: ['./libretto.component.css']
})
export class LibrettoComponent implements OnInit {

  displayedColumns = ['id', 'tariffa', 'data', 'categoriacontabile', 'descrizione', 'percentuale', 'allegati', 'riserva'];
  // dataSource = ELEMENT_DATA;
  dataSource;
  contractID: string;
  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;

  constructor(private dialog: MatDialog, private authService: AuthService, private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService) { }

  ngOnInit() {
    this.isRupLogged = this.authService.titleCheck('rup');
    this.isDirettoreLogged = this.authService.titleCheck('direttore');
    this.isDittaLogged = this.authService.titleCheck('ditta');
    this.activatedRoute.params.subscribe(params =>
      {this.contractID = params['contractID'];
    });
    console.log(this.contractID);
    // this.blockchainService.getMisure(this.contractID).subscribe(misura => {console.log(misura); this.dataSource = [misura]; console.log(this.dataSource); });
    this.dataSource = this.blockchainService.getMisure(this.contractID).pipe(map(result => [result]));

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

  openDialogVisAllegati() {
    const dialogRef = this.dialog.open(DialogBodyVisallegatiComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  openDialogConfermaLibretto() {
    const dialogRef = this.dialog.open(DialogBodyApprovazionemisureComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

}

const ELEMENT_DATA: PeriodicElement[] = [
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'},
  // tslint:disable-next-line:max-line-length
  { id: 1 , tariffa: '001.002.001', data: '10/12/2018', categoriacontabile: 'Struttura di Fondazione', descrizione: 'Fabbricato A struttura', percentuale: '10%', allegati: 'dfasvas', riservaVis: 'Visualizza'}
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

}


