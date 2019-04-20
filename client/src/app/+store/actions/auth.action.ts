import { Action } from '@ngrx/store';

export class SetToken implements Action {
    type = '[AUTH] SET_AUTH_TOKEN';
    constructor(public payload: object) {}
}

export class SetUser implements Action {
  type = '[AUTH] SET_USER';
  constructor(public payload: object) {}
}

export class ClearAuth implements Action {
  type = '[AUTH] CLEAR_AUTH';
}

export class RememberMe implements Action {
  type = '[AUTH] REMEMBER_ME';
  constructor(public payload) {}
}