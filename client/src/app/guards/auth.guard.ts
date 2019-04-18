import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Store } from '@ngrx/store';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private loggedIn: boolean;
  constructor(private router: Router, store: Store<any>) {
    store.select('auth').subscribe((data) => {
      this.loggedIn = data.loggedIn;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(!this.loggedIn) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
