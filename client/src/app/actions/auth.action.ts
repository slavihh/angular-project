import {
  NgRedux
} from "@angular-redux/store";
import {
  IAppState
} from "./../store";
import {
  LocalStorage
} from "../local-storage";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import {
  Observable
} from "rxjs";
import {
  Injectable, Output, EventEmitter
} from "@angular/core";
import {
  IAuth
} from "../models/IAuth";
import {
  Router
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthAction {
  // tslint:disable-next-line:max-line-length
  constructor(
    private ngRedux: NgRedux < IAppState >,
    private localStorage: LocalStorage,
    private http: HttpClient,
    public router: Router
  ) {}

  public SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
  public SET_USER = "SET_USER";
  public CLEAR_AUTH = 'CLEAR_AUTH'
  private API_BASE_URL = "http://localhost:4000";
  
  setAuthToken(authToken) {
    this.ngRedux.dispatch({
      type: this.SET_AUTH_TOKEN,
      payload: authToken
    });
  }
  setUser(user) {
    this.ngRedux.dispatch({
      type: this.SET_USER,
      payload: user
    });
  }
  clearLocal() {
    this.ngRedux.dispatch({type: this.CLEAR_AUTH});
  }
  storeAuthInfo(authToken, user) {
    this.setAuthToken(authToken);
    this.localStorage.saveAuthToken(authToken);
    this.setUser(user);
    this.localStorage.saveUser(user);
  }
  login(email: string, password: string) {
    this.auth("login", email, password).subscribe(data => {
      this.router.navigate([""]);
      this.storeAuthInfo(data.authToken, data.user);
    });
  }

  register(email: string, password: string) {
    this.auth("register", email, password).subscribe(data => {
      this.router.navigate([""]);
      this.storeAuthInfo(data.authToken, data.user);
    });
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
    return this.http.post < IAuth > (url, JSON.stringify(body), httpOptions);
  }

}