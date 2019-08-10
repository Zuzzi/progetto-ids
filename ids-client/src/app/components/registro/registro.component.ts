import { Component, OnInit } from '@angular/core';
import { DialogBodyInsregistroComponent } from '@app/components/dialog-body-insregistro/dialog-body-insregistro.component';
import { MatDialog } from '@angular/material';
import { DialogBodyApprovazioneComponent } from '@app/components/dialog-body-approvazione/dialog-body-approvazione.component';
import {AuthService} from '@app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RegistroService } from '@app/services/registro/registro.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  displayedColumns = ['no', 'tariffa', 'data', 'designazione', 'categoriaContabile',
   'percentuale', 'prezzoPercentuale', 'debitoValore', 'debitoPercentuale'];
  dataSource;
  contractId: string;
  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;

  constructor(private dialog: MatDialog, private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private registroService: RegistroService) { }

  ngOnInit() {
    this.isDirettoreLogged = this.authService.titleCheck('direttore');
    this.isRupLogged = this.authService.titleCheck('rup');
    this.dataSource = this.registroService.vociRegistro;
    this.activatedRoute.parent.paramMap.pipe(
      switchMap(params => {
      this.contractId = params.get('contractId');
      console.log(this.contractId);
      // switchToContract per il titolo del contratto
      return this.registroService.loadRegistro(this.contractId);
    }))
    .subscribe();
  }

  // openDialogInserimentoRegistro() {
  //   const dialogRef = this.dialog.open(DialogBodyInsregistroComponent);
  //   dialogRef.afterClosed().subscribe(value => {
  //     console.log(`Dialog sent: ${value}`);
  //   });
  // }

  // openDialogConfermaRegistro() {
  //   const dialogRef = this.dialog.open(DialogBodyApprovazioneComponent);
  //   dialogRef.afterClosed().subscribe(value => {
  //     console.log(`Dialog sent: ${value}`);
  //   });
  // }

}
