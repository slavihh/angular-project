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
  contructor(ngRedux: NgRedux<IAppState>) {
    this.loggedIn = ngRedux.getState().auth.loggedIn;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkIfLogged();
  }
  checkIfLogged(): boolean {
    if (!this.loggedIn) {
      return true;
    }
    return false;
  }
}
