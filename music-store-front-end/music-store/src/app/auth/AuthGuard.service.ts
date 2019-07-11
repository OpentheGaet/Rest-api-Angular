import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  path : ActivatedRouteSnapshot[];
  route : ActivatedRouteSnapshot;

  constructor(private router : Router) {}

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot)
  : Observable <boolean> | Promise <boolean> | boolean {

    let warningMsg = 'Not any token is available';
    if (!localStorage.role || !localStorage.token) {
      return this.destroyConnexion();
    } else if (localStorage.role == '' || localStorage.token == '') {
      return this.destroyConnexion();
    } else if (localStorage.role  !== 'ROLE_ADMIN' || localStorage.token !== localStorage.allowToken) {
      return this.destroyConnexion();
    } else if (localStorage.token === warningMsg) {
      return this.destroyConnexion();
    } else {
      return true;
    }
  }

  destroyConnexion() {
    localStorage.clear();
    return this.router.navigate(['/home']);
  }
}
