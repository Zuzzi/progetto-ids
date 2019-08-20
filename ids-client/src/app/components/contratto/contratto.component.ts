import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibrettoService } from '@app/services/libretto/libretto.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, concatMap, filter } from 'rxjs/operators';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import { SmartContractType, SmartContract } from '@app/interfaces';

@Component({
  selector: 'app-contratto',
  templateUrl: './contratto.component.html',
  styleUrls: ['./contratto.component.css']
})
export class ContrattoComponent implements OnInit, OnDestroy {

  contractId: string;
  routeSub: any;

  constructor(private activatedRoute: ActivatedRoute, private librettoService: LibrettoService,
              private blockchainService: BlockchainService) { }

  ngOnInit() {
    this.routeSub = this.activatedRoute.paramMap.pipe(
      map(params => {
        return params.get('contractId');
      }),
      switchMap(contractId => {
      // switchToContract per il titolo del contratto
      this.contractId = contractId;
      this.librettoService.switchToContract(this.contractId);
      return this.librettoService.loadMisure();
    })).subscribe(misure => this.librettoService.updateMisure(misure));
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
