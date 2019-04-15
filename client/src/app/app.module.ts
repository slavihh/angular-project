import { authReducer } from './+store/reducers/auth.reducer';
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
import { SharedModule } from './shared/shared.module';
import { SubjectResolver } from './shared/resolvers/subject.resolver';
import { UserResolver } from './shared/resolvers/user.resolver';
import { UserSubjectResolver } from './shared/resolvers/user.subject.resolver';
import { UserMarksResolver } from './shared/resolvers/user-marks.resolver';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ auth: authReducer}),
    HttpClientModule,
    RouterModule
  ],
  providers: [AuthService, SubjectResolver, UserResolver, UserSubjectResolver, UserMarksResolver],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
