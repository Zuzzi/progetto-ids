import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User, ContractType} from '@app/interfaces';
import { userInfo } from 'os';
import { UserProfileComponent } from '@app/components/user-profile/user-profile.component';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private user: User;

  constructor(private http: HttpClient, private blockchainService: BlockchainService) {
    this.user = new User();
   }

  validateLogin(username, password) {
    //console.log(username + ' ' + password);
    return this.http.post('/api/user/getUser', {
      username,
      password
    })
    .pipe(map(result => {
      if (result['status'] === 'success' ) {
        this.user = result['data'];
        this.blockchainService.unlockAccount(this.user.keystore, password);
        return {success: true, userDetail: result['data']};
      } else {
        return {success: false, userDetail: null };
      }
    }));
  }

  getUser() {
    console.log(this.user);
    return this.user;
  }

  getContracts() {
    return this.user.contracts;
  }


  setUser(usermod){
    //Da implementare
    console.log("ciao" + usermod.nome);
    return this.http.post('/api/user/setUser', usermod);
  }
  //TODO: non usare lo storage ma direttamente this.user
  titleCheck(title) {
    let test = false;
    if (localStorage.getItem('title') !== null ) {
      const titleStoraged = localStorage.getItem('title');
      if (titleStoraged.valueOf() === title.valueOf()) {
                test = true;
                console.log('sono uguali');
      } else {
        console.log('sono diversi');
        test = false;
    }
    }
    return test;

  }

  getAddress(contractId: string, type: ContractType): string {
    const contract = this.user.contracts.find(element => element._id === contractId);
    return contract[type].address;
  }


}

