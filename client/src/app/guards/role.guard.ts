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
  public authToken: number;
  constructor(private router: Router, store: Store<any>) {
    store.select('auth').subscribe((data) => {
      this.authToken = data.authToken ? data.authToken : null;
      this.role = data.user ? data.user.role : null;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(this.authToken && this.role !== 2) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
