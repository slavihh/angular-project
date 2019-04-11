import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { LocalStorage } from '../local-storage';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JwtGuard implements CanActivate {
    private exp;
    private refExp;
    private loggedIn: boolean;
    public auth;
    constructor(public store: Store<any>, private router: Router, private local: LocalStorage) {
      store.select('auth').subscribe((data) => {
          this.auth = data;
      });
    }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      this.loggedIn = this.auth ? this.auth.loggedIn : '';
      this.exp = this.auth.authToken !== null ? this.auth.authToken.exp : '';
      this.refExp = this.auth.authToken !== null ? this.auth.authToken.refreshExp : '';
      console.log(this.auth)
      const now = Math.floor(new Date().getTime() / 1000);
      if (this.loggedIn && (now > this.exp || now > this.refExp) ) {
        this.local.clear();
        location.reload();
        return false;
      }
      return true;
    }
}