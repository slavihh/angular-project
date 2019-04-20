import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class LocalStorage {

    saveAuthToken(authToken) {
        localStorage.setItem('authToken', JSON.stringify(authToken));
    }
    saveUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    saveRememberMe(rememberMe: boolean) {
        localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
    }
    clear() {
        localStorage.clear();
    }
}