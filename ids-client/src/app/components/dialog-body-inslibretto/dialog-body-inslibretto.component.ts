import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectModule } from '@angular/material';
import {Router} from '@angular/router';
import { DialogInserimentoMisura } from '@app/interfaces';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-dialog-body-inslibretto',
  templateUrl: './dialog-body-inslibretto.component.html',
  styleUrls: ['./dialog-body-inslibretto.component.css']
})


export class DialogBodyInslibrettoComponent implements OnInit {

  form: FormGroup;
  selectOptions;

  constructor(
    public dialogRef: MatDialogRef<DialogBodyInslibrettoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.selectOptions = data;
  }

  ngOnInit() {
    const formValues = {
      descrizione: ['', []],
      categoriaContabile: ['', []],
      percentuale: [null, []],
      riserva: ['', []],
    };
    this.form = this.fb.group(formValues);
  }

  close(): void {
    this.dialogRef.close();
  }

  // confirm() {
  //   console.log('funziona!');
  // }
}

