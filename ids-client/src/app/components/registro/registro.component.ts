import { Component, OnInit } from '@angular/core';
import { DialogBodyInsregistroComponent } from '@app/components/dialog-body-insregistro/dialog-body-insregistro.component';
import { MatDialog } from '@angular/material';
import { DialogBodyApprovazioneComponent } from '@app/components/dialog-body-approvazione/dialog-body-approvazione.component';
import {AuthService} from '@app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RegistroService } from '@app/services/registro/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  dataSource;
  contractId: string;
  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;

  constructor(private dialog: MatDialog, private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private registroService: RegistroService) { }

  ngOnInit() {
    this.isDirettoreLogged = this.authService.titleCheck('direttore');
    this.isRupLogged = this.authService.titleCheck('rup');
    this.contractId = this.activatedRoute.snapshot.params.contractId ||
      this.activatedRoute.snapshot.queryParams.contractId;
    this.registroService.init(this.contractId);
    this.dataSource = this.registroService.vociRegistro;
    this.registroService.loadContabilita();
  }

  // openDialogInserimentoRegistro() {
  //   const dialogRef = this.dialog.open(DialogBodyInsregistroComponent);
  //   dialogRef.afterClosed().subscribe(value => {
  //     console.log(`Dialog sent: ${value}`);
  //   });
  // }

  // openDialogConfermaRegistro() {
  //   const dialogRef = this.dialog.open(DialogBodyApprovazioneComponent);
  //   dialogRef.afterClosed().subscribe(value => {
  //     console.log(`Dialog sent: ${value}`);
  //   });
  // }

}
