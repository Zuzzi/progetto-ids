import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  validateLogin(username, password) {
    console.log(username + ' ' + password);
    return this.http.post('/api/user/login', {
      username : username,
      password : password
    });
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

