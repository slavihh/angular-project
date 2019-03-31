import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './core/home/home.component';
import {RegisterComponent} from './auth/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { JwtGuard } from './guards/jwt.guard';

// JWT guard works
const routes: Routes = [
  {path: '', component: HomeComponent, },
  {path: 'login', canActivate: [AuthGuard], component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
