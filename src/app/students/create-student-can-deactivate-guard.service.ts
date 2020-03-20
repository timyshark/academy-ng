import { CreateStudentComponent } from './create-student.component'
import {  Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';


@Injectable()
export class createStudentCanDeactivateGuardService implements CanDeactivate<CreateStudentComponent> {
    canDeactivate(component: CreateStudentComponent): boolean {
           if (component.stdForm.dirty) {
               return confirm('Are you sure you want to discard your changes?');
           }
           return true;
    }

}