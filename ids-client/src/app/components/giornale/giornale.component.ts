import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { DialogBodyInsgiornaleComponent } from '@app/components/dialog-body-insgiornale/dialog-body-insgiornale.component';
import { DialogBodyVisallegatiComponent } from '@app/components/dialog-body-visallegati/dialog-body-visallegati.component';
import {AuthService} from '@app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

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
  contractId: string;

  constructor(private dialog: MatDialog, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isDirettoreLogged = this.authService.titleCheck('direttore');
    this.activatedRoute.parent.paramMap.subscribe(params => {
      console.log(params.get('contractId'));
    });
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
