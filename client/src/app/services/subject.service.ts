import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public authToken;
  public API_BASE_URL = 'http://localhost:4000'
  constructor(public http: HttpClient, public store: Store<any>) { 
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

  create(name) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `JWT ${this.authToken.token}`,
      })
    };
    return this.http.post<object>(`${this.API_BASE_URL}/subject/create`,JSON.stringify({name}), httpOptions)

  }
}
