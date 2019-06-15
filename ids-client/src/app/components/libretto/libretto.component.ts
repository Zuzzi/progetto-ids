import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { DialogBodyInslibrettoComponent } from '@app/components/dialog-body-inslibretto/dialog-body-inslibretto.component';
import { DialogBodyVisriservaComponent } from '@app/components/dialog-body-visriserva/dialog-body-visriserva.component';
import { DialogBodyVisallegatiComponent } from '@app/components/dialog-body-visallegati/dialog-body-visallegati.component';
import { DialogBodyApprovazionemisureComponent } from '@app/components/dialog-body-approvazionemisure/dialog-body-approvazionemisure.component';
import {AuthService} from '@app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import {map} from 'rxjs/operators';
import {LibrettoService} from '@app/services/libretto/libretto.service';
import { Misura } from '@app/interfaces';

@Component({
  selector: 'app-libretto',
  templateUrl: './libretto.component.html',
  styleUrls: ['./libretto.component.css']
})
export class LibrettoComponent implements OnInit {

  displayedColumns = ['no', 'tariffa', 'data', 'designazione', 'categoriaContabile', 'percentuale', 'allegati', 'riserva'];
  // dataSource = ELEMENT_DATA;
  dataSource;
  contractID: string;
  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;

  constructor(private dialog: MatDialog, private authService: AuthService,
              private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService,
              private librettoService: LibrettoService) { }

  ngOnInit() {
    this.isRupLogged = this.authService.titleCheck('rup');
    this.isDirettoreLogged = this.authService.titleCheck('direttore');
    this.isDittaLogged = this.authService.titleCheck('ditta');
    this.activatedRoute.params.subscribe(params =>
      {this.contractID = params['contractID'];
    });
    console.log(this.contractID);
    this.librettoService.init(this.contractID);
    this.dataSource = this.librettoService.misure;
    this.librettoService.loadMisure();
    console.log(this.dataSource)
    // this.blockchainService.getMisure(this.contractID).subscribe(misura => {console.log(misura); this.dataSource = [misura]; console.log(this.dataSource); });
    //this.dataSource = this.blockchainService.getMisure(this.contractID).pipe(map(result => [result]));

}

  openDialogInserimento() {
    const dialogRef = this.dialog.open(DialogBodyInslibrettoComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  openDialogVisRiserva() {
    const dialogRef = this.dialog.open(DialogBodyVisriservaComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  openDialogVisAllegati() {
    const dialogRef = this.dialog.open(DialogBodyVisallegatiComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  openDialogConfermaLibretto() {
    const dialogRef = this.dialog.open(DialogBodyApprovazionemisureComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  insertMisura() {
    const misura = {};
    this.librettoService.insertMisura(misura);
  }

}
