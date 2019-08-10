import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/services/auth/auth.service';
import {Router} from '@angular/router';


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
  user;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isDirettoreLogged = this.authService.titleCheck('direttore');
    this.user = this.authService.getUser();

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

  logOut() {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}
