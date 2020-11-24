import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { UserService } from 'src/app/users/_services/user.service';
import { User } from 'src/app/users/_models/user.model';
import { forbiddenNameValidator } from '../../_services/forbidden-name-validator/forbidden-name-validator.directive';
import { UniqueEmailValidator } from '../../_services/unique-email-validator/unique-email-validator.directive';
import { crossFieldValidator } from 'src/app/_services/cross-field-validator/cross-field-validator.directive';


@Component({
  selector: 'auth-register',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {


    userRegisterForm: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    user : User = new User();

    get name() { return this.userRegisterForm.get('name'); }

    get email() { return this.userRegisterForm.get('email'); }
  
    get password() { return this.userRegisterForm.get('password'); }
    get password_confirmation() { return this.userRegisterForm.get('password_confirmation'); }

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private emailValidator: UniqueEmailValidator
    ) {}

    ngOnInit() {

       this.userRegisterForm = new FormGroup({
        name: new FormControl(
            this.user.name, [
            Validators.required,
            Validators.minLength(4),
            forbiddenNameValidator(/bobthebuilder/i)
          ]),
        email : new FormControl(
            this.user.email, {
            asyncValidators: [
                this.emailValidator.validate.bind(this.emailValidator)
            ],
            updateOn: 'blur'
        }),
        password: new FormControl(
            this.user.password, 
            [
                Validators.required,
                Validators.minLength(6)
            ]),
        password_confirmation: new FormControl(
            this.user.password_confirmation,            
            [
            Validators.required,
            Validators.minLength(6), 
            ]),
       }, {validators : crossFieldValidator } );



       

        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        // password not required in edit mode


        if (!this.isAddMode) {
             this.userService.getById(this.id)
                .pipe(first())
                .subscribe(user => this.userRegisterForm.patchValue(user));
 
        }
    }

    // convenience getter for easy access to form fields
    get formControls() { return this.userRegisterForm.controls; }

    onSubmit() {
 
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.userRegisterForm.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.userService.register(this.userRegisterForm.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                    //this.router.navigate(['../'], { relativeTo: this.route });
                    this.router.navigate(['/users']);
                },
                error: (error) => {
                    this.alertService.error("Registering new user failed: " + JSON.stringify(error));
                    this.loading = false;
                }
            });
    }

    private updateUser() {
        this.userService.update(this.id, this.userRegisterForm.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['/users/list']); //, { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}
