import { Component, OnInit } from '@angular/core';
import { DialogBodyInsregistroComponent } from '../dialog-body-insregistro/dialog-body-insregistro.component';
import { MatDialog} from '@angular/material';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialogInserimentoRegistro() {
    const dialogRef = this.dialog.open(DialogBodyInsregistroComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

}
