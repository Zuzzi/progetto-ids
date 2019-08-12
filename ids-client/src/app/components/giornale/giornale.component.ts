import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog} from '@angular/material';
import { DialogBodyInsgiornaleComponent } from '@app/components/dialog-body-insgiornale/dialog-body-insgiornale.component';
import { DialogBodyVisallegatiComponent } from '@app/components/dialog-body-visallegati/dialog-body-visallegati.component';
import {AuthService} from '@app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserTitle } from '@app/interfaces';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-giornale',
  templateUrl: './giornale.component.html',
  styleUrls: ['./giornale.component.css']
})
export class GiornaleComponent implements OnInit, OnDestroy {

  selectedDate: any;
  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;
  contractId: string;
  routeSub: any;

  constructor(private dialog: MatDialog, private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isDirettoreLogged = this.userService.titleCheck(UserTitle.Direttore);
    this.routeSub = this.activatedRoute.parent.paramMap.subscribe(params => {
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

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
