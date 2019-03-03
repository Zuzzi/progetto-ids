import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-body-login',
  templateUrl: './dialog-body-login.component.html',
  styleUrls: ['./dialog-body-login.component.css']
})
export class DialogBodyLoginComponent implements OnInit {


  username: string;
  password: string;
  credentialsMistake: boolean;

  constructor(public dialogRef: MatDialogRef<DialogBodyLoginComponent>, private router: Router) { }

  ngOnInit() {
    this.credentialsMistake = false;
  }

  login() {
    if (this.isAuthenticated()) {
      console.log('User authenticated!');
      this.credentialsMistake = false;
      this.dialogRef.close();
      this.router.navigate(['/area-riservata']);
    } else {
      console.log('Access not allowed!');
      this.credentialsMistake = true;
    }
  }

  close() {
    this.dialogRef.close();
  }

  isAuthenticated() {
    let test = false;
    if ((this.username === 'carlo') && (this.password === '123')) {

      const user =  {
        username: this.username,
        password: this.password
      };
      console.log(JSON.stringify(user) + ' has been authenticated!');
      // localStorage.setItem('user', JSON.stringify(user));
      test = true;

    } else {
      test = false;
    }

    return test;
  }



}
