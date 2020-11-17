
//Framework
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmPasswordValidator } from './_services/password-confirm.validator';
import { FooterComponent } from './_tiles/footer/footer.component';
import { HeaderComponent } from './_tiles/header/header.component';
import { PageNotFoundComponent } from './_tiles/pnf/page-not-found.component';
import { HomeComponent } from './_tiles/home/home.component';
import { AlertComponent } from './_tiles/alert/alert.component';
import { ErrorInterceptor } from './user/_services/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmPasswordValidator,
    PageNotFoundComponent,
    AlertComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
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
