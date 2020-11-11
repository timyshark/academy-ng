import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../../models/student.model';

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
     this._aroute.paramMap.subscribe(params =>
     {this._sId = +params.get('sId'); //simple way to cast to int
      this._studentService.getStudentById(this._sId).subscribe(
        (student) => {this.student = student;},
         (err:any) => {
           // Re-route to error message
           console.log(err);
         }
      );
    });
  }
  goBack(){
    this._router.navigate(["/list"]);
  }
  goNext(){
    this._sId =this._sId % 3 + 1;  
    this._router.navigate(["/students",this._sId], 
    { queryParamsHandling:'preserve'});
  }

}
