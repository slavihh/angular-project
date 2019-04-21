import { LocalStorage } from '../local-storage';
import { Store } from '@ngrx/store';
import { SetToken, SetUser, RememberMe } from '../../+store/actions/auth.action';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { IState } from './models/IState';
@Injectable({
    providedIn: 'root'
})
export class StoreAuthInfo {
    constructor(public local: LocalStorage, public store: Store<IState>, public router: Router) {
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