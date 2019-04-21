import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Store } from '@ngrx/store';
import { IState } from '../models/IState';
import { IAuth } from '../models/IAuth';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authToken: boolean;
  constructor(private router: Router, store: Store<IState>) {
    store.select('auth').subscribe((data: IAuth) => {
      this.authToken = data.authToken ? data.authToken : null;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(!this.authToken) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
