import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { FeatureModule } from '../feature/feature.module';
import { ToastrModule } from 'ngx-toastr';
import { MarksResolver } from '../shared/resolvers/marks.resolver';

@NgModule({
  declarations: [NavigationComponent, HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    RouterModule,
    FeatureModule,
    ToastrModule.forRoot()
  ],
  exports: [
    NavigationComponent
  ],
  providers: [MarksResolver]
})
export class CoreModule { }
