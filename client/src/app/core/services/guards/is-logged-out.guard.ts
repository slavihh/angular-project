import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAuth } from '../models/IAuth';
import { IState } from '../models/IState';
import { getIsAuth } from '../../../+store';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedOutGuard implements CanActivate {
  loggedIn: boolean;
  constructor(private router: Router, store: Store<IState>) {
    store.select(getIsAuth).subscribe(isLogged => {
      this.loggedIn = isLogged;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
      if (this.loggedIn) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
   }
  
}
