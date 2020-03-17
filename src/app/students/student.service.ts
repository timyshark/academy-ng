import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

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
          school:"1"
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
          school:'OTHER'
        }
      ];
      getStudentsList(): Student[] {
          return this.studentsList;
      }
      registerStudent(newStudent: Student){
          this.studentsList.push(newStudent);
      }
      getStudentById(sId : number) : Student{
        // find Student who sId equivalent(type and value) to sId
        console.log("Students in the list: " + this.studentsList.length);
        const std = this.studentsList.find(s => s.sId === sId);
        console.log(JSON.stringify(std));
        return std;

      }
}