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
import { SubjectResolver } from './feature/admin/admin-subject/subject.resolver';
import { UserResolver } from './feature/admin/admin-user/user.resolver';
import { UserSubjectResolver } from './feature/admin/admin-user/admin-user-subjects/user.subject.resolver';
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
  providers: [AuthService, SubjectResolver, UserResolver, UserSubjectResolver],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
