import { LocalStorage } from '../core/local-storage';
import { Store } from '@ngrx/store';
import { SetToken, SetUser, RememberMe } from '../+store/actions/auth.action';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})
export class StoreAuthInfo {
    constructor(public local: LocalStorage, public store: Store<object>, public router: Router) {
    }

    save(authToken, user, rememberMe) {
      this.store.dispatch(new SetToken(authToken));
      this.local.saveAuthToken(authToken);
      this.store.dispatch(new SetUser(user));
      this.local.saveUser(user);
      this.store.dispatch(new RememberMe(rememberMe));
      this.local.saveRememberMe(rememberMe);
    }
  }