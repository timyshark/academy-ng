
//Framework
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmPasswordValidator } from './_services/password-confirm.validator';
import { PageNotFoundComponent } from './_tiles/pnf/page-not-found.component';
import { AlertComponent } from './_tiles/alert/alert.component';
import { ErrorInterceptor } from './users/_services/error-interceptor';
import { AppHomeComponent } from './_tiles/home/app-home.component';
import { AppComponent } from './_tiles/layout/app.component';
import { AppHeaderComponent } from './_tiles/header/app-header.component';
import { AppFooterComponent } from './_tiles/footer/app-footer.component';
import { CrossFieldValidatorDirective } from './_services/cross-field-validator/cross-field-validator.directive';



@NgModule({
  declarations: [
    AppComponent,
    ConfirmPasswordValidator,
    PageNotFoundComponent,
    AlertComponent,
    AppHomeComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AlertComponent,
    CrossFieldValidatorDirective,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          // Need to return the access_token from the UserSubject
             return     localStorage.getItem('access_token');},
        allowedDomains: ['localhost'],
        disallowedRoutes: ['']
      }
    })
    ],
   exports: [
     RouterModule
   ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor, 
      multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
