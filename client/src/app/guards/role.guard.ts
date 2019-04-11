import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private loggedIn: boolean;
  private role: number;
  constructor(private router: Router, store: Store<any>) {
    store.select('auth').subscribe((data) => {
      this.loggedIn = data.loggedIn;
      this.role = data.user.role;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(this.loggedIn && this.role !== 2) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
