import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogInfoContratto } from '@app/interfaces';
import { ParametriService } from '@app/services/parametri/parametri.service';
import { filter, switchMap, map, tap, delay, share, shareReplay, concatMapTo, publishReplay, refCount, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-body-infocontratto',
  templateUrl: './dialog-body-infocontratto.component.html',
  styleUrls: ['./dialog-body-infocontratto.component.css']
})
export class DialogBodyInfocontrattoComponent implements OnInit {
  valoreTotaleSource;
  constructor(public dialogRef: MatDialogRef<DialogBodyInfocontrattoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogInfoContratto,
              private parametriService: ParametriService) { }


  ngOnInit() {
    this.valoreTotaleSource = this.parametriService.valoretotale.pipe(
      tap(value => console.log(value)),
      publishReplay(1),
      refCount()
    );
  }

  conversione(valore) {
    return valore / (Math.pow(2, 64));
  }

  close(): void {
    this.dialogRef.close();
  }




}
