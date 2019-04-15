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
import { SubjectResolver } from './shared/resolvers/subject.resolver';
import { UserResolver } from './shared/resolvers/user.resolver';
import { AdminUserSubjectsComponent } from './feature/admin/admin-user/admin-user-subjects/admin-user-subjects.component';
import { UserSubjectResolver } from './shared/resolvers/user.subject.resolver';
import { CreateUserSubjectComponent } from './feature/admin/admin-user/admin-user-subjects/create-user-subject/create-user-subject.component';
import { AdminUserMarksComponent } from './feature/admin/admin-user/admin-user-marks/admin-user-marks.component';
import { UserMarksResolver } from './shared/resolvers/user-marks.resolver';
import { CreateUserMarkComponent } from './feature/admin/admin-user/admin-user-marks/create-user-mark/create-user-mark.component';

// JWT guard works
const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full', canActivate: [JwtGuard]},
  {path: 'login', canActivate: [AuthGuard], component: LoginComponent},
  {path: 'register', canActivate: [AuthGuard], component: RegisterComponent},
  {path: 'admin/user', component: AdminUserComponent, canActivate: [RoleGuard], resolve: { users: UserResolver}},
  {path: 'admin/user/subjects/:email', component: AdminUserSubjectsComponent, canActivate: [ JwtGuard, RoleGuard], 
  resolve: { userSubjects: UserSubjectResolver}},
  {path: 'admin/user/subjects/:email/create', component: CreateUserSubjectComponent, canActivate: [ JwtGuard, RoleGuard], 
  resolve: { subjects: SubjectResolver}},
  {path: 'admin/subject', component: AdminSubjectComponent, canActivate: [ JwtGuard, RoleGuard], 
  resolve: { subjects: SubjectResolver}},
  {path: 'admin/subject/create', component: CreateSubjectComponent, canActivate: [ RoleGuard, JwtGuard]},
  {path: 'admin/subject/edit/:name', component: EditSubjectComponent, canActivate: [RoleGuard, JwtGuard]},
  {path: 'admin/user/marks/:email', component: AdminUserMarksComponent, canActivate: [RoleGuard, JwtGuard], 
  resolve: { userMarks: UserMarksResolver, userSubjects: UserSubjectResolver}},
  {path: 'admin/user/mark/:email/create', component: CreateUserMarkComponent, canActivate: [RoleGuard, JwtGuard], 
  resolve: { userSubjects: UserSubjectResolver}},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
