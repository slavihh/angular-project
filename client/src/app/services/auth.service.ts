import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { StoreAuthInfo } from '../services/auth.info.service';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {
    private API_BASE_URL = 'http://localhost:4000'
    private stateAuth;
    public isUserLoggedIn: BehaviorSubject<boolean>;
    constructor(public storeAuthInfo: StoreAuthInfo, public router: Router, public http: HttpClient, public store: Store<any>, 
                public toastr: ToastrService) {
      store.select('auth').subscribe(data => {
        this.stateAuth = data;
      });
      this.isUserLoggedIn = new BehaviorSubject<boolean>(this.stateAuth.loggedIn);
    }
    auth(type: string, email: string, password: string): Observable < any > {
      const body = {
        email,
        password
      };
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const url = `${this.API_BASE_URL}/auth/${type}`;
      return this.http.post  (url, JSON.stringify(body), httpOptions);
    }
    login(email: string, password: string) {
      this.auth('login', email, password).subscribe(data => {
        this.router.navigateByUrl('/');
        this.toastr.success('Successfully logged')
        this.storeAuthInfo.save(data.authToken, data.user);
      }, err => this.toastr.error(err.error.message, 'Something went wrong'));
    }
    register(email: string, password: string) {
      this.auth('register', email, password).subscribe(data => {
        this.router.navigateByUrl('/');
        this.storeAuthInfo.save(data.authToken, data.user);
        this.toastr.success('Successfully registered');
      }, err => this.toastr.error(err.error.message, 'Something went wrong'));
    }
  }