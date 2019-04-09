import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
const EMAIL_REGEX1 = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const EMAIL_REGEX = "[a-z]*";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService) { }
  title = 'app';
  email: string;
  password: string;
 public onSubmit(){
   this.authService.register(this.email, this.password);
 }
}