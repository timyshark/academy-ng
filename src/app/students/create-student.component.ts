import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { School } from '../models/school.model';
import { Student} from '../models/student.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { StudentService } from './student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedStudentList } from './resolved-studentlist.model';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
//bring the form from html 
   @ViewChild('studentForm') public stdForm: NgForm;
   previewPhoto:boolean = false;
   panelTitle: string ="Undefined";
   public hasError:boolean = false;

  student: Student = {
    sId:null,
    fName: null,
    lName: null,
    sEmail:'test@test.com',
    isActive:null,
    dob:null,
    gender: null,
    school: null,
    picturePath: null
  }

  colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig>;
 

  schools : School[] = [
    { schoolCode:"UBC", schoolName:"University of British Columbia"},
    { schoolCode:"SFU", schoolName:"Simon Fraser University"}
  ];
  error: ResolvedStudentList;
  constructor(private _studentService: StudentService,
              private _router: Router,
              private _aroute : ActivatedRoute) { 
    this.bsConfig = Object.assign({}, 
      { containerClass: this.colorTheme, 
        showWeekNumbers: false,
        minDate: new Date(1950,1,1),
        maxDate: new Date(2020,3,21),
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  ngOnInit(): void {
    this._aroute.paramMap.subscribe(
      parameterMap => {
        const sId=  +parameterMap.get('sId');
        this.getStudent(sId);
      }
    )
  }

  private getStudent(sId : number){

  if (sId===0){
    this.student = {
      sId:null,
      fName: null,
      lName: null,
      sEmail:'test@test.com',
      isActive:null,
      dob:null,
      gender: null,
      school: null
    };
    this.panelTitle = 'New Student';
    // console.log("NgForm:" + this.stdForm);
    // this.stdForm.reset();
  } else { //find the user from the student Service
    //need to break the reference by instantiating a new object
     this.panelTitle = 'Edit Student';
     this._studentService.getStudentById(sId).subscribe(
       (student) => this.student = student,
       (err:any) => {
         this.hasError = true;
         this.error = err;
         console.log("Update error:" + err);
       }
     )
  }
  }
  saveStudent() :void {
    if (this.student.sId==null) {
    this._studentService.registerStudent(this.student)
    .subscribe(
      (data: Student) => { //Success
        console.log('Regostromg student: ' + data + " Success! and resetting form :" + this.stdForm);
      }, 
      (error:ResolvedStudentList) => {
        console.log("Error cought: " + error.error);
        this.hasError=true;
        this.error =error;
      });
    } else {
      this._studentService.updateStudent(this.student)
      .subscribe(
        () => { //Success
          console.log('Updating student: ' + this.student + " Success!; and resetting form :" + this.stdForm);
        }, 
        (error:ResolvedStudentList) => {
          console.log("Error cought: " + error.error);
          this.hasError=true;
          this.error =error;
        }
      );
    }

    //reset before routing away need to define stdForm as parameter
    this.stdForm.reset();
    console.log("Form reset:" + this.stdForm);
    //or use the decorated form
    this._router.navigate(['list']);
  }
  togglePhotoPreview() {
    this.previewPhoto = ! this.previewPhoto;
  }
}
