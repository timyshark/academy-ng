import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactCreateComponent } from './contact/contact-create/contact-create.component';
import { ContactHomeComponent } from './contact/home/home.component';
import { ListStudentsComponent } from './students/operation-crud/list-students.component';
import { StudentListResolverService } from './students/services/student-list-resolver.service';
import { PageNotFoundComponent } from './home/page-not-found.component';
import { AuthGuard } from './login/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { createStudentCanDeactivateGuardService } from './students/operation-crud/create-student-can-deactivate-guard.service';
import { CreateStudentComponent } from './students/operation-crud/create-student.component';
import { StudentDetailGuardService } from './students/operation-crud/student-details-guard.service';
import { StudentDetailsComponent } from './students/operation-crud/student-details.component';
import { UpdateStudentComponent } from './students/operation-crud/update-student.component';
import { AsyncTestComponent } from './test/async-test/async-test.component';
import { HomeComponent } from './home/home.component';

const contactRoutes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "home"},
  {path: "home", component: ContactHomeComponent},
  {path: "contact-create", component: ContactCreateComponent},
  {path: "contact-list", component: ContactListComponent}  
];
const academyRoutes:Routes =[
  {path:'list', 
     component:ListStudentsComponent, 
     resolve: {studentList: StudentListResolverService}}, //key 'studentList' is referenced in the listStudentComponent.ts constructor as the Class Name
  {path:'students/:sId', 
     component:StudentDetailsComponent,
     canActivate: [StudentDetailGuardService]
    },
  {path:'edit/:sId', 
     component:CreateStudentComponent,
     canDeactivate:[createStudentCanDeactivateGuardService]
    },
  {path: 'test', component:AsyncTestComponent},
  {path:'update', component:UpdateStudentComponent},
  {path:'pageNotFound', component:PageNotFoundComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent },   //Page not found: use wild card '**'

];
@NgModule({
  imports: [RouterModule.forRoot(academyRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
