import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { School } from '../models/school.model';
import { Student} from '../models/student.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { StudentService } from './student.service';
import { Router, ActivatedRoute } from '@angular/router';

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
      console.log("Form object: " );
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
    console.log("NgForm:" + this.stdForm);
    this.stdForm.reset();
  } else { //find the user from the student Service
    //need to break the reference by instantiating a new object
    this.student = Object.assign({},this._studentService.getStudentById(sId));
    this.panelTitle = 'Edit Student';
  }
  }
  saveStudent() :void {
    console.log(this.student);
    this._studentService.registerStudent(this.student)
    .subscribe(
      (data: Student) => { //Success
        console.log('Saving student: ' + data);
        this.stdForm.reset();
        this._router.navigate(['list']);
      }, 
      (error:any) => console.log("Error Saving:" + error)

    );
    //reset before routing away need to define stdForm as parameter
    //stdForm.reset();
    //or use the decorated form
  }
  togglePhotoPreview() {
    this.previewPhoto = ! this.previewPhoto;
  }
}
