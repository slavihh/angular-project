import { LocalStorage } from '../local-storage';
import { Store } from '@ngrx/store';
import { setToken, setUser } from '../actions/auth.action';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class StoreAuthInfo {
    constructor(public local: LocalStorage, public store: Store<object>) {
    }

    save(authToken, user) {
      this.store.dispatch(setToken(authToken));
      this.local.saveAuthToken(authToken);
      this.store.dispatch(setUser(user));
      this.local.saveUser(user);
    }
  }