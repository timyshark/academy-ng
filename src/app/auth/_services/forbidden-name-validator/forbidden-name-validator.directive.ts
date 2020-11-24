import { Directive, Input } from '@angular/core';
import { ValidatorFn, AbstractControl, Validator } from '@angular/forms';


/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
@Directive({
  selector: '[appForbiddenNameValidator]'
})
export class ForbiddenNameValidatorDirective implements Validator {
  @Input('appForbiddenName') forbiddenName: string; //Use alias to input parameter
  constructor() { }
  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
                              : null;
  }
}
