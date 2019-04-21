import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { SubjectService } from 'src/app/core/services/subject.service';
import { Observable } from 'rxjs';

@Injectable()
export class SubjectResolver implements Resolve<any> {
  constructor(private subjectService: SubjectService) {}
 
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.subjectService.getAllSubjects();
  }
}