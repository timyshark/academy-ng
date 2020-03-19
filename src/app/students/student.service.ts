import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable , of} from 'rxjs';
import { delay } from 'rxjs/internal/operators';

@Injectable()
export class StudentService {
    private studentsList : Student[]= [
        { sId: 1,
          fName: 'Mark',
          lName: 'Andria',
          sEmail: 'mark@andria.com',
          picturePath: 'assets/images/mark.png',
          isActive: true,
          dob:'',
          gender:'M',
          school:"UBC"
        },
        { sId: 2,
          fName: 'John',
          lName: 'Flamingo',
          sEmail: 'john@flamingo.com',
          picturePath: 'assets/images/john.png',
          isActive: true,
          dob:'',
          gender:'M',
          school:'SFU'
        },
        { sId: 3,
          fName: 'Mary',
          lName: 'Casandar',
          sEmail: 'mary@casandra.com',
          picturePath: 'assets/images/mary.png',
          isActive: false,
          dob:'',
          gender:'F',
          school:'BCIT'
        }
      ];
      getStudentsList(): Observable<Student[]> {
          return of(this.studentsList).pipe( delay(2000));
      }
      // getStudentsList(): Student[] {
      //     return this.studentsList;
      // }
      registerStudent(newStudent: Student){
        if (newStudent.sId === null){
          // find the maximum sId in the array
          const maxId = this.studentsList.reduce(function(s1,s2){
            return (s1.sId > s2.sId) ? s1:s2;
          }).sId +1;
          newStudent.sId = maxId;
          this.studentsList.push(newStudent);
        } else {
          const stdIndex = this.studentsList.findIndex(
            s => s.sId === newStudent.sId);
          this.studentsList[stdIndex] = newStudent;
        }
      }
      getStudentById(sId : number) : Student{
        // find Student who sId equivalent(type and value) to sId
        console.log("Students in the list: " + this.studentsList.length);
        const std = this.studentsList.find(s => s.sId === sId);
        console.log(JSON.stringify(std));
        return std;

      }
      deleteStudentById(sId : number){
        const sIdNDX =this.studentsList.findIndex( s => s.sId === sId);
        if (sIdNDX !== -1){
          this.studentsList.splice(sIdNDX,1);
        }
      }
}