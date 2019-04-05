import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { DialogBodyInsgiornaleComponent } from '../dialog-body-insgiornale/dialog-body-insgiornale.component';
import { DialogBodyVisallegatiComponent } from '../dialog-body-visallegati/dialog-body-visallegati.component';

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

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== null ) {
      const user = localStorage.getItem('user');
      console.log(user);
      if (user.valueOf() === 'direttore'.valueOf()) {
                this.isDirettoreLogged = true;
                console.log('sono uguali');
      } else {
        console.log('sono diversi');
        this.isDirettoreLogged = false;

    }
    }

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
