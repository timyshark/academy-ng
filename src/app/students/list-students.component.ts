import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from './student.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(private _studentService : StudentService,
              private _router :Router,
              private _aroute : ActivatedRoute) { 
    
  }
  filterStudents(searchTerm : string) : Student[]{
    return this.studentsList.filter(student =>
      student.fName.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1) ;
  }
  ngOnInit() {
    this.studentsList = this._studentService.getStudentsList();
  //  this.currentStudent = this.studentsList[0];
  
    //Inspecting parameters (after ?)
    console.log(this._aroute.snapshot.queryParamMap.has('searchTerm')); //returns true:found, false:not-found
    console.log(this._aroute.snapshot.queryParamMap.get('searchTerm')); //return string value of key 'searchTerm'
    console.log(this._aroute.snapshot.queryParamMap.getAll('searchTerm')); //return array of string values ['John','newValue','testValue'...etc]
    console.log(this._aroute.snapshot.queryParamMap.keys); //is array of keys as strings ['searchTerm','newParam','testParam'...etc]

    // to use optional parameter (after ;) use paramMap instead of queryParamMap ex
    console.log(this._aroute.snapshot.paramMap.keys); //is array of keys as strings of parameters after : , ex ['sId',...etc]

    if (this._aroute.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._aroute.snapshot.queryParamMap.get('searchTerm'); //automatically filters the students in the property setter
    } else {
      this.filteredStudents = this.studentsList;

    }

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
 this._router.navigate(["/students/" + stdId],
 {queryParams : {'searchTerm' : this.searchTerm, 'testParam': 'hcTestValue'}});
}
onMouseMove(){

}
changeStudentName(){
  //pure change
 this.studentsList[0].fName = 'Jordan';
 //Force refreshing by component
 this.filteredStudents = this.filterStudents(this.searchTerm);

 //Impure change
//  const newStudentsList : Student[] = Object.assign([],this.studentsList);
//  newStudentsList[0].fName = 'Jordan';
//  this.studentsList = newStudentsList;
}
}

