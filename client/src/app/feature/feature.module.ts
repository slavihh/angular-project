import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminSubjectComponent } from './admin/admin-subject/admin-subject.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminUserComponent, AdminSubjectComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    AdminUserComponent,
    AdminSubjectComponent
  ]
})
export class FeatureModule { }
