import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Student } from '../models/student.model';
import { ActivatedRoute, Router} from '@angular/router';
import { StudentService } from './student.service';

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
   @Input() searchTerm:string;
   confirmDelete : boolean = false;
  @Output() notify : EventEmitter<number> = new EventEmitter<number>();
 
  constructor(private _aroute: ActivatedRoute,
              private _router: Router ,
              private _studentService: StudentService) { }
 ngOnInit() {
    this.activeStudentId = +this._aroute.snapshot.paramMap.get('sId');
  }

  viewStudent(){
    this._router.navigate(["/students/" + this.student.sId],
    {queryParams : {'searchTerm' : this.searchTerm}});
  }
  deleteStudent(){
    this._studentService.deleteStudentById(this.student.sId)
    .subscribe(
      () => {
        location.reload();
      }
      //,
      //(err: any) => console.log(`Error deleting student id ${this.student.sId} ${err}`)
    );
    this.notify.emit(this.student.sId);
  }
  editStudent(){
    this._router.navigate(["/edit/" + this.student.sId]);
  }
}
