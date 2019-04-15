import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class UserSubjectResolver implements Resolve<any> {
  email;
  paramName;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {}
 
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.userService.getUserSubjects(route.params['email']);
  }
} 