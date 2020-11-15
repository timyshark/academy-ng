import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFilterPipe } from './helpers/student-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { SchoolValidator } from './services/school.validator';
import { CreateStudentComponent } from './operations/create-student/create-student.component';
import { DisplayStudentComponent } from './operations/display-student/display-student.component';
import { ListStudentsComponent } from './operations/list-students/list-students.component';
import { StudentDetailsComponent } from './operations/student-details/student-details.component';
import { UpdateStudentComponent } from './operations/update-student/update-student.component';
import { createStudentCanDeactivateGuardService } from './operations/create-student/create-student-can-deactivate-guard.service';
import { StudentDetailGuardService } from './operations/student-details/student-details-guard.service';
import { StudentListResolverService } from './services/student-list-resolver.service';
import { StudentService } from './services/student.service';
import { AccordionComponent } from './operations/display-student/accordion/accordion.component';
import { StudentsFooterComponent } from './tiles/footer/students-footer.component';
import { StudentsHeaderComponent } from './tiles/header/students-header.component';
import { HomeComponent } from './tiles/home/home.component';
import { StudentsLayoutComponent } from './tiles/students-layout/students-layout.component';




@NgModule({
  declarations: [
    DisplayStudentComponent,
    StudentDetailsComponent,
    StudentFilterPipe,
    ListStudentsComponent,
    CreateStudentComponent,
    UpdateStudentComponent,
    SchoolValidator,
    AccordionComponent,
    StudentsLayoutComponent,
    StudentsHeaderComponent,
    StudentsFooterComponent,
    HomeComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentRoutingModule,
    FormsModule 
  ],
  providers: [
    StudentService,
    createStudentCanDeactivateGuardService,
    StudentListResolverService, StudentDetailGuardService
  ] 
  })
export class StudentModule { }
