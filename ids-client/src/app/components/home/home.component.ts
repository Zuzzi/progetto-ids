import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog} from '@angular/material';
import {DialogBodyInfocontrattoComponent} from '@app/components/dialog-body-infocontratto/dialog-body-infocontratto.component';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import { ParametriService } from '@app/services/parametri/parametri.service';
import { publishReplay, refCount, tap } from 'rxjs/operators';
import { DialogInfoContratto } from '@app/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  LineChart: any[];
  misure: Array<any> = [];

  categorieSource;
  struttureSource;
  soglieSource;

  dialogInfoContratto: DialogInfoContratto = {
    descrizione: '',
    elencoCategorie: this.categorieSource,
    elencoSoglie: this.soglieSource,
    elencoStrutture: this.struttureSource,
  };

  constructor(private dialog: MatDialog,
              private parametriService: ParametriService ) {}
  ngOnInit() {
    // Line chart:
    this.LineChart = new Chart('lineChart', {
      type: 'line',
    data: {
     labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug'],
     datasets: [{
         label: 'SAL attuale',
         data: [2000, 5000 , 6500, 7800, 12000, 15000, 20000, 25000],
         fill: false,
         lineTension: 0.2,
         borderColor: 'red',
         borderWidth: 1
     }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
     title: {
         display: true
     },
     scales: {
         yAxes: [{
           scaleLabel: {
             display: true,
             labelString: '% Valore Monetario Realizzato'
           },
             ticks: {
                 beginAtZero: true
             }
         }],
         xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Tempo'
          },
            ticks: {
                beginAtZero: true
            }
        }]
     }
    }
    });
    this.categorieSource = this.parametriService.categorie.pipe(
      publishReplay(1),
      refCount()
    );
    this.struttureSource = this.parametriService.strutture.pipe(
      publishReplay(1),
      refCount()
    );
    this.soglieSource = this.parametriService.soglie.pipe(
      publishReplay(1),
      refCount()
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogBodyInfocontrattoComponent,
      { data: this.dialogInfoContratto }
    );
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

}
