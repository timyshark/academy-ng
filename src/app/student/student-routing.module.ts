import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_tiles/home/home.component';
import { ListStudentsComponent } from './_operations/list-students/list-students.component';
import { StudentDetailsComponent } from './_operations/student-details/student-details.component';
import { StudentDetailGuardService } from './_services/student-details-guard.service';
import { StudentListResolverService } from './_services/student-list-resolver.service';
import { StudentsLayoutComponent } from './_tiles/students-layout/students-layout.component';
import { EditStudentCanDeactivateGuardService } from './_operations/edit-student/edit-student-can-deactivate-guard.service';
import { EditStudentComponent } from './_operations/edit-student/edit-student.component';

const studentsRoutes:Routes =[
     {
      path: '', component: StudentsLayoutComponent,
      children: [
          { path: '', component: HomeComponent },
          { path:'list', component: ListStudentsComponent, 
               resolve: {studentList: StudentListResolverService}}, //key 'studentList' is referenced in the listStudentComponent.ts constructor as the Class Name
          { path: 'add', component: EditStudentComponent },
          { path:'edit/:sId', component: EditStudentComponent,
               canDeactivate:[EditStudentCanDeactivateGuardService]},     
          { path:':sId', component: StudentDetailsComponent,
               canActivate: [StudentDetailGuardService]},
       ]
  }
];


@NgModule({
  //declarations: [],
  imports: [RouterModule.forChild(studentsRoutes) ],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
