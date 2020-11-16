import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Student } from '../../_models/student.model';
import { StudentService } from '../../_services/student.service';

@Component({
  selector: 'student-display',
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
    this.activeStudentId = +this._aroute.snapshot.paramMap.get('id');
  }

  viewStudent(){
    this._router.navigate(["/students/" + this.student.id],
    {queryParams : {'searchTerm' : this.searchTerm}});
  }
  deleteStudent(){
    this._studentService.deleteStudentById(this.student.id)
    .subscribe(() => {
        location.reload();
      }
      //,
      //(err: any) => console.log(`Error deleting student id ${this.student.sId} ${err}`)
    );
    
    this.notify.emit(this.student.id);
  }
  editStudent(){
    this._router.navigate(["/edit/" + this.student.id]);
  }
}
