# Academy NG

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


<!--
  This tutorial uses bootstrap@3, need to work on bootstrap v4 Classes do not work on bootstrap v4
  1. create the project $ng new proj
  2. npm install bootstrap@3
  3. npm install ngx-bootstrap
  2. import bootstrap styles : check styles.css or angular.json styles and scripts section
  2. create the model student.ts: new text file in models folder
  3. create list students component: $ng g c students/list-students --skipTests=true --flat=true
  5. pupulate sample data in list-students.ts file
  6. display students in list-students.html file
  7. edit routing app.module.ts 
  8. edit app.component.html include router-outlet
  create student:
  1. create new create-student component: $ng g c students/create-student --skipTests=true --flat=true
  2. edit create-student.html form
  3. link forms with model "ngForm" and ngModel tags
  4. bind the submit event to saveStudent method pass template ref variable
  5. create the saveStudent method in create-student.ts
  6. use bsDatePicker from ngx-bootstrap , check website for docs, and how to configure
-------------------------------------------------------------------------------
  
 Form Validation:
~~~~~~~~~~~~~~~~
   Custom Validation:
   1. declare new CustomValidation Class : /validators/student.validator.ts
   2. implement validate(control: AbstractControl):  method (Learn about it)
   3. import and load the class in app.module.ts @NgModule section
   4. use the Validator selector in html tags

Service:
~~~~~~~~~~~~~~
1. create a service.ts file 
2. register service in app.module.ts 
3. call the service in component.ts class in ngOnInit()

Form Navigation:
~~~~~~~~~~~~~~~~
 Child and parent between List and Display student

Form Navigation Guarding:
1. Creating navigation guard class createStudentCanDeactivateGuardService = ng g c ....
2. Implement the canDeactivate method
3. in app.module.ts import the module, add to providers, add to route as canDeactivate
4. Note: won't work if new address on address bar internal or external

Search Filtering:
(Pipe not recommended) Performance issues
1. create search html block list-student -- bind it with ListComponent "define search term"
2. create search pipe filter class ,Annotate @Pipe, Register app.Module.ts in declaration section
3. in the list-students.html add *ngFor="let student of students | studentFilter:searchTerm"
4. in the Fitler class , Pure change doesn't re-evaluate the filter pipe, Impure change do re-evaluate, Pure change is change that 

Passing Parameters:
~~~~~~~~~~~~~~~~~~
1. use queryParams ex. list.onClick() or list.html
2. use queryParamsHandling preserve|merge ex. details.goBack() or links in html goNext()
3. use queryParamMap to get parameters (after ?) and paramMap to get optional parameters (after ;)

Observables ()
~~~~~~~~~~~~~
Observables provide support for passing messages between publishers and subscribers in your application
subscribe : asynchronous execution of a function, hint use anonymous block {} to include more lines of code or just a method

Resolver:
~~~~~~~~~~
1. create reslover class StudentListResolverService as a service
2. Register it in providers section app.module.ts
3. Add resolver to the route in app.module.ts
4. read prefetched data from activated route
the resolver holds the link before navigation to fetch the data (including delay) before it routes

1. enable tracing to true in app.module.ts RouterModule.forRoot(appRoutes, {enableTracing:true}) method, allows loging at the browser js console 
2. Register Nav start, Nav End Events in app.component.ts 
3. add spinner css style app.component.css , hint: https://loading.io/css to load more spinner examples

Page not Found routing:
~~~~~~~~~~~~~~~~~~~~~~~
1. create the component $ng g c pageNotFound
2. Add route in the app.module.ts 
3. Generate CanActivate Guard service studentDetailsGuardService, implement the logic to detect invalid student ID in Activate method
4. Register the guard service in app.module.ts under providers section
5. tie the guardservice to the route path associated with StudentDetails "/students/:sId"
6. test by addressing student/7

Passing Data between Components:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  1. Input Properties
  2. Output Properties
  3. Template Reference Variables
  4. Angular Service
  5. Required Route Parameters /?
  6: Optional Route Parameters /;
  7: Query Parameters 
REST API Test
~~~~~~~~~~~~~~~~~~~~~
NOTE: The Tutorial video is for Angular 5 and old rxjs , this module has been modified to go with latest Angular 9 and rxjs 6
1. install json-server: $sudo npm install -g json-server
2. run json server: $json-server --watch db.json
3. use Fiddler TestMan for testing
4. Import HttpClientModule in app.module.ts and load it under imports section
5. Import HttpClient in the StudentService.ts and inject it in the constructor
6. Implement handleError , hint https://www.positronx.io/angular-error-handling-tutorial-with-examples/
7. Error handling https://blog.angular-university.io/rxjs-error-handling/
8. two versions of how to pass the error through the Observable chain,
version 1, uses encapsulated class (favourite) is used 
Version 2, uses union <Array | string>
9. Use interceptor as per 6 above , and handle errors as per 7 above
10. 

Firebase scripts:
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/7.13.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/7.13.1/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>
-->

NOTE for Apache 2
1. .htaccess 
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . index.html [L]
</IfModule>
2. Virtual Host Directory
<Directory "/var/www/html">
  AllowOverride All
</Directory>


Angular Authentication JWT
1. Install npm install @auth0/angular-jwt --save
2. create JWT Service : ng generate service students/studentJWT
3. Edit login, logout, register, isLoggedIn funtions in the JWT Service
4. import import { JwtModule } from '@auth0/angular-jwt'; in app.modules.ts & Edit the imports section
5. retrieve and add access_token from localstorage.getItem('access_token') include it in the header as per Laravel Requirement