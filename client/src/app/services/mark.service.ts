import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class MarkService {
  private API_BASE_URL = 'http://localhost:4000';
  private authToken;
  private httpOptions;
  constructor(private http: HttpClient, store: Store<any>) {
    store.select('auth').subscribe(data => {
      this.authToken = data.authToken ? data.authToken : '';
    });
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `JWT ${this.authToken.token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getAllMarks() {
    return this.http.get(`${this.API_BASE_URL}`, this.httpOptions);
  }
}
