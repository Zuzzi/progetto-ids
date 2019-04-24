import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// definire un'interfaccia per il tipo utente
  private user;

  constructor(private http: HttpClient) { }

  validateLogin(username, password) {
    //console.log(username + ' ' + password);
    return this.http.post('/api/user/getUser', {
      username,
      password
    })
    .pipe(map(result => {
      if (result['status'] === 'success' ) {
        this.user= result['data'];
        return {success: true, userdetail: result['data']};
      } else {
        return {success: false, userdetail: null };
      }
    }));
  }

  getUser() {
    return this.user;
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

  // getUser(username) {
  //   return this.http.post('/api/user/getUser', {username});
  // }



}

