import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IState } from '../models/IState';
import { IAuth } from '../models/IAuth';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  private loggedIn: boolean;
  private role: number;
  public authToken: number;
  constructor(private router: Router, store: Store<IState>) {
    store.select('auth').subscribe((data: IAuth) => {
      this.authToken = data.authToken ? data.authToken : null;
      this.role = data.user ? data.user.role : null;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(this.authToken && this.role !== 1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
