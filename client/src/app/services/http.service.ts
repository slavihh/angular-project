import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { getAuthToken } from '../+store';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'http://localhost:4000';
  private authToken;
  constructor(private http: HttpClient, private store: Store<any>) {
    store.select(getAuthToken).subscribe(token => {
      this.authToken = token;
    });
   }

  post(url, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `JWT ${this.authToken.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<{msg: string}>(`${this.baseUrl}${url}`, JSON.stringify(body), httpOptions);
  }
  get(url) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `JWT ${this.authToken.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(`${this.baseUrl}${url}`, httpOptions);
  }

  put(url, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `JWT ${this.authToken.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<{msg: string}>(`${this.baseUrl}${url}`, JSON.stringify(body), httpOptions);
  }

  delete(url) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `JWT ${this.authToken.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<{msg: string}>(`${this.baseUrl}${url}`, httpOptions);
  }
}
