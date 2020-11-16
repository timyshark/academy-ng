import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../_tiles/home/home.component';
import { ListUsersComponent } from './_operations/list-users/list-users.component';
import { LoginComponent } from './_operations/login/login.component';
import { UpdateUserComponent } from './_operations/update-user/update-user.component';
import { UserLayoutComponent } from './_tiles/users-layout/user-layout.component';


const usersRoutes: Routes = [
    {
        path: '', component: UserLayoutComponent,  //<-- Should point to the layout, must include <router-outlet></router-outlet> to be able to handle children
        children: [
            { path: '', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: UpdateUserComponent },
            { path: 'edit/:id', component: UpdateUserComponent },
            { path: 'list', component: ListUsersComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(usersRoutes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }