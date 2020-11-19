import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './users/_services/auth.guard';
import { AppHomeComponent } from './_tiles/home/app-home.component';
import { AppComponent } from './_tiles/layout/app.component';
import { PageNotFoundComponent } from './_tiles/pnf/page-not-found.component';
const usersModule = () => import('./users/user.module').then(x => x.UserModule);
const studentsModule = () => import('./students/student.module').then(x => x.StudentModule);
const authModule = () => import('./auth/auth.module').then(x => x.AuthModule);

const academyRoutes:Routes =[
  { path: '', component: AppHomeComponent}, 
  { path:'home', component:AppHomeComponent}, 
  { path:'PNF', component:PageNotFoundComponent},
  { path:'students' , loadChildren: studentsModule, canActivate: [AuthGuard]}, //, canActivate: [AuthGuard]},
  { path:'users' , loadChildren: usersModule, canActivate: [AuthGuard]},
  { path:'auth' , loadChildren: authModule},
  { path: '**', component: PageNotFoundComponent },   //Page not found: use wild card '**'

];
@NgModule({
  imports: [RouterModule.forRoot(academyRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
