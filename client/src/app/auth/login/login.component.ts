import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
const EMAIL_REGEX1 = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const EMAIL_REGEX = "[a-z]*";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  constructor(public authService: AuthService) { }
  title = 'app';
  email: string;
  password: string;
 public onSubmit() {
   this.authService.login(this.email, this.password);
 }
}