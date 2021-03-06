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
import { SubjectResolver } from '../core/services/resolvers/subject.resolver';
import { UserResolver } from '../core/services/resolvers/user.resolver';
import { AdminUserSubjectsComponent } from './admin/admin-user/admin-user-subjects/admin-user-subjects.component';
import { UserSubjectResolver } from '../core/services/resolvers/user.subject.resolver';
import { CreateUserSubjectComponent } from './admin/admin-user/admin-user-subjects/create-user-subject/create-user-subject.component';
import { AdminUserMarksComponent } from './admin/admin-user/admin-user-marks/admin-user-marks.component';
import { UserMarksResolver } from '../core/services/resolvers/user-marks.resolver';
import { CreateUserMarkComponent } from './admin/admin-user/admin-user-marks/create-user-mark/create-user-mark.component';
import { UserMarksComponent } from './user/user-marks/user-marks.component';
@NgModule({
  declarations: [AdminUserComponent, AdminSubjectComponent, CreateSubjectComponent, EditSubjectComponent, AdminUserSubjectsComponent, CreateUserSubjectComponent, AdminUserMarksComponent, CreateUserMarkComponent, UserMarksComponent,],
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
  providers: [SubjectResolver, UserResolver,UserSubjectResolver, UserMarksResolver]
})
export class FeatureModule { }
