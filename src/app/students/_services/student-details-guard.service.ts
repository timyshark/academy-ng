import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { StudentService } from './student.service';

@Injectable()
export class StudentDetailGuardService implements CanActivate {

    
    constructor (private _studentService : StudentService,
                 private _router : Router) {}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
            // must return Observable<boolean>
        const id = +route.paramMap.get('id');
        return this._studentService.getStudentById(id)
          .pipe(
              map(student => {
                  if (!!student) {
                      return true;
                  } else {
                      this._router.navigate(['PNF']);
                      return false;
                  }
              }),
              catchError((err) =>{ return of(false); }    
              )
          );
 
    }

}