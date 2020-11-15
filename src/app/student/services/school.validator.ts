import { Directive, Input } from '@angular/core';
import { Validator,AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[appSchoolValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: SchoolValidator,
        multi: true
    }]
})
export class SchoolValidator implements Validator{
    @Input('appSchoolValidator') defaultValue:string;
    validate(control: AbstractControl):  
    {[key: string ]:any} | 
        null { return control.value === this.defaultValue ? { 'defaultSelected':true} : null; 
    }
}