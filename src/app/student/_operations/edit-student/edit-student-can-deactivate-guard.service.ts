import { EditStudentComponent } from './edit-student.component'
import {  Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';


@Injectable()
export class EditStudentCanDeactivateGuardService implements CanDeactivate<EditStudentComponent> {
    canDeactivate(component: EditStudentComponent): boolean {
           if (component.stdForm.dirty) {
               return confirm('Are you sure you want to discard your changes?');
           }
           return true;
    }

}