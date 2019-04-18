import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthToken } from '../+store';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_BASE_URL = 'http://localhost:4000';
  private authToken;
  private httpOptions;
  constructor(private http: HttpClient, store: Store<any>) {
    store.select(getAuthToken).subscribe(authToken => {
      this.authToken = authToken;
    })
    
  }
  delete(email){
   return this.http.delete<{msg: string}>(`${this.API_BASE_URL}/user/delete?email=${email}`, this.httpOptions); 
  }
  deleteUserSubject(userEmail, subjectName) {
    return this.deleteReq(`/user/delete/subject?userEmail=${userEmail}&subjectName=${subjectName}`);
  }
  deleteReq(url) {
    return this.http.delete<{msg: string}>(`${this.API_BASE_URL}${url}`, this.httpOptions);
  }
  getAllUsers() {
    return this.getReq('/user/all');
  }
  addUserMark(userEmail,subjectName, mark) {
    const body = {
      userEmail, 
      subjectName,
      mark
    }
    return this.postReq('/user/add/subject/mark', body);
  }
  setUserSubject(email, subjectName) {
      const body = {
        userEmail: email,
        subjectName
      };
      return this.postReq('/user/add/subject', body);
  }
  getReq(url) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `JWT ${this.authToken.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>(`${this.API_BASE_URL}${url}`, this.httpOptions);
  }
  postReq(url, body){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `JWT ${this.authToken.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<{msg: string}>(`${this.API_BASE_URL}${url}`, JSON.stringify(body), this.httpOptions);
  }
  getUserSubjects(email) {
    return this.getReq(`/user/all/subjects?email=${email}`);
  }
  getUserMarks(email) {
    return this.getReq(`/user/all/marks?email=${email}`);
  }
}
