import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dialog-body-insgiornale',
  templateUrl: './dialog-body-insgiornale.component.html',
  styleUrls: ['./dialog-body-insgiornale.component.css']
})
export class DialogBodyInsgiornaleComponent implements OnInit {

  form;
  formOptions = {elencoQualifiche: [], elencoAttrezzature: []};

  constructor(public dialogRef: MatDialogRef<DialogBodyInsgiornaleComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.form = this.data.formInserimento;
    this.formOptions.elencoQualifiche = this.data.elencoQualifiche;
    this.formOptions.elencoAttrezzature = this.data.elencoAttrezzature;
   }

  ngOnInit() {

  }

  createFormOperai() {
    return new FormGroup({
      nome: new FormControl(''),
      cognome: new FormControl(''),
      qualifica: new FormControl(''),
      orePresenza: new FormControl(null),
    });
  }

  addOperaio() {
    this.form.get('operai').push(this.createFormOperai());
  }

  removeOperaio(index: number) {
    this.form.get('operai').removeAt(index);
  }

  createFormAttrezzature() {
    return new FormGroup({
      tipologia: new FormControl(''),
      quantita: new FormControl(''),
    });
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

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(true);
    }
  }


}

