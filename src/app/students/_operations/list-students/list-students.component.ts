import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedStudentList } from '../../_models/resolved-studentlist.model';
import { vuStudent } from '../../_models/student.model';

@Component({
  selector: 'student_list',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
  studentsList : vuStudent[] ;
  error : string;
  private _searchTerm : string;
  set searchTerm(v : string){
    this._searchTerm=v;
    this.filteredStudents = this.filterStudents(v);
  }
  get searchTerm(): string {
    return this._searchTerm;
  }
  filteredStudents : vuStudent[];
  constructor(
    private _router :Router,
    private _aroute : ActivatedRoute) { 
    this.initStudentsList(this._aroute.snapshot.data['studentList']);  //Same data name used the key in the route section of app.module.ts 
  }


  filterStudents(searchTerm : string) : vuStudent[]{
    return this.studentsList.filter(student =>
      student.last_name.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1) ;
  }
  initStudentsList(stdList : ResolvedStudentList ) {
    if (stdList.error==null){
      this.studentsList = stdList.studentList;
    } else {
      this._router.navigate(['/students/home']);
      this.error = stdList.error.status  + ": " + stdList.error.message;
    }
    if (this._aroute.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._aroute.snapshot.queryParamMap.get('searchTerm'); //automatically filters the students in the property setter
    } else {
      this.filteredStudents = this.studentsList;
    }
  }
  ngOnInit() { }

  onNotifyStudentDelete(deleted_sId:number){
    if (this.searchTerm!=null && this.searchTerm!='')
    this.searchTerm = this.searchTerm; //Call setter once again
  }
}

