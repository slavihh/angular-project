import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-user-subjects',
  templateUrl: './admin-user-subjects.component.html',
  styleUrls: ['./admin-user-subjects.component.css']
})
export class AdminUserSubjectsComponent implements OnInit {
  userSubjects;
  userEmail;
  displayedColumns: string[] = ['subject', 'options'];
  constructor(private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService) { 
    this.userSubjects = route.snapshot.data['userSubjects'];
    route.params.subscribe(params => {
      this.userEmail = params['email'];
    })
  }

  ngOnInit() {
  }
  delete(subjectName) {
    this.userSubjects = this.userSubjects.filter(uS => uS.name !== subjectName);
    this.userService.deleteUserSubject(this.userEmail, subjectName).subscribe((res: any)=> {
      this.toastr.success(res.msg);
    }, err => {
      this.toastr.error(err.error.msg);
    });
  }
}
