import { Component, OnInit} from '@angular/core';
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
   previewPhoto:boolean = false;

  student: Student = {
    sId:null,
    fName: null,
    lName: null,
    sEmail:null,
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
  saveStudent(std : Student) :void {
    console.log(this.student);
    this._studentService.registerStudent(this.student);
    this._router.navigate(['list']);

  }
  togglePhotoPreview() {
    this.previewPhoto = ! this.previewPhoto;
  }
}
