import {
  applyMiddleware,
  Store,
  createStore
} from 'redux';
import {
  NgReduxModule,
  NgRedux
} from '@angular-redux/store';
import {
  createLogger
} from 'redux-logger';
import {
  rootReducer
} from './reducers/root.reducer';

export interface IAppState {
   auth: {
     [key: string]: any
   };
}
export const store: Store < IAppState > = createStore(
  rootReducer,
  applyMiddleware(createLogger())
);