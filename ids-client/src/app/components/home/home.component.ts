import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog} from '@angular/material';
import {DialogBodyInfocontrattoComponent} from '@app/components/dialog-body-infocontratto/dialog-body-infocontratto.component';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import { ParametriService } from '@app/services/parametri/parametri.service';
import { publishReplay, refCount, tap, filter, delay } from 'rxjs/operators';
import { DialogInfoContratto } from '@app/interfaces';
import { UserService } from '@app/services/user/user.service';
import { zip, Observable, combineLatest } from 'rxjs';
import { SalService } from '@app/services/sal/sal.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  LineChart: Chart;
  misure: Array<any> = [];

  vociSalSource;
  categorieSource;
  struttureSource;
  soglieSource;
  infoPagamentoSource;
  chartSub;

  constructor(private dialog: MatDialog, private userService: UserService,
              private parametriService: ParametriService, private salService: SalService) {}
  ngOnInit() {
    // Line chart:

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
    );
    this.vociSalSource = this.salService.vociSal.pipe(
      tap(value => console.log(value)),
      publishReplay(1),
      refCount()
    );
    this.infoPagamentoSource = this.salService.infoPagamento.pipe(
      tap(value => console.log(value)),
      publishReplay(1),
      refCount()
    );

    this.chartSub = combineLatest(this.vociSalSource,
    this.soglieSource,
    this.infoPagamentoSource).pipe(delay(100))
      .subscribe(([vociSal, soglie, info]) => {
        if (!vociSal.isLoading && !soglie.isLoading && !info.isLoading) {
        const dataY = [];
        const dataX = [];
        const pipe = new DatePipe('it');
        vociSal.data.forEach(sal => {
          dataY.push(sal.valore);
          dataX.push(pipe.transform(sal.data, 'shortDate'));
        });
        dataY.push(info.data.totaleLavoriAcorpo);
        dataX.push(pipe.transform(Date.now(), 'shortDate'));
        soglie.data.forEach(soglia => {
          if (!soglia.superata) {
            dataY.push(soglia.valore);
          }
        });
        this.drawChart(dataX, dataY, soglie.data);
        }
      });
  }

  openDialog() {
    const dialogInfoContratto: DialogInfoContratto = {
      descrizione: '',
      elencoCategorie: this.categorieSource,
      elencoSoglie: this.soglieSource,
      elencoStrutture: this.struttureSource,
    };
    const dialogRef = this.dialog.open(DialogBodyInfocontrattoComponent,
      { data: dialogInfoContratto }
    );
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  drawChart(dataX, dataY, soglie) {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
    data: {
      labels: dataX,
      datasets: [{
          label: 'SAL attuale',
          data: dataY,
          fill: false,
          lineTension: 0.2,
          borderColor: 'red',
          borderWidth: 1
      },
      ]
    },
    options: {
      legend: {
        labels: {
            filter: function(legendItem, chartData) {
             return (legendItem.datasetIndex === 0);
            }
         }
     },
      responsive: true,
      maintainAspectRatio: false,
      title: {
          display: true
      },
      scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Soglie Monetarie'
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
    const length = this.LineChart.data.datasets[0].data.length;
    soglie.forEach(soglia => {
      this.LineChart.data.datasets.push( {
      data: new Array(length).fill(soglia.valore),
      borderColor: 'gray',
      borderWidth: 1,
      fill: false,
      lineTension: 0.2,
      radius: 1,
      type: 'line',
      borderDash: [5, 5],
      });
    });
    this.LineChart.update();
  }

  ngOnDestroy() {
    this.chartSub.unsubscribe();
  }

}
