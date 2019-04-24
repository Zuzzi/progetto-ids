import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog} from '@angular/material';
import {DialogBodyInfocontrattoComponent} from '../dialog-body-infocontratto/dialog-body-infocontratto.component';
import { BlockchainService } from '../blockchain.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  LineChart: any[];



constructor(private dialog: MatDialog) {} // private blockchain: BlockchainService) { }

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
  // this.blockchain.getMisure('5cb8aa3fd0c0660b2c8afd80').subscribe(result => console.log(result));
}


  openDialog() {
    const dialogRef = this.dialog.open(DialogBodyInfocontrattoComponent);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

}
