import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-body-approvazionemisure',
  templateUrl: './dialog-body-approvazionemisure.component.html',
  styleUrls: ['./dialog-body-approvazionemisure.component.css']
})
export class DialogBodyApprovazionemisureComponent {

  constructor(public dialogRef: MatDialogRef<DialogBodyApprovazionemisureComponent>, private router: Router) { }

  // ngOnInit() {
  // }

  //utilizzando la direttiva mat-dialog-close questi metodo non servono

  // close() {
  //   this.dialogRef.close();
  // }

  // confirm() {
  //   this.dialogRef.close(true);
  // }

}
