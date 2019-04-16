import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { getIsAuth, getUserRole } from 'src/app/+store';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SubjectService } from 'src/app/services/subject.service';
import { MarkService } from 'src/app/services/mark.service';
import { getUser } from 'src/app/+store/selectors/auth.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isUserLoggedIn;
  role;
  userEmail;
  allUsers;
  allSubjects;
  allMarks;
  allUserSubjects;
  allUserMarks;
  constructor(public store: Store<any>, private route: ActivatedRoute, userService: UserService, subjectService: SubjectService, markService: MarkService) { 
    this.isUserLoggedIn = store.select(getIsAuth);
    this.role = store.select(getUserRole);
    store.select('auth').subscribe(data => {
      this.userEmail = data.user.userEmail;
    })
    this.allUsers = userService.getAllUsers();
    this.allSubjects = subjectService.getAllSubjects();
    this.allMarks = markService.getAllMarks();
    this.allUserSubjects = userService.getUserSubjects(this.userEmail);
   }

  ngOnInit() {
  }


}
