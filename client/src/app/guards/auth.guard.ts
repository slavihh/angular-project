import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../store";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private loggedIn: boolean;
  constructor(public ngRedux: NgRedux<IAppState>, private router: Router) {
    this.loggedIn = ngRedux.getState().auth.loggedIn;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(this.loggedIn) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
