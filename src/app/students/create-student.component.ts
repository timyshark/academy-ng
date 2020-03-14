import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { School } from '../models/school.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  frmFullName :string;
  frmEmail:string;
  frmGender:string;
  frmIsActive:boolean;
  frmSchool:string;
  frmDOB:string;
  frmPicturePath:string;
  previewPhoto:boolean = false;

  colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig>;
 

  schools : School[] = [
    { schoolCode:"UBC", schoolName:"University of British Columbia"},
    { schoolCode:"SFU", schoolName:"Simon Fraser University"}
  ];
  constructor() { 
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
  saveStudent(stdForm: NgForm) :void {
    console.log(stdForm);

  }
  togglePhotoPreview() {
    this.previewPhoto = ! this.previewPhoto;
  }
}
