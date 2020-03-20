import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { Router, ActivatedRoute, Resolve } from '@angular/router';
import { ResolvedStudentList } from './resolved-studentlist.model';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
  studentsList : Student[] ;
  error : string;

  
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
  // constructor(private _studentService : StudentService,
  //             private _router :Router,
  //             private _aroute : ActivatedRoute) { 
  // }

  //using Resolver 
  constructor(
    private _router :Router,
    private _aroute : ActivatedRoute) { 
    this.initStudentsList(this._aroute.snapshot.data['studentList']);  //Same data name used the key in the route section of app.module.ts 
}


  filterStudents(searchTerm : string) : Student[]{
    console.log("Filtering list:");
    return this.studentsList.filter(student =>
      student.fName.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1) ;
  }
  // Version 1: using ResolvedStudentList Encapsulation class
  initStudentsList(stdList : ResolvedStudentList ) {
    if (stdList.error==null){
      this.studentsList = stdList.studentList;
    } else {
      this.error = stdList.error;
    }


/* Version 2: Direct 
    initStudentsList(stdData : ResolvedStudentList | string) {
      if (Array.isArray(stdData)) {
        this.studentsList = stdData;
      } else {
        this.error = stdData.toString();
      }
*/
      // console.log("Subscribe :" + new Date().toTimeString());
    if (this._aroute.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._aroute.snapshot.queryParamMap.get('searchTerm'); //automatically filters the students in the property setter
    } else {
      this.filteredStudents = this.studentsList;
      // console.log("Else Block :" + new Date().toTimeString());
    }
    console.log("List filtered:" + JSON.stringify(this.studentsList));
  }
  ngOnInit() {
    // using Observable
    // will subscribe : meaning will wait until it comes back, at that time will execute (stdList=>...) Asynchronous
    // if the getStudentsList was (delayed) then the list would be empty
    // this._studentService.getStudentsList().subscribe(
    //   (stdList) => {  //write anonymous block
    //     this.initStudentsList(stdList);
    //  }
    // );

    // without observable
    // this.studentsList = this._studentService.getStudentsList();
  
   // Direct initialization
   //  this.currentStudent = this.studentsList[0];
  
    //Inspecting parameters (after ?)
    // console.log(this._aroute.snapshot.queryParamMap.has('searchTerm')); //returns true:found, false:not-found
    // console.log(this._aroute.snapshot.queryParamMap.get('searchTerm')); //return string value of key 'searchTerm'
    // console.log(this._aroute.snapshot.queryParamMap.getAll('searchTerm')); //return array of string values ['John','newValue','testValue'...etc]
    // console.log(this._aroute.snapshot.queryParamMap.keys); //is array of keys as strings ['searchTerm','newParam','testParam'...etc]

    // to use optional parameter (after ;) use paramMap instead of queryParamMap ex
    // console.log(this._aroute.snapshot.paramMap.keys); //is array of keys as strings of parameters after : , ex ['sId',...etc]    
  }
  onNotifyStudentDelete(deleted_sId:number){
    if (this.searchTerm!=null && this.searchTerm!='')
    this.searchTerm = this.searchTerm; //Call setter once again
  }
 /*
 handleNotify(eventData:Student) {
  this.dataFromChild=eventData;
 }
 */

 /*
onClick(stdId: number){
 this._router.navigate(["/students/" + stdId],
 {queryParams : {'searchTerm' : this.searchTerm, 'testParam': 'hcTestValue'}});
}

onMouseMove(){

}
*/
/*
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
*/
}

