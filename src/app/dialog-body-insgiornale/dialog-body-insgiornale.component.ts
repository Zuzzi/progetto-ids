import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dialog-body-insgiornale',
  templateUrl: './dialog-body-insgiornale.component.html',
  styleUrls: ['./dialog-body-insgiornale.component.css']
})
export class DialogBodyInsgiornaleComponent implements OnInit {

 constructor(public dialogRef: MatDialogRef<DialogBodyInsgiornaleComponent>, private router: Router) { }

  ngOnInit() {
  }


  close() {
    this.dialogRef.close();
  }

  confirm() {
    console.log('funziona!');
  }


}

