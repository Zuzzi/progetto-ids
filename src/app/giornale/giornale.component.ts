import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-giornale',
  templateUrl: './giornale.component.html',
  styleUrls: ['./giornale.component.css']
})
export class GiornaleComponent implements OnInit {

  selectedDate: any;

  constructor() { }

  ngOnInit() {
  }

  onSelect(event) {
    this.selectedDate = event;
  }

}
