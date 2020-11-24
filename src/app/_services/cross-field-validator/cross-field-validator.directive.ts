import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validator } from '@angular/forms';


/** two password fields must match */
export const crossFieldValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const password_confirmation = control.get('password_confirmation');
  return password && password_confirmation && password.value !== password_confirmation.value ? { mismatch: true } : null;
};
@Directive({
  selector: '[appCrossFieldValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CrossFieldValidatorDirective,
    multi: true
  }]
})
export class CrossFieldValidatorDirective implements Validator{
    validate(control: AbstractControl) : ValidationErrors {
      return crossFieldValidator(control);
    }
}
