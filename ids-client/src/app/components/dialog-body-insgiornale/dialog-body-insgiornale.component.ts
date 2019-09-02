import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
      qualifica: new FormControl('', [Validators.required]),
      orePresenza: new FormControl(null, [Validators.required]),
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
      tipologia: new FormControl('', [Validators.required]),
      quantita: new FormControl('', [Validators.required]),
    });
  }

  addAttrezzatura() {
    this.form.get('attrezzature').push(this.createFormAttrezzature());
  }

  removeAttrezzatura(index: number) {
    this.form.get('attrezzature').removeAt(index);
  }

  get attrezzature() {
    return this.form.get('attrezzature');
  }

  get operai() {
    return this.form.get('operai');
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

