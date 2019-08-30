import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDatepickerInputEvent, MatButtonToggleGroupMultiple} from '@angular/material';
import { DialogBodyInsgiornaleComponent } from '@app/components/dialog-body-insgiornale/dialog-body-insgiornale.component';
import { DialogBodyVisallegatiComponent } from '@app/components/dialog-body-visallegati/dialog-body-visallegati.component';
import {AuthService} from '@app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserTitle } from '@app/interfaces';
import { UserService } from '@app/services/user/user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GiornaleService } from '@app/services/giornale/giornale.service';
import { tap, publishReplay, refCount } from 'rxjs/operators';

@Component({
  selector: 'app-giornale',
  templateUrl: './giornale.component.html',
  styleUrls: ['./giornale.component.css']
})
export class GiornaleComponent implements OnInit, OnDestroy {

  date;
  formInserimento;
  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;
  contractId: string;
  routeSub: any;
  giornaleSource = this.giornaleService.vocegiornale.pipe(
    tap(value => console.log(value)),
    publishReplay(1),
    refCount()
  );

  constructor(private dialog: MatDialog, private userService: UserService, private activatedRoute: ActivatedRoute,
              private giornaleService: GiornaleService, private fb: FormBuilder) { }

  ngOnInit() {
    this.isDirettoreLogged = this.userService.titleCheck(UserTitle.Direttore);
    this.routeSub = this.activatedRoute.parent.paramMap.subscribe(params => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      this.date = today;
      console.log(this.date);
      this.giornaleService.switchToContract(params.get('contractId'));
      this.giornaleService.loadGiornale(this.date).subscribe();
      this.formInserimento = this.createFormInserimento();
      console.log(params.get('contractId'));
    });
  }

  createFormInserimento() {
    return this.fb.group({
      no: 1,
      data: this.date,
      descrizioneLocazione: '',
      allegati: '',
      operai: this.fb.array([this.createFormOperai()]),
      attrezzature: this.fb.array([this.createFormAttrezzature()]),
    });
  }

  createFormOperai() {
    return new FormGroup({
      nome: new FormControl(''),
      cognome: new FormControl(''),
      qualifica: new FormControl(''),
      orePresenza: new FormControl(null),
    });
  }

  createFormAttrezzature() {
    return new FormGroup({
      tipologia: new FormControl(''),
      quantita: new FormControl(''),
    });
  }

  onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = event;
    this.giornaleService.loadGiornale(this.date).subscribe();
    console.log(this.date);
  }


  openDialogInserimento() {
    const options = {
      data: {
        formInserimento: this.formInserimento,
        createFormOperai: this.createFormOperai,
        createFormAttrezzature: this.createFormAttrezzature,
      }
    };
    const dialogRef = this.dialog.open(DialogBodyInsgiornaleComponent, options);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  openDialogAllegati() {
    const dialogRef = this.dialog.open(DialogBodyVisallegatiComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
