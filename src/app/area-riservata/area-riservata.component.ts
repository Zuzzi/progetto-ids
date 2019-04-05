import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-riservata',
  templateUrl: './area-riservata.component.html',
  styleUrls: ['./area-riservata.component.css',
  '../layout-area-riservata/vendor/bootstrap/css/bootstrap.min.css',
  '../layout-area-riservata/css/simple-sidebar.css']
})
export class AreaRiservataComponent implements OnInit {

  collapse = false;
  nascondi = '';
  arrow = 'arrowLeft';
  isDirettoreLogged: boolean;
  isRupLogged: boolean;
  isDittaLogged: boolean;

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('user') !== null ) {
      const user = localStorage.getItem('user');
      console.log(user);
      if (user.valueOf() === 'direttore'.valueOf()) {
                this.isDirettoreLogged = true;
                console.log('sono uguali');
      } else {console.log('sono diversi');
    }
    }
  }


  navbar() {
       if (!this.collapse) {
      this.nascondi = 'toggled';
      this.arrow = 'arrowRight';
      this.collapse = true;
    } else {
      this.nascondi = '';
      this.arrow = 'arrowLeft';
      this.collapse = false;
      console.log('oooooo');
    }
  }



}
