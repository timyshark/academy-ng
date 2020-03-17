import { PipeTransform, Pipe } from '@angular/core';
import { Student } from '../models/student.model';

@Pipe({
    name: 'studentFilter',
    //true default, impure tracks changes even mouse moves
    pure: false

})
export class StudentFilterPipe implements PipeTransform {
    private _counter=0;
    transform(students : Student[], searchTerm:string) : Student[] {
        this._counter ++;
        console.log('Filter search executed [' + this._counter + '] times');
       if (!students || !searchTerm) {
           return students;
       }
       //return the employee if satisfies the condition
       return students.filter(student =>
        student.fName.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1) ;
    }
    
}

