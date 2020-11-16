import { Student } from '../_models/student.model';

export class ResolvedStudentList {
    constructor(
        public studentList: Student[],
        public error: any=null) {  
        }
}