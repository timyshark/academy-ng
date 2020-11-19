import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { ListUsersComponent } from './_operations/list-users/list-users.component';
import { UsersFooterComponent } from './_tiles/footer/users-footer.component';
import { UsersHeaderComponent } from './_tiles/header/users-header.component';
import { UsersHomeComponent } from './_tiles/home/users-home.component';
import { UsersLayoutComponent } from './_tiles/layout/users-layout.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UserRoutingModule
    ],
    declarations: [
        UsersLayoutComponent,
        UsersHeaderComponent,
        UsersFooterComponent,
        UsersHomeComponent,
        ListUsersComponent,
        ]
})
export class UserModule { }