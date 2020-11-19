import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from '../users/user.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthHomeComponent } from './_tiles/home/auth-home.component';
import { AuthFooterComponent } from './_tiles/footer/auth-footer.component';
import { AuthHeaderComponent } from './_tiles/header/auth-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from './_tiles/layout/auth-layout.component';
import { LoginComponent } from './_operations/login/login.component';
import { RegisterUserComponent } from './_operations/register-user/register-user.component';



@NgModule({
  declarations: [
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthLayoutComponent,
    AuthHomeComponent,
    LoginComponent,
    RegisterUserComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //UserModule, <-- loading it will override the routing table!!
    AuthRoutingModule,
  ]
})
export class AuthModule { }
