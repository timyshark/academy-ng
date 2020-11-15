import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './operations/login/login.component';
import { UpdateUserComponent } from './operations/update-user/update-user.component';
import { UserLayoutComponent } from './tiles/users-layout/user-layout.component';

const usersRoutes: Routes = [
    {
        path: '', component: UserLayoutComponent,
        children: [
            { path: '', component: UserLayoutComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: UpdateUserComponent },
            { path: 'edit/:id', component: UpdateUserComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(usersRoutes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }