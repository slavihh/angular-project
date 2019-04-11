import { LocalStorage } from '../local-storage';
import { Store } from '@ngrx/store';
import { setToken, setUser } from '../actions/auth.action';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})
export class StoreAuthInfo {
    constructor(public local: LocalStorage, public store: Store<object>, public router: Router) {
    }

    save(authToken, user) {
      this.store.dispatch(setToken(authToken));
      this.local.saveAuthToken(authToken);
      this.store.dispatch(setUser(user));
      this.local.saveUser(user);

    }
  }