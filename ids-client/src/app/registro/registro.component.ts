import { Component, OnInit } from '@angular/core';
import { DialogBodyInsregistroComponent } from '../dialog-body-insregistro/dialog-body-insregistro.component';
import { MatDialog } from '@angular/material';
import { DialogBodyApprovazioneComponent } from '../dialog-body-approvazione/dialog-body-approvazione.component';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;

  constructor(private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.isDirettoreLogged = this.authService.titleCheck('direttore');
    this.isRupLogged = this.authService.titleCheck('rup');
  }

  openDialogInserimentoRegistro() {
    const dialogRef = this.dialog.open(DialogBodyInsregistroComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  openDialogConfermaRegistro() {
    const dialogRef = this.dialog.open(DialogBodyApprovazioneComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

}
