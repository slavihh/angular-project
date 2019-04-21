import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { getAuthToken } from '../../+store';
import { IState } from './models/IState';
import { IResponse } from './models/IResponse';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'http://localhost:4000';
  private authToken;
  private httpOptions;
  constructor(private http: HttpClient, private store: Store<IState>) {
    store.select(getAuthToken).subscribe(token => {
      this.authToken = token;
    });
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `JWT ${this.authToken.token}`,
        'Content-Type': 'application/json'
      })
    };
   }

  post(url, body) {
    return this.http.post<IResponse>(`${this.baseUrl}${url}`, JSON.stringify(body), this.httpOptions);
  }
  get(url) {
    return this.http.get(`${this.baseUrl}${url}`, this.httpOptions);
  }

  put(url, body) {
    return this.http.put<IResponse>(`${this.baseUrl}${url}`, JSON.stringify(body), this.httpOptions);
  }

  delete(url) {
    return this.http.delete<IResponse>(`${this.baseUrl}${url}`, this.httpOptions);
  }
}
