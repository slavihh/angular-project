import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminSubjectComponent } from './admin/admin-subject/admin-subject.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CreateSubjectComponent } from './admin/admin-subject/create-subject/create-subject.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AdminUserComponent, AdminSubjectComponent, CreateSubjectComponent],
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
  ]
})
export class FeatureModule { }
