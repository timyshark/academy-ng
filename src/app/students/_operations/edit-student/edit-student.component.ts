import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { School } from '../../_models/school.model';
import { vuStudent } from '../../_models/student.model';
import { ResolvedStudentList } from '../../_models/resolved-studentlist.model';
import { StudentService } from '../../_services/student.service';

@Component({
  selector: 'student-edit',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
//bring the form from html 
   @ViewChild('studentForm') public stdForm: NgForm;
   previewPhoto:boolean = false;
   panelTitle: string ="Undefined";
   public hasError:boolean = false;
   private pictureImage = null;


   // Create a new student record, and initialize it
  student: vuStudent = {
    id:null,
    first_name: null,
    last_name: null,
    email:'test@test.com',
    isActive:null,
    dob:null,
    gender: null,
    school_code: null,
    school_name: null,
    picturePath: null
  }

  colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig>;
 

  schools : School[] = [
    { schoolCode:"UBC", schoolName:"University of British Columbia"},
    { schoolCode:"SFU", schoolName:"Simon Fraser University"},
    { schoolCode:"BCIT", schoolName:"British Columbia Institute of Technology"}
  ];
  error: ResolvedStudentList;
  constructor(private _studentService: StudentService,
              private _router: Router,
              private _aroute : ActivatedRoute) { 
           
    this.bsConfig = Object.assign({}, 
      { containerClass: this.colorTheme, 
        showWeekNumbers: true,
        minDate: new Date(1950,1,1),
        maxDate: new Date(2020,3,21),
        dateInputFormat: 'YYYY-MM-DD'
      });
  }

  ngOnInit(): void {
    this._aroute.paramMap.subscribe(
      parameterMap => {
        const id=  +parameterMap.get('id');
        this.getStudent(id);
      }
    )
  }

  private getStudent(id : number){

  if (id===0){
    this.student = {
      id :null,
      first_name: null,
      last_name:null,
      email:'test@test.com',
      isActive:null,
      dob:null,
      gender: null,
      school_code: null,
      school_name: null
    };
    this.panelTitle = 'New Student';
   } else { //find the user from the student Service
    //need to break the reference by instantiating a new object
     this.panelTitle = 'Edit Student';
     this._studentService.getStudentById(id).subscribe(
       (student) => this.student = student,
       (err:any) => {
         this.hasError = true;
         this.error = err;
       }
     )
  }
  }
  saveStudent() :void {
    if (this.student.id==null) {
    this._studentService.registerStudent(this.student)
    .subscribe(
      (data: vuStudent) => { //Success
      }, 
      (error:ResolvedStudentList) => {
        this.hasError=true;
        this.error =error;
      });
    } else {
      this._studentService.updateStudent(this.student)
      .subscribe(
        ()  => { }, //success 
        (error:ResolvedStudentList) => {
          this.hasError=true;
          this.error =error;
        }
      );
    }

    //reset before routing away need to define stdForm as parameter
    this.stdForm.reset();
    //or use the decorated form
    this._router.navigate(['/students/list']);
  }
  togglePhotoPreview() {
    this.previewPhoto = ! this.previewPhoto;
  }
  uploadedFile(event : any){
    console.log("changed: " + event);
    const files : File[] = event.files;
    if (files.length > 0)
       this.pictureImage = files[0];
    else this.pictureImage = null;   
  } 
}
