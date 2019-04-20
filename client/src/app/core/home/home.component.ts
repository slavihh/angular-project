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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isUserLoggedIn;
  public role;
  constructor(public store: Store < any >) {
    this.isUserLoggedIn = store.select(getIsAuth);
    this.role = store.select(getUserRole);
  }

  ngOnInit() {}


}