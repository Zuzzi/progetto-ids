import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-body-insgiornale',
  templateUrl: './dialog-body-insgiornale.component.html',
  styleUrls: ['./dialog-body-insgiornale.component.css']
})
export class DialogBodyInsgiornaleComponent implements OnInit {

  form;
  createFormOperai;
  createFormAttrezzature;

  constructor(public dialogRef: MatDialogRef<DialogBodyInsgiornaleComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.form = this.data.formInserimento;
    this.createFormOperai = this.data.createFormOperai;
    this.createFormAttrezzature = this.data.createFormAttrezzature;
   }

  ngOnInit() {

  }

  addOperaio() {
    this.form.get('operai').push(this.createFormOperai());
  }

  removeOperaio(index: number) {
    this.form.get('operai').removeAt(index);
  }

  addAttrezzatura() {
    this.form.get('attrezzature').push(this.createFormAttrezzature());
  }

  removeAttrezzatura(index: number) {
    this.form.get('attrezzature').removeAt(index);
  }


  close() {
    this.dialogRef.close();
  }

  confirm() {
    console.log('funziona!');
  }


}

