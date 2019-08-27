import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectModule } from '@angular/material';
import {Router} from '@angular/router';
import { DialogInserimentoMisura } from '@app/interfaces';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { NG_MODEL_WITH_FORM_CONTROL_WARNING } from '@angular/forms/src/directives';


@Component({
  selector: 'app-dialog-body-inslibretto',
  templateUrl: './dialog-body-inslibretto.component.html',
  styleUrls: ['./dialog-body-inslibretto.component.css']
})

export class DialogBodyInslibrettoComponent implements OnInit {

  form: FormGroup;
  formOptions;

  constructor(
    public dialogRef: MatDialogRef<DialogBodyInslibrettoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.formOptions = data;
  }

  ngOnInit() {
    const formValues = {
      descrizione: ['', [Validators.required]],
      categoriaContabile: ['', [Validators.required]],
      percentuale: [1, [Validators.required, Validators.min(1), Validators.max(100),
        // Validators.pattern('/^-?[0-9][^\.]*$/'),
      ]],
      riserva: ['', []],
    };
    this.form = this.fb.group(formValues, { validator: maxPercentualeValidator(this.formOptions.percentualiParziali)});
    // this.form = new FormGroup({
    //   descrizione: new FormControl('', [Validators.required]),
    //   categoriaContabile: new FormControl('', [Validators.required]),
    //   percentuale: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100),
    //     Validators.pattern('/^-?[0-9][^\.]*$/'), maxPercentualeValidator(this.formOptions.percentualiParziali)]),
    //   riserva: new FormControl('')
    // });
  }

  get percentuale() {
    return this.form.get('percentuale');
  }

  get categoriaContabile() {
    return this.form.get('categoriaContabile');
  }

  get descrizione() {
    return this.form.get('descrizione');
  }

  close(): void {
    this.dialogRef.close();
  }

  // confirm() {
  //   console.log('funziona!');
  // }
}

function maxPercentualeValidator(percentualiParziali: Map<string, number>): ValidatorFn {
  return (fg: FormGroup): { [key: string]: boolean } | null => {
    const percentuale = fg.get('percentuale').value;
    const categoriaContabile = fg.get('categoriaContabile').value;
    let max = 100;
    // percentualiParziali.every(element => {
    //   if (element.categoriaContabile === categoriaContabile)  {
    //     max = max - element.percentuale;
    //     return true;
    //   }
    // });
    const parziale = percentualiParziali.get(categoriaContabile);
    if (parziale) {
      max = max - parziale;
    }
    return percentuale <= max ? null : {maxPercentuale: true};
  };
}


