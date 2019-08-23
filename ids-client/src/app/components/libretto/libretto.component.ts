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
import { DialogInserimentoMisura, Misura, UserTitle, SmartContract, SmartContractType } from '@app/interfaces';
import { DialogBodyInvalidamisuraComponent } from '@app/components/dialog-body-invalidamisura/dialog-body-invalidamisura.component';
import { RegistroService } from '@app/services/registro/registro.service';
import { filter, switchMap, map, tap, delay, share, shareReplay, concatMapTo, publishReplay, refCount } from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import { UserService } from '@app/services/user/user.service';
import { Observable, ReplaySubject, combineLatest, Subject, BehaviorSubject, zip } from 'rxjs';
import { ParametriService } from '@app/services/parametri/parametri.service';



@Component({
  selector: 'app-libretto',
  templateUrl: './libretto.component.html',
  styleUrls: ['./libretto.component.css']
})

export class LibrettoComponent implements OnInit, OnDestroy {

  displayedColumns = ['no', 'tariffa', 'data', 'designazione', 'categoriaContabile', 'percentuale', 'allegati', 'riserva', 'invalida'];
  dataSource;
  disableInput: Subject<boolean>;
  // contractId: string;
  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;
  dialogInserimentoData: DialogInserimentoMisura = {categoriaContabile: '',
  descrizione: '', percentuale: null, riserva: '',
  elencoCategorie: this.parametriService.categorie.pipe(publishReplay(1), refCount()),
  elencoStrutture: this.parametriService.strutture.pipe(publishReplay(1), refCount())};
  isLoadingLibretto: Observable<boolean>;
  // libretto: SmartContract<SmartContractType.Libretto>;
  // registro: SmartContract<SmartContractType.Registro>;
  contractId: ReplaySubject<string>;
  routeSub: any;

  constructor(private dialog: MatDialog, private userService: UserService,
              private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService,
              private librettoService: LibrettoService,
              private registroService: RegistroService,
              private parametriService: ParametriService) {}

  ngOnInit() {
    // TODO: rimuovere questa modifica temporanea per testare conferma registro.
    // this.isRupLogged = this.userService.titleCheck(UserTitle.Rup);
    this.isRupLogged = true;
    this.isDirettoreLogged = this.userService.titleCheck(UserTitle.Direttore);
    this.isDittaLogged = this.userService.titleCheck(UserTitle.Ditta);
    this.dataSource = this.librettoService.misure.pipe(
      tap(value => console.log(value)),
      publishReplay(1),
      refCount()
    );
    this.isLoadingLibretto = this.librettoService.isLoadingObs.pipe(
      tap(value => console.log(value)),
      publishReplay(1),
      refCount()
    );
  }
  // TODO: Modificare passaggio valori per renderlo più ordinato
  openDialogInserimento(): void {
    this.parametriService.loadCategorieContabili().subscribe();
    this.parametriService.loadStrutture().subscribe();
    const dialogRef = this.dialog.open(DialogBodyInslibrettoComponent, {
      data: this.dialogInserimentoData,
    },);

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
    this.librettoService.insertMisura(this.dialogInserimentoData)
      .subscribe();
  }

  approvaMisure() {
    this.registroService.approvaMisure().pipe(
      concatMapTo(this.librettoService.loadMisure())
    ).subscribe();
  }

  invalidaMisura(noMisura: Misura['no']) {
    this.librettoService.invalidaMisura(noMisura)
      .subscribe();
  }

  ngOnDestroy(): void {
  }

}
