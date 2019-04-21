import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './core/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/services/guards/auth.guard'; 
import { JwtGuard } from './core/services/guards/jwt.guard';
import { AdminUserComponent } from './feature/admin/admin-user/admin-user.component';
import { AdminSubjectComponent } from './feature/admin/admin-subject/admin-subject.component';
import { RoleGuard } from './core/services/guards/role.guard';
import { CreateSubjectComponent } from './feature/admin/admin-subject/create-subject/create-subject.component';
import { EditSubjectComponent } from './feature/admin/admin-subject/edit-subject/edit-subject.component';
import { SubjectResolver } from './core/services/resolvers/subject.resolver';
import { UserResolver } from './core/services/resolvers/user.resolver';
import { AdminUserSubjectsComponent } from './feature/admin/admin-user/admin-user-subjects/admin-user-subjects.component';
import { UserSubjectResolver } from './core/services/resolvers/user.subject.resolver';
import { CreateUserSubjectComponent } from './feature/admin/admin-user/admin-user-subjects/create-user-subject/create-user-subject.component';
import { AdminUserMarksComponent } from './feature/admin/admin-user/admin-user-marks/admin-user-marks.component';
import { UserMarksResolver } from './core/services/resolvers/user-marks.resolver';
import { CreateUserMarkComponent } from './feature/admin/admin-user/admin-user-marks/create-user-mark/create-user-mark.component';
import { UserMarksComponent } from './feature/user/user-marks/user-marks.component';
import { IsLoggedOutGuard } from './core/services/guards/is-logged-out.guard';
import { UserGuard } from './core/services/guards/user.guard';
  
// JWT guard works
const routes: Routes = [ 
  {path: '', component: HomeComponent, pathMatch: 'full', canActivate: [JwtGuard]},
  
  {path: 'login', canActivate: [IsLoggedOutGuard], component: LoginComponent},
   
  {path: 'register', canActivate: [IsLoggedOutGuard], component: RegisterComponent},

    
    {path: 'admin/user', component: AdminUserComponent, canActivate: [AuthGuard, RoleGuard, JwtGuard], resolve: { users: UserResolver}},

  {
    path: 'admin/user/subjects/:email', component: AdminUserSubjectsComponent, canActivate: [ AuthGuard, JwtGuard, RoleGuard],
    resolve: { userSubjects: UserSubjectResolver}},

  {
    path: 'admin/user/subjects/:email/create', component: CreateUserSubjectComponent, canActivate: [AuthGuard, JwtGuard, RoleGuard],
    resolve: { subjects: SubjectResolver }
  },

  { path: 'admin/subject', component: AdminSubjectComponent, canActivate: [ AuthGuard, JwtGuard, RoleGuard], 
  resolve: { subjects: SubjectResolver}},
  
  {path: 'admin/subject/create', component: CreateSubjectComponent, canActivate: [ AuthGuard, RoleGuard, JwtGuard]},

    
    {path: 'admin/subject/edit/:name', component: EditSubjectComponent, canActivate: [AuthGuard, RoleGuard, JwtGuard]},

  {
    path: 'admin/user/marks/:email', component: AdminUserMarksComponent, canActivate: [AuthGuard, RoleGuard, JwtGuard],
    resolve: { userMarks: UserMarksResolver, userSubjects: UserSubjectResolver}},

  {
    path: 'admin/user/mark/:email/create', component: CreateUserMarkComponent, canActivate: [AuthGuard, RoleGuard, JwtGuard],
    resolve: {  userSubjects: UserSubjectResolver}}, 
  

  { path: 'user/marks', component: UserMarksComponent, canActivate: [UserGuard, AuthGuard, JwtGuard],
  resolve: {userMarks: UserMarksResolver, userSubjects: UserSubjectResolver}},

  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
