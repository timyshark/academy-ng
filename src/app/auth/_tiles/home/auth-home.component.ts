import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/users/_models/user.model';
import { UserService } from 'src/app/users/_services/user.service';


@Component({ 
    selector : 'auth-home',
    templateUrl: './auth-home.component.html' ,
    styleUrls: ['./auth-home.component.css']
})
export class AuthHomeComponent implements OnInit {
    user: User;

    constructor(
        private userService: UserService
    ) {
        this.user = this.userService.userValue;
    }

    ngOnInit() {
       // this.loadAllUsers();
    }

    
    
}