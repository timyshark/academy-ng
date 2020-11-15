
//Framework
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

//CSS Styles
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Students
import { ConfirmPasswordValidator } from './validators/password-confirm.validator';


//Students->Services/Guards/Filters/Resolvers



//Authentication
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorInterceptor } from './user/services/error-interceptor';
import { AlertComponent } from './tiles/alert/alert.component';
import { FooterComponent } from './tiles/footer/footer.component';
import { HeaderComponent } from './tiles/header/header.component';
import { HomeComponent } from './tiles/home/home.component';
import { PageNotFoundComponent } from './tiles/pnf/page-not-found.component';


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
