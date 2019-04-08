import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Router} from '@angular/router';
import {UtilsService} from '../utils.service';



@Component({
  selector: 'app-dialog-body-login',
  templateUrl: './dialog-body-login.component.html',
  styleUrls: ['./dialog-body-login.component.css']
})
export class DialogBodyLoginComponent implements OnInit {


  username: string;
  password: string;
  credentialsMistake: boolean;

  constructor(public dialogRef: MatDialogRef<DialogBodyLoginComponent>, private router: Router, private utilsService: UtilsService) { }

  ngOnInit() {
    this.credentialsMistake = false;
  }

  login() {
    if (this.utilsService.validateLogin(this.username, this.password)) {
      console.log('User authenticated!');
      this.credentialsMistake = false;
      this.dialogRef.close();
      this.router.navigate(['/area-riservata', {outlets: { reserved: ['home']}}]);
      } else {
      console.log('Access not allowed!');
      this.credentialsMistake = true;
    }
  }

  validateLogin() {
    if (this.username && this.password) {
        this.utilsService.validateLogin(this.username, this.password).subscribe(result => {
        console.log('result is ', result);
        if (result['status'] === 'success') {
          alert('Correct credentials!');
        } else {
          alert('Wrong credentials!');
        }
      }, error => {
        console.log('error is ', error);
      });
    } else {
        alert('enter user name and password');
    }
  }

  close() {
    this.dialogRef.close();
  }

}
