import { Directive, forwardRef, Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RegisterRecord } from 'src/app/users/_models/user.model';
import { UserService } from 'src/app/users/_services/user.service';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private userService: UserService) {}
  validate( ctrl: AbstractControl  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.isEmailTaken(ctrl.value).pipe(
      map((userR:RegisterRecord) => {
      let isTaken =userR.user!=null;
       return (isTaken ? { emailTaken: true } : null);
      }),
      catchError(() => of(null))
    );
  }
}

@Directive({
  selector: '[appUniqueEmailValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueEmailValidator),
      multi: true
    }
  ]
})
export class UniqueEmailValidatorDirective {
  constructor(private validator: UniqueEmailValidator) {}
  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
