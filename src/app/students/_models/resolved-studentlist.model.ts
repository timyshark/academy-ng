import { vuStudent } from './student.model';

export class ResolvedStudentList {
    constructor(
        public studentList: vuStudent[],
        public error: any=null) {  
        }
}