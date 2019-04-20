import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthToken } from '../+store';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpService, store: Store<any>) { }
  delete(email) {
    return this.http.delete(`/user/delete?email=${email}`);
  }
  deleteUserSubject(userEmail, subjectName) {
    return this.http.delete(`/user/subject?userEmail=${userEmail}&subjectName=${subjectName}`);
  }
  getAllUsers() {
    return this.http.get('/user');
  }
  addUserMark(userEmail, subjectName, mark) {
    const body = {
      userEmail,
      subjectName,
      mark
    }
    return this.http.post('/user/mark', body);
  }
  setUserSubject(email, subjectName) {
    const body = {
      userEmail: email,
      subjectName
    };
    return this.http.post('/user/subject', body);
  }
  getUserSubjects(email) {
    return this.http.get(`/user/subject?email=${email}`);
  }
  getUserMarks(email) {
    return this.http.get(`/user/mark?email=${email}`);
  }
}
