import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { School } from '../models/school.model';
import { Student} from '../models/student.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { StudentService } from './student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
//bring the form from html 
   @ViewChild('studentForm') public createStudentForm: NgForm;
   previewPhoto:boolean = false;

  student: Student = {
    sId:null,
    fName: null,
    lName: null,
    sEmail:'test@test.com',
    isActive:null,
    dob:null,
    gender: null,
    school: null
  }

  colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig>;
 

  schools : School[] = [
    { schoolCode:"UBC", schoolName:"University of British Columbia"},
    { schoolCode:"SFU", schoolName:"Simon Fraser University"}
  ];
  constructor(private _studentService: StudentService,
              private _router: Router) { 
    this.bsConfig = Object.assign({}, 
      { containerClass: this.colorTheme, 
        showWeekNumbers: false,
        minDate: new Date(1950,1,1),
        maxDate: new Date(2020,3,21),
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  ngOnInit(): void {
  }
  saveStudent() :void {
    console.log(this.student);
    const newStudent: Student = Object.assign({},this.student);
    this._studentService.registerStudent(newStudent);
    //reset before routing away need to define stdForm as parameter
    //stdForm.reset();
    //or use the decorated form

    this.createStudentForm.reset();
    
    this._router.navigate(['list']);

  }
  togglePhotoPreview() {
    this.previewPhoto = ! this.previewPhoto;
  }
}
