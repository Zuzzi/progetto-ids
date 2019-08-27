import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-body-visriserva',
  templateUrl: './dialog-body-visriserva.component.html',
  styleUrls: ['./dialog-body-visriserva.component.css']
})
export class DialogBodyVisriservaComponent implements OnInit {
  riserva: string;

  constructor(public dialogRef: MatDialogRef<DialogBodyVisriservaComponent>,  @Inject(MAT_DIALOG_DATA) public data) {
    this.riserva = data;
   }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
