import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentListResolverService } from './services/student-list-resolver.service';
import { createStudentCanDeactivateGuardService } from './operations/create-student/create-student-can-deactivate-guard.service';
import { CreateStudentComponent } from './operations/create-student/create-student.component';
import { ListStudentsComponent } from './operations/list-students/list-students.component';
import { StudentDetailGuardService } from './operations/student-details/student-details-guard.service';
import { StudentDetailsComponent } from './operations/student-details/student-details.component';
import { StudentsLayoutComponent } from './tiles/students-layout/students-layout.component';
import { UpdateStudentComponent } from './operations/update-student/update-student.component';
import { PageNotFoundComponent } from '../tiles/pnf/page-not-found.component';
import { HomeComponent } from './tiles/home/home.component';

const studentsRoutes:Routes =[
     {
      path: '', component: StudentsLayoutComponent,
      children: [
          { path: '', component: HomeComponent },
          { path: 'add', component: CreateStudentComponent },
          { path: 'edit/:id', component: UpdateStudentComponent },
          { path:'list', component: ListStudentsComponent, 
               resolve: {studentList: StudentListResolverService}}, //key 'studentList' is referenced in the listStudentComponent.ts constructor as the Class Name
          { path:':sId', component: StudentDetailsComponent,
               canActivate: [StudentDetailGuardService]},
          { path:'edit/:sId', component: CreateStudentComponent,
               canDeactivate:[createStudentCanDeactivateGuardService]},     
       ]
  }
];


@NgModule({
  //declarations: [],
  imports: [RouterModule.forChild(studentsRoutes) ],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
