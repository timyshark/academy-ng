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

  
  private _searchTerm : string;
  set searchTerm(v : string){
    this._searchTerm=v;
    this.filteredStudents = this.filterStudents(v);
  }
  get searchTerm(): string {
    return this._searchTerm;
  }
  filteredStudents : Student[];

  //currentStudent : Student;
  //dataFromChild : Student;

  
  //private currentStudentNdx =1;
  constructor(private _studentService : StudentService,private _router :Router) { 
    
  }
  filterStudents(searchTerm : string) : Student[]{
    return this.studentsList.filter(student =>
      student.fName.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1) ;
  }
  ngOnInit() {
    this.studentsList = this._studentService.getStudentsList();
  //  this.currentStudent = this.studentsList[0];
    this.filteredStudents = this.studentsList;
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
 //Force refreshing
 this.filteredStudents = this.filterStudents(this.searchTerm);

 //Impure change
//  const newStudentsList : Student[] = Object.assign([],this.studentsList);
//  newStudentsList[0].fName = 'Jordan';
//  this.studentsList = newStudentsList;
}
}

