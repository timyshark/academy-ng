import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StudentService } from './student.service';
import { Injectable } from '@angular/core';
import { catchError, map} from 'rxjs/operators';
import { ResolvedStudentList } from '../helpers/resolved-studentlist.model';
import { AuthRecord} from '../../models/user.model';

/* 
Version 1 
~~~~~~~~~
using Encapsulated Class ResolvedStudentList
*/

@Injectable()
export class StudentListResolverService implements Resolve<ResolvedStudentList> {
    constructor(private _studentService: StudentService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
                Observable<ResolvedStudentList>  {
                   return this._studentService.getStudentsList()
                    .pipe( 
                         map((stdList) => new ResolvedStudentList(stdList)),
                         catchError((err: any) => {return of(null,err);})
                    ); 
        }



}

/*
//Version 2: using union
@Injectable()
export class StudentListResolverService implements Resolve<Student[] | string> {
    constructor(private _studentService: StudentService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
                Observable<Student[] | string>  {
                   return this._studentService.getStudentsList()
                    .pipe( 
                         catchError((err: string) => {return of(err);})
                    );
        }

}
*/