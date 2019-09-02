import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '@app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ContrattoGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const contractId = next.params.contractId;
    if (contractId === '') {
      const firstContract = this.userService.getContracts()[0]._id;
      this.router.navigate(['area-riservata/contract', firstContract]);
      return false;
    }
    return true;

  }

}
