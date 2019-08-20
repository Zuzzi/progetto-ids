import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogBodyInsregistroComponent } from '@app/components/dialog-body-insregistro/dialog-body-insregistro.component';
import { MatDialog } from '@angular/material';
import { DialogBodyApprovazioneComponent } from '@app/components/dialog-body-approvazione/dialog-body-approvazione.component';
import {AuthService} from '@app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RegistroService } from '@app/services/registro/registro.service';
import { switchMap, filter, tap, shareReplay } from 'rxjs/operators';
import { UserTitle, SmartContract, SmartContractType } from '@app/interfaces';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import { UserService } from '@app/services/user/user.service';
import { SalService } from '@app/services/sal/sal.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, OnDestroy {

  displayedColumns = ['no', 'tariffa', 'data', 'designazione', 'categoriaContabile',
   'percentuale', 'prezzoPercentuale', 'debitoValore', 'debitoPercentuale'];
  dataSource;
  contractId: string;
  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;
  registro: SmartContract<SmartContractType.Registro>;
  sal: SmartContract<SmartContractType.Sal>;
  routeSub: any;

  constructor(private dialog: MatDialog, private userService: UserService,
              private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService,
              private registroService: RegistroService, private salService: SalService) { }

  ngOnInit() {
    // TODO: rimuovere questa modifica temporanea per testare conferma registro.
    // this.isRupLogged = this.userService.titleCheck(UserTitle.Rup);
    this.isRupLogged = true;
    this.isDirettoreLogged = this.userService.titleCheck(UserTitle.Direttore);
    this.isDittaLogged = this.userService.titleCheck(UserTitle.Ditta);
    this.dataSource = this.registroService.vociRegistro.pipe(
      tap(value => console.log(value)),
      shareReplay()
      );
    // this.dataSource = this.registroService.vociRegistro;
  //   this.routeSub = this.activatedRoute.parent.paramMap.pipe(
  //     switchMap(params => {
  //     this.contractId = params.get('contractId');
  //     console.log(this.contractId);
  //     // switchToContract per il titolo del contratto
  //     this.registro = this.blockchainService.getSmartContract(this.contractId,
  //       SmartContractType.Registro) as SmartContract<SmartContractType.Registro>;
  //     this.sal = this.blockchainService.getSmartContract(this.contractId,
  //       SmartContractType.Sal) as SmartContract<SmartContractType.Sal>;
  //     return this.registroService.loadContabilita(this.registro);
  //   }))
  //   .subscribe(vociRegistro =>
  //     this.registroService.updateContabilita(vociRegistro));
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
      switchMap( () => {
        console.log('Transaction Completed !');
        return this.registroService.loadContabilita();
      }))
      .subscribe(vociRegistro =>
        this.registroService.updateContabilita(vociRegistro));
  }

  ngOnDestroy() {
    // this.routeSub.unsubscribe();
  }

}
