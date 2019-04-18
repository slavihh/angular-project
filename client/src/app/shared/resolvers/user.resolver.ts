import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';

@Injectable()
export class UserResolver implements Resolve<any> {
  user;
  constructor(private userService: UserService, store: Store<any>) {
    store.select('auth').subscribe(data => {
      this.user = data.user ? data.user : '';
    });
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    if (this.user.role === 2) {
      return this.userService.getAllUsers();
    }
  }
} 