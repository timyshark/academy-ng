import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';
import { StudentService } from './student.service';
import { Injectable } from '@angular/core';

@Injectable()
export class StudentListResolverService implements Resolve<Student[]> {
    constructor(private _studentService: StudentService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Student[] | Observable<Student[]> | Promise<Student[]> {
        return this._studentService.getStudentsList();
   }

}