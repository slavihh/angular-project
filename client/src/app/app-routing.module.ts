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
import { CreateSubjectComponent } from './feature/admin/admin-subject/create-subject/create-subject.component';
import { EditSubjectComponent } from './feature/admin/admin-subject/edit-subject/edit-subject.component';
import { SubjectResolver } from './feature/admin/admin-subject/subject.resolver';
import { UserResolver } from './feature/admin/admin-user/user.resolver';
import { AdminUserSubjectsComponent } from './feature/admin/admin-user/admin-user-subjects/admin-user-subjects.component';
import { UserSubjectResolver } from './feature/admin/admin-user/admin-user-subjects/user.subject.resolver';
import { CreateUserSubjectComponent } from './feature/admin/admin-user/admin-user-subjects/create-user-subject/create-user-subject.component';

// JWT guard works
const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full', canActivate: [JwtGuard]},
  {path: 'login', canActivate: [AuthGuard], component: LoginComponent},
  {path: 'register', canActivate: [AuthGuard], component: RegisterComponent},
  {path: 'admin/user', component: AdminUserComponent, canActivate: [RoleGuard], resolve: { users: UserResolver}},
  {path: 'admin/user/subjects/:email', component: AdminUserSubjectsComponent, canActivate: [RoleGuard], 
  resolve: { userSubjects: UserSubjectResolver}},
  {path: 'admin/user/subjects/:email/create', component: CreateUserSubjectComponent, canActivate: [RoleGuard], resolve: { subjects: SubjectResolver}},
  {path: 'admin/subject', component: AdminSubjectComponent, canActivate: [RoleGuard], resolve: { subjects: SubjectResolver}},
  {path: 'admin/subject/create', component: CreateSubjectComponent, canActivate: [RoleGuard]},
  {path: 'admin/subject/edit/:name', component: EditSubjectComponent, canActivate: [RoleGuard]},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
