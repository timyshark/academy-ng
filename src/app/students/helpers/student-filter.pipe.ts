import { PipeTransform, Pipe } from '@angular/core';
import { Student } from '../../models/student.model';
/*
This is not recommended way to do filtering, due to performance, see the note in README.md
*/
@Pipe({
    name: 'studentFilter',  //the name used in the html list to pipe
    //true default, impure tracks changes even mouse moves
    pure: false

})
export class StudentFilterPipe implements PipeTransform {
    private _counter=0;
    transform(students : Student[], searchTerm:string) : Student[] {
        this._counter ++;
       if (!students || !searchTerm) {
           return students;
       }
       //return the employee if satisfies the condition
       return students.filter(student =>
        student.fName.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1) ;
    }
    
}

