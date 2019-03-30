import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthAction } from 'src/app/actions/auth.action';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/store';
const EMAIL_REGEX1 = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const EMAIL_REGEX = "[a-z]*";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  constructor(private authAction: AuthAction, private ngRedux: NgRedux<IAppState>) { }
  title = 'app';
  email: string;
  password: string;
 public onSubmit(){
   this.authAction.login(this.email, this.password);
 }
}