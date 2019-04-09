import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuth } from '../models/IAuth';
import { StoreAuthInfo } from './auth.info.service';
import { LoginComponent } from '../auth/login/login.component';

@Injectable({
    providedIn: LoginComponent
})
export class AuthService {
    private API_BASE_URL = 'http://localhost:4000'
    constructor(public storeAuthInfo: StoreAuthInfo, public router: Router, public http: HttpClient) {}
    auth(type: string, email: string, password: string): Observable < IAuth > {
      const body = {
        email,
        password
      };
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      };
      const url = `${this.API_BASE_URL}/auth/${type}`;
      return this.http.post < IAuth > (url, JSON.stringify(body), httpOptions)
    }
  
    login(email: string, password: string) {
      this.auth("login", email, password).subscribe(data => {
      this.router.navigateByUrl('/', {skipLocationChange: true})
      this.storeAuthInfo.save(data.authToken, data.user);
      });
    }
    register(email: string, password: string) {
      this.auth("register", email, password).subscribe(data => {
        this.storeAuthInfo.save(data.authToken, data.user);
      });
    }
  
  }