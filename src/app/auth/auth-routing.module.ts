import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './_tiles/layout/auth-layout.component';
import { AuthHomeComponent } from './_tiles/home/auth-home.component';
import { LoginComponent } from '../users/_operations/login/login.component';
import { UpdateUserComponent } from '../users/_operations/update-user/update-user.component';

const authRoutes: Routes = [
    {
        path: '', component: AuthLayoutComponent,  //<-- Should point to the layout, must include <router-outlet></router-outlet> to be able to handle children
        children: [
            { path: '', component: AuthHomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: UpdateUserComponent },
            { path: 'edit/:id', component: UpdateUserComponent },
 
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }