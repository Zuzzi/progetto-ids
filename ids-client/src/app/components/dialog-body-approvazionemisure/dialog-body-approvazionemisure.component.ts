import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-body-approvazionemisure',
  templateUrl: './dialog-body-approvazionemisure.component.html',
  styleUrls: ['./dialog-body-approvazionemisure.component.css']
})
export class DialogBodyApprovazionemisureComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBodyApprovazionemisureComponent>, private router: Router) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    console.log('funziona!');
  }

}