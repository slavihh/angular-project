import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './core/home/home.component';
import {RegisterComponent} from './auth/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { JwtGuard } from './guards/jwt.guard';
import { AdminUserComponent } from './feature/admin/admin-user/admin-user.component';
import { AdminSubjectComponent } from './feature/admin/admin-subject/admin-subject.component';
import { RoleGuard } from './guards/role.guard';

// JWT guard works
const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full', canActivate: [JwtGuard]},
  {path: 'login', canActivate: [AuthGuard], component: LoginComponent},
  {path: 'register', canActivate: [AuthGuard], component: RegisterComponent},
  {path: 'admin/user', component: AdminUserComponent, canActivate: [RoleGuard]},
  {path: 'admin/subject', component: AdminSubjectComponent, canActivate: [RoleGuard]},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
