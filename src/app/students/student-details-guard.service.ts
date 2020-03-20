import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from './student.service';
import { Injectable } from '@angular/core';

@Injectable()
export class StudentDetailGuardService implements CanActivate {
    constructor (private _studentService : StudentService,
                 private _router : Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
            console.log("Student Guard Sevice List " + this._studentService.getStudentsList());
       const studentFound= !!this._studentService.getStudentById(
            +route.paramMap.get('sId')
        );
        if (studentFound) {
            return true;
        } else {
            this._router.navigate(['pageNotFound']);
            return false;
        }
    }

}