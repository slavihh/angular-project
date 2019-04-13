import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as auth from './selectors/auth.selector';

// Auth Selectors
export const getAuthStore = createFeatureSelector('auth');
export const getAuthUser = createSelector(getAuthStore, auth.getUser)
export const getAuthToken = createSelector(getAuthStore, auth.getAuthToken);
export const getIsAuth = createSelector(getAuthToken, (token) => !!token);
export const getUserRole = createSelector(getAuthStore, auth.getRole);