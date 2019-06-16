import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User, Type} from '@app/interfaces';
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
        return {success: true, userDetail: result['data']};
      } else {
        return {success: false, userDetail: null };
      }
    }));
  }

  private initUser(input){
    // TODO: rimuovere questi assegnamenti definendo per bene interfaccia
    // utente che mappa UserSchema mongoose
    this.user.username = input.username;
    this.user.password = input.password;
    this.user.title = input.title;
    this.user.nome = input.nome;
    this.user.cognome = input.cognome;
    this.user.data = input.data;
    this.user.codiceFiscale = input.codiceFiscale;
    this.user.residenza = input.residenza;
    this.user.email = input.email;
    this.user.telefono = input.telefono;
    this.user.citta = input.citta;
    this.user.provincia = input.provincia;
    this.user.CAP = input.CAP;
    this.user.keystore = input.keystore;
    this.user.contracts = input.contracts;
    this.blockchainService.unlockAccount(this.user.keystore, this.user.password)
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

  getAddress(contractId: string, type: Type): string {
    const contract = this.user.contracts.find(element => element._id === contractId);
    return contract[type].address;
  }


}

