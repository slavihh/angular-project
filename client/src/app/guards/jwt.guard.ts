import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { LocalStorage } from '../local-storage';
@Injectable({
  providedIn: 'root'
})
export class JwtGuard implements CanActivate {
    private exp;
    private refExp;
    private loggedIn: boolean;
    private auth;
    constructor(private ngRedux: NgRedux<IAppState>, private router: Router, private local: LocalStorage) {
      this.auth = ngRedux.getState().auth;
      this.exp = this.auth.authToken ? this.auth.authToken.exp : '';
      this.refExp = this.auth.authToken ? this.auth.authToken.refreshExp : '';
      this.loggedIn = this.auth.loggedIn;
    }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      const now = Math.floor(new Date().getTime() / 1000);
      if (this.loggedIn && (now > this.exp || now > this.refExp) ) {
        this.local.clear();
        location.reload();
        return false;
      }
      return true;
    }
}