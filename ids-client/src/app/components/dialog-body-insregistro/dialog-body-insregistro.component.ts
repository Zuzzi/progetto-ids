import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-body-insregistro',
  templateUrl: './dialog-body-insregistro.component.html',
  styleUrls: ['./dialog-body-insregistro.component.css']
})
export class DialogBodyInsregistroComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBodyInsregistroComponent>, private router: Router) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    console.log('funziona!');
  }

}





