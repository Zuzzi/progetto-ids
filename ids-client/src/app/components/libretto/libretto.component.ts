import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyInslibrettoComponent } from '@app/components/dialog-body-inslibretto/dialog-body-inslibretto.component';
import { DialogBodyVisriservaComponent } from '@app/components/dialog-body-visriserva/dialog-body-visriserva.component';
import { DialogBodyVisallegatiComponent } from '@app/components/dialog-body-visallegati/dialog-body-visallegati.component';
import { DialogBodyApprovazionemisureComponent } from '@app/components/dialog-body-approvazionemisure/dialog-body-approvazionemisure.component';
import {AuthService} from '@app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
// import {map} from 'rxjs/operators';
import {LibrettoService} from '@app/services/libretto/libretto.service';
import { DialogInserimentoMisura, Misura } from '@app/interfaces';
import { DialogBodyInvalidamisuraComponent } from '@app/components/dialog-body-invalidamisura/dialog-body-invalidamisura.component';
import { RegistroService } from '@app/services/registro/registro.service';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-libretto',
  templateUrl: './libretto.component.html',
  styleUrls: ['./libretto.component.css']
})

export class LibrettoComponent implements OnInit, OnDestroy {

  displayedColumns = ['no', 'tariffa', 'data', 'designazione', 'categoriaContabile', 'percentuale', 'allegati', 'riserva', 'invalida'];
  dataSource;
  contractId: string;
  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;
  dialogInserimentoData: DialogInserimentoMisura = {categoriaContabile: '',
  descrizione: '', percentuale: null, riserva: ''};

  constructor(private dialog: MatDialog, private authService: AuthService,
              private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService,
              private librettoService: LibrettoService,
              private registroService: RegistroService) { }

  ngOnInit() {
    this.isRupLogged = this.authService.titleCheck('rup');
    this.isDirettoreLogged = this.authService.titleCheck('direttore');
    this.isDittaLogged = this.authService.titleCheck('ditta');
    this.contractId = this.activatedRoute.snapshot.params.contractId ||
      this.activatedRoute.snapshot.queryParams.contractId;
    console.log(this.contractId);
    this.librettoService.init(this.contractId);
    this.dataSource = this.librettoService.misure;
    this.librettoService.loadMisure();
    console.log(this.dataSource);
}
  // TODO: Modificare passaggio valori per renderlo più ordinato
  openDialogInserimento(): void {
    const dialogRef = this.dialog.open(DialogBodyInslibrettoComponent, {
      data: this.dialogInserimentoData
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        console.log('Dialog sent: ' + value);
        this.dialogInserimentoData = value;
        this.insertMisura();
    }
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
    dialogRef.afterClosed().pipe(filter(action => action))
      .subscribe( () => {
      this.approvaMisure();
    });
  }

  openDialogInvalidaMisura(noMisura: Misura['no']) {
    const dialogRef = this.dialog.open(DialogBodyInvalidamisuraComponent);
    dialogRef.afterClosed().pipe(filter(action => action))
    .subscribe(() => {
      this.invalidaMisura(noMisura);
    });
  }

  insertMisura() {
    console.log(this.dialogInserimentoData);
    // TODO: Ripartire da qui per implemetare feedback eventi transazione ad utente
    // const txEvents = this.blockchainService.txEvents;
    this.librettoService.insertMisura(this.dialogInserimentoData);
  }

  approvaMisure() {
    this.registroService.init(this.contractId);
    this.registroService.approvaMisure()
      .subscribe( () => {
        console.log('Transaction Completed !');
        this.librettoService.loadMisure();
      });
  }

  invalidaMisura(noMisura: Misura['no']) {
    this.librettoService.invalidaMisura(noMisura)
    .subscribe(() => {
      console.log('Transaction completed !');
      this.librettoService.loadMisure();
    });
  }

  ngOnDestroy(): void {
  }

}
