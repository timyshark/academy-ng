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

const appRoutes:Routes =[
  {path:'list', component:ListStudentsComponent},
  {path:'create', component:CreateStudentComponent},
  {path:'update', component:UpdateStudentComponent},
  {path:'', redirectTo:'/list', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ListStudentsComponent,
    CreateStudentComponent,
    UpdateStudentComponent,
    SchoolValidator,
    ConfirmPasswordValidator
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
