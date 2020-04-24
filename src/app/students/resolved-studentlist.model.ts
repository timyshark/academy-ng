import { Student } from '../models/student.model';

export class ResolvedStudentList {
    constructor(
        public studentList: Student[],
        public error: any=null) {  
            console.log("Resolver worked");
        }
}