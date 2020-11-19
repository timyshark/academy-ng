import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { UserService } from 'src/app/users/_services/user.service';
import { User } from 'src/app/users/_models/user.model';

@Component({
    selector: 'user_login',  
    templateUrl: 'login.component.html' 
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.userService.userValue) {
            this.router.navigate(['/students/list']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

       //this code executes only when the component activated
        this.route.url
            .subscribe(url => console.log('The URL changed to: ' + url));
    }

    // convenience getter for easy access to form fields
  //  get fcontrols() { return this.loginForm.value; }

    get fcontrols() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
    
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        const user = new User(this.fcontrols.username.value,this.fcontrols.password.value)
        this.userService.login(user)
        //Commented for troubleshooting
            .pipe(first())
             .subscribe(
                 authRecord => {
                     console.log("User is logged in");
                     this.router.navigate(["/students"]);
                 },
                 error => {
                     this.alertService.error(error);
                     this.loading = false;
                 });
    }
}