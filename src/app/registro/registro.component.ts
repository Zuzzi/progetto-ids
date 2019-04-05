import { Component, OnInit } from '@angular/core';
import { DialogBodyInsregistroComponent } from '../dialog-body-insregistro/dialog-body-insregistro.component';
import { MatDialog } from '@angular/material';
import { DialogBodyApprovazioneComponent } from '../dialog-body-approvazione/dialog-body-approvazione.component';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      const user = localStorage.getItem('user');
      console.log(user);
      if (user.valueOf() === 'direttore'.valueOf()) {
        this.isDirettoreLogged = true;
        console.log('sono uguali');
      } else if (user.valueOf() === 'rup'.valueOf()) {
        this.isRupLogged = true;
        console.log('sono uguali');
      } else {
        console.log('sono diversi');
        this.isDirettoreLogged = false;
        this.isRupLogged = false;
      }
    }
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
