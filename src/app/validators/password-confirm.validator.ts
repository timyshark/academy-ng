import { Validator, NG_VALIDATORS, ValidationErrors, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
selector: '[appPasswordValidator]',
providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmPasswordValidator,
    multi: true
}]
})
export class ConfirmPasswordValidator implements Validator{
//    only when input target password field
//    @Input() appPasswordValidator:string;

//   used to validate single control
//   validate(control: AbstractControl): 

//   used to validate passwordGroup
    validate(passwordGroup: AbstractControl): 
    {
        [key:string]:any
    } |
    null {
//      used for controls
//        const controlToCompare = control.parent.get(this.appPasswordValidator);

//      used for passwordGroup
const  passwordControl = passwordGroup.get("password");
const  confirmPasswordControl = passwordGroup.get("confirmPassword");
if (passwordControl && confirmPasswordControl
     && passwordControl.value!== confirmPasswordControl.value) {
            return {'mismatch' : true};
        }
        return null;
    } 
}