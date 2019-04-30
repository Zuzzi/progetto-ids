import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import { BlockchainService } from '../blockchain.service';
import {concatMap} from 'rxjs/operators';



@Component({
  selector: 'app-dialog-body-login',
  templateUrl: './dialog-body-login.component.html',
  styleUrls: ['./dialog-body-login.component.css']
})
export class DialogBodyLoginComponent implements OnInit {


  username: string;
  password: string;
  credentialsMistake: boolean;

  constructor(public dialogRef: MatDialogRef<DialogBodyLoginComponent>, private router: Router,
              private authService: AuthService,
              private blockchainService: BlockchainService) { }

  ngOnInit() {
    this.credentialsMistake = false;
  }

  validateLogin() {
    if (this.username && this.password) {
        this.authService.validateLogin(this.username, this.password)
        .subscribe(result => {
        console.log('result is ', result);
        if (result.success) {
          const userDetail = result.userDetail;
          console.log('contratti:'+ userDetail.contracts);
          this.blockchainService.loadContracts(userDetail.contracts);
          // this.blockchainService.unlockAccount(userDetail.keystore, userDetail.password);
          const userTitle = userDetail.title;
          // console.log('user data: ' + userTitle);
          localStorage.setItem('title', userTitle);
          this.dialogRef.close();
          this.router.navigate(['/area-riservata', {outlets: { reserved: ['home']}}]);
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
