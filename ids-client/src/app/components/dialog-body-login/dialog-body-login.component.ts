import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from '@app/services/auth/auth.service';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import {concatMap} from 'rxjs/operators';
import { UserService } from '@app/services/user/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-dialog-body-login',
  templateUrl: './dialog-body-login.component.html',
  styleUrls: ['./dialog-body-login.component.css']
})
export class DialogBodyLoginComponent implements OnInit {


  formLogin: FormGroup;
  credentialsMistake: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogBodyLoginComponent>, private router: Router,
              private userService: UserService, private authService: AuthService,
              private blockchainService: BlockchainService,
              private fb: FormBuilder) {
                this.formLogin = this.fb.group({
                  username: ['', Validators.required],
                  password: ['', Validators.required]
                });
               }

  ngOnInit() { }

  login() {
    if (this.formLogin.valid) {
      this.credentialsMistake = false;
      const username = this.formLogin.value.username;
      const password = this.formLogin.value.password;
      this.authService.validateLogin(username, password)
        .subscribe(result => {
          if (result) {
            const firstContract = this.userService.getContracts()[0];
            this.dialogRef.close();
            this.router.navigate(['/area-riservata/contract', firstContract._id, 'libretto']);
          } else {
              this.credentialsMistake = true;
            }
        });
    }
  }

  close() {
    this.dialogRef.close();
  }

}
