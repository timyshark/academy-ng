import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { School } from 'src/app/models/school.model';
import { Student } from 'src/app/models/student.model';
import { ResolvedStudentList } from '../../helpers/resolved-studentlist.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
//bring the form from html 
   @ViewChild('studentForm') public stdForm: NgForm;
   previewPhoto:boolean = false;
   panelTitle: string ="Undefined";
   public hasError:boolean = false;
   private pictureImage = null;

  student: Student = {
    sId:null,
    fName: null,
    sEmail:'test@test.com',
    isActive:null,
    dob:null,
    gender: null,
    school: null,
    picturePath: null
  }

  colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig>;
 

  schools : School[] = [
    { schoolCode:"UBC", schoolName:"University of British Columbia"},
    { schoolCode:"SFU", schoolName:"Simon Fraser University"}
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
        const sId=  +parameterMap.get('sId');
        this.getStudent(sId);
      }
    )
  }

  private getStudent(sId : number){

  if (sId===0){
    this.student = {
      sId:null,
      fName: null,
      sEmail:'test@test.com',
      isActive:null,
      dob:null,
      gender: null,
      school: null
    };
    this.panelTitle = 'New Student';
   } else { //find the user from the student Service
    //need to break the reference by instantiating a new object
     this.panelTitle = 'Edit Student';
     this._studentService.getStudentById(sId).subscribe(
       (student) => this.student = student,
       (err:any) => {
         this.hasError = true;
         this.error = err;
       }
     )
  }
  }
  saveStudent() :void {
    if (this.student.sId==null) {
    this._studentService.registerStudent(this.student)
    .subscribe(
      (data: Student) => { //Success
      }, 
      (error:ResolvedStudentList) => {
        this.hasError=true;
        this.error =error;
      });
    } else {
      this._studentService.updateStudent(this.student)
      .subscribe(
        () => { //Success
        }, 
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
