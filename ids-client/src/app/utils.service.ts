import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }


  isAuthenticated(username, password) {
    let test = false;
    if (((username === 'direttore') || (username === 'rup') || (username === 'ditta')) && (password === '123')) {

      const user =  {
        username: username,
        password: password
      };
      console.log(JSON.stringify(user) + ' has been authenticated!');
      localStorage.setItem('user', user.username);
      test = true;

    } else {
      test = false;
    }

    return test;
  }

  validateLogin(username, password) {
    console.log(username + ' ' + password);
    return this.http.post('/api/user/login', {
      username : username,
      password : password
    });
  }
}

