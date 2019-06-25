import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-body-invalidamisura',
  templateUrl: './dialog-body-invalidamisura.component.html',
  styleUrls: ['./dialog-body-invalidamisura.component.css']
})
export class DialogBodyInvalidamisuraComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBodyInvalidamisuraComponent>, private router: Router) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    console.log('funziona!');
  }

}

