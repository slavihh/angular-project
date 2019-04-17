import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';

@Injectable()
export class UserSubjectResolver implements Resolve<any> {
  email;
  user;
  paramName;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, store: Store<any>) {
    store.select('auth').subscribe(data => {
      this.email = data.user ? data.user.userEmail : '';
      this.user = data.user ? data.user : '';
    });
  }
 
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    if(this.user.role === 2) {
      return this.userService.getUserSubjects(route.params['email']);
    }
    return this.userService.getUserSubjects(this.email);
  }
} 