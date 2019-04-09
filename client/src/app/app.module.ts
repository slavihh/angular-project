import { authReducer } from './reducers/auth.reducer';
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AuthService } from './services/auth.service';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ auth: authReducer}),
    HttpClientModule,
    RouterModule
  ],
  providers: [AuthService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
