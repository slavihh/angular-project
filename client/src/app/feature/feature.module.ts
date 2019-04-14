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
@NgModule({
  declarations: [AdminUserComponent, AdminSubjectComponent, CreateSubjectComponent, EditSubjectComponent],
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
  providers: [SubjectResolver]
})
export class FeatureModule { }
