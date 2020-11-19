import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListStudentsComponent } from './_operations/list-students/list-students.component';
import { StudentDetailsComponent } from './_operations/student-details/student-details.component';
import { StudentDetailGuardService } from './_services/student-details-guard.service';
import { StudentListResolverService } from './_services/student-list-resolver.service';
import { StudentsLayoutComponent } from './_tiles/layout/students-layout.component';
import { EditStudentCanDeactivateGuardService } from './_operations/edit-student/edit-student-can-deactivate-guard.service';
import { EditStudentComponent } from './_operations/edit-student/edit-student.component';
import { StudentsHomeComponent } from './_tiles/home/students-home.component';

const studentsRoutes:Routes =[
     {
      path: '', component: StudentsLayoutComponent,
      children: [
          { path: '', component: StudentsHomeComponent },
          { path:'list', component: ListStudentsComponent, resolve: {studentList: StudentListResolverService}}, //key 'studentList' is referenced in the listStudentComponent.ts constructor as the Class Name
          { path: 'add', component: EditStudentComponent ,canDeactivate:[EditStudentCanDeactivateGuardService]},
          { path:'edit/:id', component: EditStudentComponent, canDeactivate:[EditStudentCanDeactivateGuardService]},     
          { path:':id', component: StudentDetailsComponent, canActivate: [StudentDetailGuardService]},
       ]
  }
];


@NgModule({
  //declarations: [],
  imports: [RouterModule.forChild(studentsRoutes) ],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
