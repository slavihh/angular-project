import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [NavigationComponent, HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    RouterModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class CoreModule { }
