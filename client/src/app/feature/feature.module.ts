import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminSubjectComponent } from './admin/admin-subject/admin-subject.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CreateSubjectComponent } from './admin/admin-subject/create-subject/create-subject.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditSubjectComponent } from './admin/admin-subject/edit-subject/edit-subject.component';
import { SubjectResolver } from './admin/admin-subject/subject.resolver';
import { UserResolver } from './admin/admin-user/user.resolver';
import { AdminUserSubjectsComponent } from './admin/admin-user/admin-user-subjects/admin-user-subjects.component';
import { UserSubjectResolver } from './admin/admin-user/admin-user-subjects/user.subject.resolver';
import { CreateUserSubjectComponent } from './admin/admin-user/admin-user-subjects/create-user-subject/create-user-subject.component';
@NgModule({
  declarations: [AdminUserComponent, AdminSubjectComponent, CreateSubjectComponent, EditSubjectComponent, AdminUserSubjectsComponent, CreateUserSubjectComponent,],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    AdminUserComponent,
    AdminSubjectComponent
  ],
  providers: [SubjectResolver, UserResolver,UserSubjectResolver]
})
export class FeatureModule { }
