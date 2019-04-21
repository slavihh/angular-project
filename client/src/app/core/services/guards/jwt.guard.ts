import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { LocalStorage } from '../../local-storage';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { StoreAuthInfo } from '../auth.info.service';
import { ClearAuth } from '../../../+store/actions/auth.action';
import { IAuth } from '../models/IAuth';
import { IState } from '../models/IState';
@Injectable({
  providedIn: 'root'
})
export class JwtGuard implements CanActivate {
    private exp;
    private refExp;
    private loggedIn: boolean;
    private rememberMe;
    public auth;
    constructor(public store: Store<IState>, private router: Router, private local: LocalStorage, private authService: AuthService, 
                private storeAuthInfo: StoreAuthInfo) {
      store.select('auth').subscribe((data: IAuth) => {
          this.auth = data;
      });
    }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      this.loggedIn = this.auth ? this.auth.loggedIn : '';
      const now = Math.floor(new Date().getTime() / 1000);
      this.exp = this.auth.authToken !== null ? now > this.auth.authToken.exp : '';
      this.refExp = this.auth.authToken !== null ? now > this.auth.authToken.refreshExp : '';
      this.rememberMe = this.auth !== null ? this.auth.rememberMe : '';
      if (this.exp && !this.refExp && this.rememberMe) {
        this.authService.refresh().subscribe((res: {authToken: object, user: object}) => {
          this.storeAuthInfo.save(res.authToken, res.user, true);
        }, err => console.error(err));
        return true;
      } else if (this.exp && this.rememberMe === false) {
        this.local.clear();
        this.store.dispatch(new ClearAuth());
        this.router.navigate(['']);
        return false;
      } else if (this.refExp) {
        this.local.clear();
        this.store.dispatch(new ClearAuth());
        this.router.navigate(['']);
        return false;
      } 
      return true;
    }
}