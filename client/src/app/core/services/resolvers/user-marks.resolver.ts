import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Store } from '@ngrx/store';
import { IState } from 'src/app/core/services/models/IState';
import { IAuth } from 'src/app/core/services/models/IAuth';

@Injectable()
export class UserMarksResolver implements Resolve<any> {
  email;
  user;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private store: Store<IState>) {
    this.store.select('auth').subscribe((data: IAuth) => {
      this.email = data.user ? data.user.userEmail : '';
      this.user = data.user ? data.user : '';
    });
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    if(this.user.role === 2) {
      return this.userService.getUserMarks(route.params['email']);
    }
    return this.userService.getUserMarks(this.email);
  }
} 