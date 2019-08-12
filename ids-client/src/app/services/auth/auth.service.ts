import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User, SmartContractType, UserTitle} from '@app/interfaces';
import { userInfo } from 'os';
import { UserProfileComponent } from '@app/components/user-profile/user-profile.component';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import { UserService} from '@app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // private user: User;

  constructor(private http: HttpClient, private blockchainService: BlockchainService,
              private userService: UserService) {
    // this.user = new User();
   }

  validateLogin(username, password) {
    //console.log(username + ' ' + password);
    return this.http.post('/api/user/getUser', {
      username,
      password
    })
    .pipe(map(result => {
      if (result['status'] === 'success' ) {
        const user = result['data'];
        this.userService.setUser(user);
        this.blockchainService.unlockAccount(user.keystore, password);
        return {success: true, userDetail: user};
      } else {
        return {success: false, userDetail: null };
      }
    }));
  }

  // getUser() {
  //   console.log(this.user);
  //   return this.user;
  // }

  // getContracts() {
  //   return this.user.contracts;
  // }

  // titleCheck(title: UserTitle) {
  //   let test = false;
  //   if (this.user.title !== null ) {
  //     if (this.user.title === title) {
  //               test = true;
  //     } else {
  //       test = false;
  //     }
  //   }
  //   return test;
  // }

  // getAddress(contractId: string, type: SmartContractType): string {
  //   const contract = this.user.contracts.find(element => element._id === contractId);
  //   return contract[type].address;
  // }


}

