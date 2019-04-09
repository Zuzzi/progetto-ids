import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { DialogBodyInsgiornaleComponent } from '../dialog-body-insgiornale/dialog-body-insgiornale.component';
import { DialogBodyVisallegatiComponent } from '../dialog-body-visallegati/dialog-body-visallegati.component';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-giornale',
  templateUrl: './giornale.component.html',
  styleUrls: ['./giornale.component.css']
})
export class GiornaleComponent implements OnInit {

  selectedDate: any;
  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;

  constructor(private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.isDirettoreLogged = this.authService.titleCheck('direttore');
  }

  onSelect(event) {
    this.selectedDate = event;
  }

  openDialogInserimento() {
    const dialogRef = this.dialog.open(DialogBodyInsgiornaleComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  openDialogAllegati() {
    const dialogRef = this.dialog.open(DialogBodyVisallegatiComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

}
