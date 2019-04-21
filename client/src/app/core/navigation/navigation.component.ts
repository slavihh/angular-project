import { LocalStorage } from '../local-storage';
import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import {
  MatSidenav
} from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClearAuth } from 'src/app/+store/actions/auth.action';
import { Router } from '@angular/router';
import { getIsAuth, getUserRole } from 'src/app/+store';
import { IState } from 'src/app/core/services/models/IState';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit{
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  isShowing = false;
  title = 'Markbook';
  auth;
  role;
  loggedIn;

  constructor( private local: LocalStorage, public store: Store<IState>, public authService: AuthService, public router: Router) { 
  }
  ngOnInit() {
    this.loggedIn = this.store.select(getIsAuth);
    this.role = this.store.select(getUserRole);
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.local.clear();
    this.store.dispatch(new ClearAuth());
    this.router.navigate(['']);
  }
}