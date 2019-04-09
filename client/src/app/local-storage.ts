import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class LocalStorage {
    private storageSub = new Subject();
    watchStorage(): Observable<any> {
        return this.storageSub.asObservable();
      }
    saveAuthToken(authToken) {
        localStorage.setItem('authToken', JSON.stringify(authToken))
        this.storageSub.next();
    }
    saveUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.storageSub.next();
    }
    clear() {
        localStorage.clear();
        this.storageSub.next();
    }
}