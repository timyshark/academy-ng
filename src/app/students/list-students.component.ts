import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from './student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
  studentsList : Student[] ;
  searchTerm : string;
  //currentStudent : Student;
  //dataFromChild : Student;

  
  //private currentStudentNdx =1;
  constructor(private _studentService : StudentService,private _router :Router) { 
    
  }

  ngOnInit() {
    this.studentsList = this._studentService.getStudentsList();
  //  this.currentStudent = this.studentsList[0];
  }

  /*
  nextStudent() : void{
    this.currentStudent = this.studentsList[this.currentStudentNdx];
    this.currentStudentNdx = (this.currentStudentNdx + 1) % 3;
  }
  */
 /*
 handleNotify(eventData:Student) {
  this.dataFromChild=eventData;
 }
 */
onClick(stdId: number){
 this._router.navigate(["/students/" + stdId]);
}
onMouseMove(){
  
}
changeStudentName(){
  //pure change
 this.studentsList[0].fName = 'Jordan';

 //Impure change
//  const newStudentsList : Student[] = Object.assign([],this.studentsList);
//  newStudentsList[0].fName = 'Jordan';
//  this.studentsList = newStudentsList;
}
}

