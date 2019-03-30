import { Component, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "src/app/store";

@Component({
  selector: "app-navigation",
  templateUrl: "navigation.component.html",
  styleUrls: ["navigation.component.css"]
})
export class NavigationComponent {
  @ViewChild("sidenav") sidenav: MatSidenav;
  isExpanded = true;
  isShowing = false;
  title = "Markbook";
  guestLinks = [
    {
      path: "",
      title: "Home",
      icon: "home"
    },
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
  userLinks = [
    {
      path: '',
      title: 'Home',
      icon: 'home'
    },
    {
      path: 'user/own/subject',
      title: 'Subjects',
      icon: 'school'
    },
    {
      path: 'user/own/marks',
      title: 'Marks',
      icon: 'star_rate'
    }
  ];

  adminLinks = [
    {
      path: '',
      title: 'Home',
      icon: 'home'
    },
    {
      path: 'user',
      title: 'User',
      icon: 'account_box'
    },
    {
      path: 'subject',
      title: 'Subject',
      icon: 'school'
    }
  ]
  auth;
  role;
  loggedIn;
  constructor(public ngRedux: NgRedux<IAppState>) {
    this.auth = this.ngRedux.getState().auth;
    this.role = this.auth.user !== null ? this.auth.user.role : '';
    this.loggedIn = this.auth.loggedIn;
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    window.location.reload();
    localStorage.clear()
  }
}

/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
