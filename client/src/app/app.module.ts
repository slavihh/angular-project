import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, CoreModule, AuthModule, BrowserAnimationsModule],

  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
  }
}
