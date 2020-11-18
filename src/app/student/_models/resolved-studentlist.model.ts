import { Student } from './student.model';

export class ResolvedStudentList {
    constructor(
        public studentList: Student[],
        public error: any=null) {  
        }
}