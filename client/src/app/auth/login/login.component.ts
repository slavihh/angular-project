import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StoreAuthInfo } from 'src/app/services/auth.info.service';
const EMAIL_REGEX1 = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const EMAIL_REGEX = "[a-z]*";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  constructor(public authService: AuthService, public router: Router, public storeAuthInfo: StoreAuthInfo) { }
  title = 'app';
  email: string;
  password: string;
 public onSubmit() {
   this.authService.login(this.email, this.password);
 }
}