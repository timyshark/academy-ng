import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { ListUsersComponent } from './_operations/list-users/list-users.component';
import { LoginComponent } from './_operations/login/login.component';
import { UpdateUserComponent } from './_operations/update-user/update-user.component';
import { UsersFooterComponent } from './_tiles/footer/users-footer.component';
import { UsersHeaderComponent } from './_tiles/header/users-header.component';
import { HomeComponent } from './_tiles/home/home.component';
import { UserLayoutComponent } from './_tiles/users-layout/user-layout.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UserRoutingModule
    ],
    declarations: [
        LoginComponent,
        UserLayoutComponent,
        UpdateUserComponent,
        UsersHeaderComponent,
        UsersFooterComponent,
        HomeComponent,
        ListUsersComponent,
        ]
})
export class UserModule { }