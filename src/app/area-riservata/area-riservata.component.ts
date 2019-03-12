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

  constructor() { }

  ngOnInit() {
  }


  navbar(){
    
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
