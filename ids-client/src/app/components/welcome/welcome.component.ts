import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog} from '@angular/material';
import { DialogBodyLoginComponent } from '@app/components/dialog-body-login/dialog-body-login.component';
import { AuthService } from '@app/services/auth/auth.service';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css',
    '../layout-first-page/vendor/bootstrap/css/bootstrap.min.css',
    '../layout-first-page/vendor/fontawesome-free/css/all.min.css',
    '../layout-first-page/vendor/simple-line-icons/css/simple-line-icons.css',
    '../layout-first-page/css/stylish-portfolio.min.css']
})
export class WelcomeComponent implements OnInit {



  constructor( private router: Router, private dialog: MatDialog, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {

}

onSubmit() {
  console.log('funziona!');

}


openDialog() {
  const dialogRef = this.dialog.open(DialogBodyLoginComponent);
  dialogRef.afterClosed().subscribe(value => {
    console.log(`Dialog sent: ${value}`);
  });
}

}
