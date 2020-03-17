import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Student } from '../models/student.model';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-display-student',
  templateUrl: './display-student.component.html',
  styleUrls: ['./display-student.component.css']
})
export class DisplayStudentComponent implements OnInit {
  //private _student: Student;
  //private _stdId: number;
  @Input() student:Student;
   activeStudentId: number;
  //@Output() notify : EventEmitter<Student> = new EventEmitter<Student>();
  /*
  @Input() 
  set sId(stdId:number) {
    console.log('Student id changed from :' + this._stdId + ' to :' + stdId);
    this._stdId = stdId;
  }
  get sId() {
    return this._stdId;
  }
  /*
  /*
  @Input()
  set student(std: Student) {
    this._student = std;
  }
  get student(): Student {
    return this._student;
  }
  */
  constructor(private _aroute: ActivatedRoute ) { }


/*
  ngOnChanges(changes: SimpleChanges): void {
    const prevStudent = <Student>changes.student.previousValue;
    const currentStudent = <Student>changes.student.currentValue;

    for (const propName of Object.keys(changes)){
      const change = changes[propName];
      const from = JSON.stringify(change.previousValue);
      const to = JSON.stringify(change.currentValue);
      console.log(propName + ' changing from ' + from + ' to ' + to);
    }

    
  }
*/
  ngOnInit() {
    this.activeStudentId = +this._aroute.snapshot.paramMap.get('sId');
  }
  /*
  handleClick(){
    console.log("Before emitting:" + JSON.stringify(this.student));
    this.notify.emit(this.student);
  }
  */
 /*
 getStudentNameAndGender(): string {
   return this.student.fName + ' ' + this.student.gender;
 }
 */
}
