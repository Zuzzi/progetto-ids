import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Router} from '@angular/router';
import { DialogInserimentoMisura } from '@app/interfaces';

@Component({
  selector: 'app-dialog-body-inslibretto',
  templateUrl: './dialog-body-inslibretto.component.html',
  styleUrls: ['./dialog-body-inslibretto.component.css']
})


export class DialogBodyInslibrettoComponent {

  constructor(public dialogRef: MatDialogRef<DialogBodyInslibrettoComponent>,
    // private router: Router
              @Inject(MAT_DIALOG_DATA) public data: DialogInserimentoMisura) { }

  close(): void {
    this.dialogRef.close();
  }

  // confirm() {
  //   console.log('funziona!');
  // }
}

