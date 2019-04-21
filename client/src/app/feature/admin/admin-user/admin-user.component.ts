import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { IState } from 'src/app/core/services/models/IState';
import { IAuth } from 'src/app/core/services/models/IAuth';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent {
  users;
  user;
  displayedColumns: string[] = ['name', 'options'];
  constructor(private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService, store: Store<IState>) { 
    this.users = this.route.snapshot.data['users'];
    store.select('auth').subscribe((data: IAuth) => {
       this.user = data.user;
    });
  }

  delete(email) {
    if (email !== this.user.userEmail) {
      this.users = this.users.filter(u => u.email !== email);
      this.userService.delete(email).subscribe((res: any) => {
        this.toastr.success(res.msg);
      }, err => {
        this.toastr.error(err.error.msg);
      });
    } else {
      this.toastr.error('You can\'t delete yourself');
    } 
  }
}
