import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/services/auth/auth.service';
import { map, first, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.islogged) {
        console.log(this.authService.islogged);
        return true;
      } else {
        return this.authService.tokenLogin().pipe(
          map( result  => {
           if (!result) {
             this.router.navigate(['/']);
            }
           return result;
          }),
          take(1));
    }
  }
}
