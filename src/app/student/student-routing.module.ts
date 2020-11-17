import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../_tiles/home/home.component';
import { createStudentCanDeactivateGuardService } from './_operations/create-student/create-student-can-deactivate-guard.service';
import { CreateStudentComponent } from './_operations/create-student/create-student.component';
import { ListStudentsComponent } from './_operations/list-students/list-students.component';
import { StudentDetailsComponent } from './_operations/student-details/student-details.component';
import { UpdateStudentComponent } from './_operations/update-student/update-student.component';
import { StudentDetailGuardService } from './_services/student-details-guard.service';
import { StudentListResolverService } from './_services/student-list-resolver.service';
import { StudentsLayoutComponent } from './_tiles/students-layout/students-layout.component';

const studentsRoutes:Routes =[
     {
      path: '', component: StudentsLayoutComponent,
      children: [
          { path: '', component: HomeComponent },
          { path: 'add', component: CreateStudentComponent },
          { path: 'edit/:id', component: CreateStudentComponent },
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
