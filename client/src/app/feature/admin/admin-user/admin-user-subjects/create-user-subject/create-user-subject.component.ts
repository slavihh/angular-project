import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user-subject',
  templateUrl: './create-user-subject.component.html',
  styleUrls: ['./create-user-subject.component.css']
})
export class CreateUserSubjectComponent implements OnInit {
  name: string;
  subjects;
  email;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private toastr: ToastrService) { 
    this.subjects = route.snapshot.data['subjects'];
    route.params.subscribe(params => {
      this.email = params['email']
    })
   }

  ngOnInit() {
  }
  onSubmit() {
    this.userService.setUserSubject(this.email, this.name).subscribe((res: any) => {
      this.toastr.success(res.msg);
      this.router.navigate([`admin/user/subjects/${this.email}`]);
    }, err => {
      this.toastr.error(err.error.msg);
    });
  }
}
