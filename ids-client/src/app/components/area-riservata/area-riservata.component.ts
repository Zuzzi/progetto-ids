import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/services/auth/auth.service';
import {Router} from '@angular/router';
import { UserTitle } from '@app/interfaces';
import { UserService } from '@app/services/user/user.service';


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

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isDirettoreLogged = this.userService.titleCheck(UserTitle.Direttore);
    this.user = this.userService.getUser();

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
    }
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
