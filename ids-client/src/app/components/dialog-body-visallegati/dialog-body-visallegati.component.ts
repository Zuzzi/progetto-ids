import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dialog-body-visallegati',
  templateUrl: './dialog-body-visallegati.component.html',
  styleUrls: ['./dialog-body-visallegati.component.css']
})
export class DialogBodyVisallegatiComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBodyVisallegatiComponent>, private router: Router) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    console.log('funziona!');
  }
}




