import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';


@Component({ 
    selector : 'users-home',
    templateUrl: './users-home.component.html' 
})
export class UsersHomeComponent implements OnInit {
    user: User;
    users = [];

    constructor(
        private userService: UserService
    ) {
        this.user = this.userService.userValue;
    }

    ngOnInit() {
       // this.loadAllUsers();
    }

    deleteUser(id: string) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}