import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutModule} from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    FlexLayoutModule,
    ToastrModule.forRoot()
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
