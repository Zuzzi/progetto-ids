import { Component, OnInit } from '@angular/core';
import Contratto from '../model/Contratto';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  lista: any;

  constructor() { }

  ngOnInit() {
    const contratto1 = {
      nome: 'Contratto1',
      visible: true
    };

    const contratto2 = {
      nome: 'Contratto2',
      visible: false
    };

    const contratto3 = {
      nome: 'Contratto3',
      visible: false
    };
    this.lista = [contratto1, contratto2, contratto3];
  }

  showSubNavbar(nome) {

  }





}
