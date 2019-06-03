import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '@app/interfaces';
import { userInfo } from 'os';
import { UserProfileComponent } from '@app/components/user-profile/user-profile.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private user: User;

  constructor(private http: HttpClient) {
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
        this.initUser(result['data']);
        return {success: true, userDetail: result['data']};
      } else {
        return {success: false, userDetail: null };
      }
    }));
  }

  private initUser(input){

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
  }

  getUser() {
    console.log(this.user);
    return this.user;
  }

  
  setUser(usermod){
    //Da implementare
    console.log("ciao" + usermod.nome);
    return this.http.post('/api/user/setUser', usermod);
  }

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


}

