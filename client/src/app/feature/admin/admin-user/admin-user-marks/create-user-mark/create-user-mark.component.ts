import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user-mark',
  templateUrl: './create-user-mark.component.html',
  styleUrls: ['./create-user-mark.component.css']
})
export class CreateUserMarkComponent{
  public userSubjects;
  public userEmail;
  public subject;
  public mark;
  constructor(private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService, private router: Router) { 
    this.userSubjects = route.snapshot.data['userSubjects'];
    route.params.subscribe(params => {
      this.userEmail = params['email'];
    });
   }
  onSubmit() {
    this.userService.addUserMark(this.userEmail, this.subject, this.mark).subscribe((res: any) => {
      this.router.navigate([`admin/user/marks/${this.userEmail}`]);
      this.toastr.success(res.msg);
    }, err => {
      this.toastr.error(err.error.msg);
    });
  }

}
