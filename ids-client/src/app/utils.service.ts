import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  validateLogin(username, password) {
    console.log(username + ' ' + password);
    return this.http.post('/api/user/login', {
      username : username,
      password : password
    });
  }
}

