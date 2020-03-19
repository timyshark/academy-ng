import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListStudentsComponent } from './students/list-students.component';
import { CreateStudentComponent } from './students/create-student.component';
import { RouterModule, Routes } from '@angular/router';
import { UpdateStudentComponent } from './students/update-student.component';
import { SchoolValidator } from './validators/school.validator';
import { ConfirmPasswordValidator } from './validators/password-confirm.validator';
import { StudentService } from './students/student.service';
import { DisplayStudentComponent } from './students/display-student.component';
import { createStudentCanDeactivateGuardService } from './students/create-student-can-deactivate-guard.service';
import { StudentDetailsComponent } from './students/student-details.component';
import { StudentFilterPipe } from './students/student-filter.pipe';
import { StudentListResolverService } from './students/student-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { StudentDetailGuardService } from './students/student-details-guard.service';
import { AccordionComponent } from './shared/accordion.component';

const appRoutes:Routes =[
  {path:'list', component:ListStudentsComponent, resolve: {studentList: StudentListResolverService}}, //key 'studentList' is referenced in the listStudentComponent.ts constructor
  {path:'students/:sId', 
     component:StudentDetailsComponent,
     canActivate: [StudentDetailGuardService]
    },
  {path:'edit/:sId', 
     component:CreateStudentComponent,
     canDeactivate:[createStudentCanDeactivateGuardService]
    },
  {path:'update', component:UpdateStudentComponent},
  {path:'pageNotFound', component:PageNotFoundComponent},
  {path:'', redirectTo:'/list', pathMatch: 'full'}

];
@NgModule({
  declarations: [
    AppComponent,
    ListStudentsComponent,
    CreateStudentComponent,
    UpdateStudentComponent,
    SchoolValidator,
    ConfirmPasswordValidator,
    DisplayStudentComponent,
    StudentDetailsComponent,
    StudentFilterPipe,
    PageNotFoundComponent,
    AccordionComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    // RouterModule.forRoot(appRoutes, {enableTracing:true})
    RouterModule.forRoot(appRoutes)
   ],
  providers: [StudentService,
    createStudentCanDeactivateGuardService,
    StudentListResolverService, StudentDetailGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
