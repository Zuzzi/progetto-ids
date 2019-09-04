import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';
import {User, SmartContractType, UserTitle} from '@app/interfaces';
import { userInfo } from 'os';
import { UserProfileComponent } from '@app/components/user-profile/user-profile.component';
import { BlockchainService } from '@app/services/blockchain/blockchain.service';
import { UserService} from '@app/services/user/user.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // private user: User;
  isLogged = false;

  constructor(private http: HttpClient, private blockchainService: BlockchainService,
              private userService: UserService) {
    // this.user = new User();
   }

  validateLogin(username, password) {
    //console.log(username + ' ' + password);
    return this.http.post('/api/user/login', {
      username,
      password
    })
    .pipe(
      map(result => {
        console.log(result);
        if (result['valid']) {
          const user = result['data'];
          const token = result['JWTtoken'];
          const privateKey = result['privateKey'];
          this.login(user, privateKey);
          this.setSession(token);
          this.isLogged = true;
        }
        return result['valid'];
      }),
      shareReplay()
    );
  }

  isLoggedIn() {
    if (this.isLogged) {
      return of(true).pipe(shareReplay());
    } else {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        return this.http.post('/api/user/tokenlogin', {
          JWTtoken: token,
        }).pipe(
          map(result => {
            if (result['valid']) {
              const user = result['data'];
              const privateKey = result['privateKey'];
              this.login(user, privateKey);
              this.isLogged = true;
            }
            return result['valid'];
          }),
          shareReplay()
        );
      } else {
        return of(false).pipe(shareReplay());
      }
    }
  }

  private login(user, wallet) {
    this.userService.setUser(user);
    this.blockchainService.setAccount(wallet);
  }

  private setSession(token) {
    localStorage.setItem('jwt_token', token);
  }

  logout() {
    this.isLogged = false;
    localStorage.removeItem('jwt_token');
  }
}

