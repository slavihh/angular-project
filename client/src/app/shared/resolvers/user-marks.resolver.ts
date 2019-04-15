import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserMarksResolver implements Resolve<any> {
  email;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {}
 
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.userService.getUserMarks(route.params['email']);
  }
} 