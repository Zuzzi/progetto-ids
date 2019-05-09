import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-body-inslibretto',
  templateUrl: './dialog-body-inslibretto.component.html',
  styleUrls: ['./dialog-body-inslibretto.component.css']
})
export class DialogBodyInslibrettoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBodyInslibrettoComponent>, private router: Router) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    console.log('funziona!');
  }
}

