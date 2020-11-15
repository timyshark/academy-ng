import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './tiles/users-layout/user-layout.component';
import { UsersHeaderComponent } from './tiles/header/users-header.component';
import { UsersFooterComponent } from './tiles/footer/users-footer.component';
import { LoginComponent } from './operations/login/login.component';
import { UpdateUserComponent } from './operations/update-user/update-user.component';

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
        ]
})
export class UserModule { }