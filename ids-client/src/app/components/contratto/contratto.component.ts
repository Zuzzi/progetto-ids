import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibrettoService } from '@app/services/libretto/libretto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, concatMap, filter, tap, catchError, onErrorResumeNext, publishReplay, refCount, delay, delayWhen } from 'rxjs/operators';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import { SmartContractType, SmartContract } from '@app/interfaces';
import { Observable, of, EMPTY, forkJoin, interval } from 'rxjs';
import { SalService } from '@app/services/sal/sal.service';
import { RegistroService } from '@app/services/registro/registro.service';
import { ParametriService } from '@app/services/parametri/parametri.service';
import { AuthService } from '@app/services/auth/auth.service';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-contratto',
  templateUrl: './contratto.component.html',
  styleUrls: ['./contratto.component.css']
})
export class ContrattoComponent implements OnInit, OnDestroy {

  contractName: string;
  contractId: string;
  routeSub: any;
  infoPagamentoSource;
  valoreTotaleSource;
  txEventsSource = this.blockchainService.txEvents;

  constructor(private activatedRoute: ActivatedRoute, private librettoService: LibrettoService,
              private registroService: RegistroService, private salService: SalService,
              private parametriService: ParametriService, private userService: UserService,
              private blockchainService: BlockchainService, private router: Router) { }

  ngOnInit() {
    this.routeSub = this.activatedRoute.paramMap.pipe(
      map(params => {
        const contractId = params.get('contractId');
        const contract = this.userService.getContractById(contractId);
        if (!contract) {
          const firstContract = this.userService.getContractByIndex(0)._id;
          this.router.navigate(['area-riservata/contract', firstContract]);
          return false;
        }
        else {
          this.contractName = contract.nome;
          this.contractId = contractId;
          return true;
        }
      }),
      filter(value => value),
      concatMap( () => {
        this.switchToContract();
        return this.loadContract();
      }),
    ).subscribe();

    this.infoPagamentoSource = this.salService.infoPagamento.pipe(
      tap(value => console.log(value)),
      publishReplay(1),
      refCount()
    );
    this.valoreTotaleSource = this.parametriService.valoretotale.pipe(
      tap(value => console.log(value)),
      publishReplay(1),
      refCount()
    );
  }

  loadContract() {
    return forkJoin(
      this.librettoService.loadMisure(),
      this.registroService.loadContabilita(),
      this.salService.loadSal(),
      this.salService.loadInfoPagamento(),
      this.parametriService.loadCategorieContabili(),
      this.parametriService.loadStrutture(),
      this.parametriService.loadQualifiche(),
      this.parametriService.loadAttrezzature(),
      this.parametriService.loadValoreTotale(),
    );
  }

  switchToContract() {
    this.librettoService.switchToContract(this.contractId);
    this.registroService.switchToContract(this.contractId);
    this.salService.switchToContract(this.contractId);
    this.parametriService.switchToContract(this.contractId);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
