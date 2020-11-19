import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_operations/login/login.component';
import { RegisterUserComponent } from './_operations/register-user/register-user.component';
import { AuthHomeComponent } from './_tiles/home/auth-home.component';
import { AuthLayoutComponent } from './_tiles/layout/auth-layout.component';

const authRoutes: Routes = [
    {
        path: '', component: AuthLayoutComponent,  //<-- Should point to the layout, must include <router-outlet></router-outlet> to be able to handle children
        children: [
            { path: '', component: AuthHomeComponent },
            { path: 'home', component: AuthHomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterUserComponent },
            { path: 'edit/:id', component: RegisterUserComponent },
 
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }