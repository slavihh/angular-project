import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { Store } from '@ngrx/store';
import { IState } from 'src/app/core/services/models/IState';
import { IAuth } from 'src/app/core/services/models/IAuth';

@Injectable()
export class UserResolver implements Resolve<any> {
  user;
  constructor(private userService: UserService, store: Store<IState>) {
    store.select('auth').subscribe((data: IAuth) => {
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