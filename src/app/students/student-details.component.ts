import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from './student.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student : Student;
  _sId: any;
  constructor(private _aroute: ActivatedRoute,
              private _studentService: StudentService,
              private _router :Router) { }

  ngOnInit(): void {
    //reading parameters from the request
   // this._sId = +this._aroute.snapshot.params['sId'];
   // use this method to subscribe to the changes 
     this._aroute.paramMap.subscribe(params =>
     {this._sId = +params.get('sId');
     this.student = this._studentService.getStudentById(this._sId);
   
    });
    console.log('Looking for Student ID:' + this._sId)
    console.log(JSON.stringify(this.student));
  }
  goBack(){
    this._router.navigate(["/list"]);
  }
  goNext(){
    this._sId =this._sId % 3 + 1;  
    this._router.navigate(["/students",this._sId]);
  }

}
