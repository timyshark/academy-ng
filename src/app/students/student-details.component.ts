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
  constructor(private _aroute: ActivatedRoute,
              private _studentService: StudentService,
              private _router :Router) { }

  ngOnInit(): void {
    //reading parameters from the request
    const sId = +this._aroute.snapshot.params['sId'];
    console.log('Looking for Student ID:' + sId)
    this.student = this._studentService.getStudentById(sId);
    console.log(JSON.stringify(this.student));
  }
  goBack(){
    this._router.navigate(["/students"]);
  }

}
