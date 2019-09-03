import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogBodyInsregistroComponent } from '@app/components/dialog-body-insregistro/dialog-body-insregistro.component';
import { MatDialog } from '@angular/material';
import { DialogBodyApprovazioneComponent } from '@app/components/dialog-body-approvazione/dialog-body-approvazione.component';
import {AuthService} from '@app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RegistroService } from '@app/services/registro/registro.service';
import { switchMap, filter, tap, shareReplay, concatMapTo, refCount, publishReplay, pluck } from 'rxjs/operators';
import { UserTitle, SmartContract, SmartContractType } from '@app/interfaces';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import { UserService } from '@app/services/user/user.service';
import { SalService } from '@app/services/sal/sal.service';
import { Observable } from 'rxjs';
import { LibrettoService } from '@app/services/libretto/libretto.service';
import { ParametriService } from '@app/services/parametri/parametri.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, OnDestroy {

  displayedColumns = ['no', 'tariffa', 'data', 'designazione', 'categoriaContabile',
   'percentuale', 'prezzoPercentuale', 'debitoValore', 'debitoPercentuale'];
  vociRegistro;
  vociRegistroSource;
  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;
  registro: SmartContract<SmartContractType.Registro>;
  sal: SmartContract<SmartContractType.Sal>;
  isLoadingRegistro: Observable<boolean>;
  infoPagamentoSource;
  valoreTotaleSource;

  constructor(private dialog: MatDialog, private userService: UserService,
              private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService,
              private registroService: RegistroService, private salService: SalService,
              private librettoService: LibrettoService,
              private parametriService: ParametriService) { }

  ngOnInit() {
    // TODO: rimuovere questa modifica temporanea per testare conferma registro.
    // this.isRupLogged = this.userService.titleCheck(UserTitle.Rup);
    this.isRupLogged = true;
    this.isDirettoreLogged = this.userService.titleCheck(UserTitle.Direttore);
    this.isDittaLogged = this.userService.titleCheck(UserTitle.Ditta);
    this.vociRegistroSource = this.registroService.vociRegistro.pipe(
      tap(value => console.log(value)),
      publishReplay(1),
      refCount()
    );
    this.vociRegistro = this.vociRegistroSource.pipe(
      pluck('data'));
    // this.isLoadingRegistro = this.registroService.isLoadingObs.pipe(
    //   tap(value => console.log(value)),
    //   publishReplay(1),
    //   refCount()
    // );

    this.infoPagamentoSource = this.salService.infoPagamento.pipe(
      tap(value => console.log(value)),
      publishReplay(1),
      refCount()
    );
    this.valoreTotaleSource = this.parametriService.valoretotale.pipe(
      tap(value => console.log(value)),
      publishReplay(1),
      refCount()
    );

  }

  openDialogInserimentoRegistro() {
    const dialogRef = this.dialog.open(DialogBodyInsregistroComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  openDialogConfermaRegistro() {
    const dialogRef = this.dialog.open(DialogBodyApprovazioneComponent);
    dialogRef.afterClosed().pipe(filter(action => action))
      .subscribe( () => {
        this.approvaRegistro();
    });
  }

  approvaRegistro() {
    this.salService.approvaRegistro().pipe(
       concatMapTo(this.librettoService.loadMisure())
      ).subscribe();
  }

  ngOnDestroy() {
  }

}
