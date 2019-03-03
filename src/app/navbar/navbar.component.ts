import { Component, OnInit } from '@angular/core';
import Contratto from '../model/Contratto';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  listaContratti: any;

  constructor() { }

  ngOnInit() {

    this.listaContratti = [
      new Contratto('Contratto 1', 'contratto1'),
      new Contratto('Contratto 2', 'contratto2')
    ];


  }


}
