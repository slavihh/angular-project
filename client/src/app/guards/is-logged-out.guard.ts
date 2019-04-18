import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedOutGuard implements CanActivate {
  loggedIn: boolean;
  constructor(private router: Router, store: Store<any>) {
    store.select('auth').subscribe((data) => {
      this.loggedIn = data.loggedIn;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean { 
      if(this.loggedIn) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
   }
  
}
