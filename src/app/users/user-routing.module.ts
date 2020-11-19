import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './_operations/list-users/list-users.component';
import { UsersHomeComponent } from './_tiles/home/users-home.component';
import { UsersLayoutComponent } from './_tiles/layout/users-layout.component';


const usersRoutes: Routes = [
    {
        path: '', component: UsersLayoutComponent,  //<-- Should point to the layout, must include <router-outlet></router-outlet> to be able to handle children
        children: [
            { path: '', component: UsersHomeComponent },
            
            { path: 'list', component: ListUsersComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(usersRoutes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }