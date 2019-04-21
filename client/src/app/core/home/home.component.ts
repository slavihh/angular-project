import {
  Component,
  OnInit
} from '@angular/core';
import {
  Store
} from '@ngrx/store';
import {
  AuthService
} from 'src/app/core/services/auth.service';
import {
  getIsAuth,
  getUserRole
} from 'src/app/+store';
import { IState } from 'src/app/core/services/models/IState';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isUserLoggedIn;
  public role;
  constructor(public store: Store < IState >) {
    this.isUserLoggedIn = store.select(getIsAuth);
    this.role = store.select(getUserRole);
  }

  ngOnInit() {}


}