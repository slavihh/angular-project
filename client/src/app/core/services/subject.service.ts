import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from './http.service';
import { IState } from './models/IState';
import { IAuth } from './models/IAuth';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public authToken;
  public API_BASE_URL = 'http://localhost:4000';
  constructor( public store: Store<IState>, private toastr: ToastrService, private http: HttpService) {
    this.store.select('auth').subscribe((data: IAuth) => {
      this.authToken = data.authToken ? data.authToken : '';
    });
   }

  getAllSubjects() {
    return this.http.get(`/subject`);
  }

  create(name: string) {
    const body = {
      name
    };
    return this.http.post('/subject', body);
  }
  edit(subjectName: string, newName: string) {
    const body = {
      subjectName,
      newName
    };
    return this.http.put('/subject', body);
  }
  delete(subjectName) {
    const body = {
      subjectName
    };
    return this.http.delete(`/subject?subjectName=${subjectName}`);
  }
}
