import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { vuStudent } from '../../_models/student.model';
import { StudentService } from '../../_services/student.service';

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student : vuStudent;
  _id: any;
  constructor(private _aroute: ActivatedRoute,
              private _studentService: StudentService,
              private _router :Router) { }

  ngOnInit(): void {
     this._aroute.paramMap.subscribe(params =>
     {this._id = +params.get('sId'); //simple way to cast to int
      this._studentService.getStudentById(this._id).subscribe(
        (student) => {this.student = student;},
         (err:any) => {
           // Re-route to error message
         }
      );
    });
  }
  goBack(){
    this._router.navigate(["/students/list"]);
  }
  goNext(){
    this._id =this._id % 50 + 1;  
    this._router.navigate(["/students",this._id], 
    { queryParamsHandling:'preserve'});
  }

}
