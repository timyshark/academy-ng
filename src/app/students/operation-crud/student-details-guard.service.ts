import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StudentService } from '../services/student.service';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class StudentDetailGuardService implements CanActivate {

    
    constructor (private _studentService : StudentService,
                 private _router : Router) {}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
            // must return Observable<boolean>
        const sId = +route.paramMap.get('sId');
        return this._studentService.getStudentById(sId)
          .pipe(
              map(student => {
                  if (!!student) {
                      return true;
                  } else {
                      this._router.navigate(['pageNotFound']);
                      return false;
                  }
              }),
              catchError((err) =>{ return of(false); }    
              )
          );
 
    }

}