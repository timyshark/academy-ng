import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_tiles/home/home.component';
import { PageNotFoundComponent } from './_tiles/pnf/page-not-found.component';
const usersModule = () => import('./user/user.module').then(x => x.UserModule);
const studentsModule = () => import('./student/student.module').then(x => x.StudentModule);

const academyRoutes:Routes =[
  { path:'home', component:HomeComponent}, 
  { path:'PNF', component:PageNotFoundComponent},
  { path: '', component: HomeComponent}, //, canActivate: [AuthGuard] },
  { path:'students' , loadChildren: studentsModule}, //, canActivate: [AuthGuard]},
  { path:'users' , loadChildren: usersModule},
  { path: '**', component: PageNotFoundComponent },   //Page not found: use wild card '**'

];
@NgModule({
  imports: [RouterModule.forRoot(academyRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
