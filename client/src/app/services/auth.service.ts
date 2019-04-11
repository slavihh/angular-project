import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IAuth } from '../models/IAuth';
import { StoreAuthInfo } from './auth.info.service';
import { LoginComponent } from '../auth/login/login.component';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {
    private API_BASE_URL = 'http://localhost:4000'
    private stateAuth;
    private loggedIn: boolean;
    public isUserLoggedIn: BehaviorSubject<boolean>;
    constructor(public storeAuthInfo: StoreAuthInfo, public router: Router, public http: HttpClient, public store: Store<any>) {
      store.select('auth').subscribe(data => {
        this.stateAuth = data;
      });
      this.isUserLoggedIn = new BehaviorSubject<boolean>(this.stateAuth.loggedIn);
    }
    
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
        location.reload();
        this.storeAuthInfo.save(data.authToken, data.user);
        this.router.navigate(['']);

      });
    }
    register(email: string, password: string) {
      this.auth("register", email, password).subscribe(data => {
        location.reload();
        this.storeAuthInfo.save(data.authToken, data.user);
        this.router.navigate(['']);
      });
    }
    isLogged() {
     return this.loggedIn = this.stateAuth ? this.stateAuth.loggedIn : '';
    }
  }