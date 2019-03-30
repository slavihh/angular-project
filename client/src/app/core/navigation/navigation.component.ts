import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css'],
})
export class NavigationComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  isShowing = false;
  title = 'Markbook'
  links = [
    {
      path: '',
      title: 'Home',
      icon: 'home'
    },
    {
      path: 'login',
      title: 'Login',
      icon: 'input'
    },
    {
      path: 'register',
      title: 'Register',
      icon: 'person_add'
    }
  ]
    toggle() {
      this.isExpanded = !this.isExpanded
    }

}


/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */