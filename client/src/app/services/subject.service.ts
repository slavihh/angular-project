import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public authToken;
  public API_BASE_URL = 'http://localhost:4000';
  
  constructor(public http: HttpClient, public store: Store<any>, private toastr: ToastrService, private router: Router) { 
    this.store.select('auth').subscribe(data => {
      this.authToken = data.authToken;
    })
   }

  getAllSubjects(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `JWT ${this.authToken.token}`
      })
    }
    return this.http.get(`${this.API_BASE_URL}/subject/all`, httpOptions);
  }

  createReq(name: string) {

    const body = {
      name
    };
    return this.postReq(body, '/subject/create');
  }
  editSubject(subjectName: string, newName: string) {
    const body = {
      subjectName,
      newName
    };
    return this.postReq(body, '/subject/edit');
  }

  postReq(body, url): Observable<{msg: string}> {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `JWT ${this.authToken.token}`,
      })
    };
    return this.http.post<{msg: string}>(`${this.API_BASE_URL}${url}`, JSON.stringify(body), httpOptions);

  }
}
