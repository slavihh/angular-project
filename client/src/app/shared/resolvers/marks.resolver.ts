import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MarkService } from 'src/app/services/mark.service';

@Injectable()
export class MarksResolver implements Resolve<any> {
  constructor(private markService: MarkService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.markService.getAllMarks();
  }
} 