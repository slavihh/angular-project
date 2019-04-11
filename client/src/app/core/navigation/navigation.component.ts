import { LocalStorage } from './../../local-storage';
import {
  Component,
  ViewChild,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from "@angular/core";
import {
  MatSidenav
} from "@angular/material";
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { clearAuth } from 'src/app/actions/auth.action';
import { Router } from '@angular/router';

@Component({
  selector: "app-navigation",
  templateUrl: "navigation.component.html",
  styleUrls: ["navigation.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit{
  @ViewChild("sidenav") sidenav: MatSidenav;
  isExpanded = true;
  isShowing = false;
  title = "Markbook";
  guestLinks = [
    {
      path: "login",
      title: "Login",
      icon: "input"
    },
    {
      path: "register",
      title: "Register",
      icon: "person_add"
    }
  ];

  auth;
  role;
  loggedIn;

  constructor( private local: LocalStorage, public store: Store<any>,public authService: AuthService, public router: Router) {
    this.authService.isUserLoggedIn.subscribe(value => {
      this.loggedIn = value;
    })
  }
  ngOnInit(): void {
    this.local.watchStorage().subscribe(() => {
    })
    this.store.select('auth').subscribe((data) => {
       this.auth = data;
    });
    this.role = this.auth.user.role;
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    localStorage.clear();
    window.location.reload();
    this.store.dispatch(clearAuth());
    this.router.navigate(['']);
  }
}

/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */