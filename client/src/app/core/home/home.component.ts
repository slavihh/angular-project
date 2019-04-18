import {
  Component,
  OnInit
} from '@angular/core';
import {
  Store
} from '@ngrx/store';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  getIsAuth,
  getUserRole
} from 'src/app/+store';
import {
  ActivatedRoute
} from '@angular/router';
import {
  UserService
} from 'src/app/services/user.service';
import {
  SubjectService
} from 'src/app/services/subject.service';
import {
  MarkService
} from 'src/app/services/mark.service';
import {
  getUser
} from 'src/app/+store/selectors/auth.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isUserLoggedIn;
  public role;
  public userEmail;
  public users;
  public userSubjects;
  public userMarks;
  public authToken;
  public user;
  constructor(public store: Store < any > , public userService: UserService, public route: ActivatedRoute,
    public subjectService: SubjectService, public markService: MarkService) {
    this.isUserLoggedIn = store.select(getIsAuth);
    this.role = store.select(getUserRole);
    store.select('auth').subscribe(data => {
      this.userEmail = data.user ? data.user.userEmail : [];
      this.authToken = data.authToken ? data.authToken : null;
      this.user = data.user ? data.user : '';
    })
    if (this.authToken) {
      if (this.user.role === 2) {
        this.users = userService.getAllUsers();
        this.userSubjects = subjectService.getAllSubjects();
        this.userMarks = markService.getAllMarks();
      } else {
        this.userMarks = route.snapshot.data['userMarks'];
        this.userSubjects = route.snapshot.data['userSubjects'];
      }

    }
  }

  ngOnInit() {

  }


}