
//Framework
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

//CSS Styles
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Students
import { ListStudentsComponent } from './students/operation-crud/list-students.component';
import { CreateStudentComponent } from './students/operation-crud/create-student.component';
import { UpdateStudentComponent } from './students/operation-crud/update-student.component';
import { SchoolValidator } from './validators/school.validator';
import { ConfirmPasswordValidator } from './validators/password-confirm.validator';
import { DisplayStudentComponent } from './students/operation-crud/display-student.component';
import { StudentDetailsComponent } from './students/operation-crud/student-details.component';


//Students->Services/Guards/Filters/Resolvers
import { StudentService } from './students/services/student.service';
import { createStudentCanDeactivateGuardService } from './students/operation-crud/create-student-can-deactivate-guard.service';
import { StudentFilterPipe } from './students/helpers/student-filter.pipe';
import { StudentListResolverService } from './students/services/student-list-resolver.service';
import { StudentDetailGuardService } from './students/operation-crud/student-details-guard.service';

//Application commons
import { PageNotFoundComponent } from './home/page-not-found.component';
import { AccordionComponent } from './shared/accordion.component';
import { HomeComponent } from './home/home.component';

//Interceptors
import { ErrorInterceptor } from './students/interceptors/error-interceptor';
import { JwtInterceptor } from './students/interceptors/jwt.interceptor';


//Authentication
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './students/alert/alert.component';
import { RegisterComponent } from './login/register.component';
import { AuthGuard } from './login/auth.guard';
import { AsyncTestComponent } from './test/async-test/async-test.component';
import { ZippyComponent } from './test/async-test/Zippy.component';

const appRoutes:Routes =[
  {path:'list', 
     component:ListStudentsComponent, 
     resolve: {studentList: StudentListResolverService}}, //key 'studentList' is referenced in the listStudentComponent.ts constructor
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
    AccordionComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AsyncTestComponent,
    ZippyComponent
    
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    // RouterModule.forRoot(appRoutes, {enableTracing:true})
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('access_token');},
        whitelistedDomains: ['php.hahlabs.com/academy'],
        blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    })
   ],
   exports: [
     RouterModule
   ],
  providers: [StudentService,
    createStudentCanDeactivateGuardService,
    StudentListResolverService, StudentDetailGuardService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor, 
      multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
