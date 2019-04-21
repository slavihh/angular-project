import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { Store } from '@ngrx/store';
import { IState } from 'src/app/core/services/models/IState';
import { IAuth } from 'src/app/core/services/models/IAuth';

@Injectable()
export class UserSubjectResolver implements Resolve<any> {
  email;
  user;
  paramName;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, store: Store<IState>) {
    store.select('auth').subscribe((data: IAuth) => {
      this.email = data.user ? data.user.userEmail : '';
      this.user = data.user ? data.user : '';
    });
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    if (this.user.role === 2) {
      return this.userService.getUserSubjects(route.params['email']);
    }
    return this.userService.getUserSubjects(this.email);
  }
} 