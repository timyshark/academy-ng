import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/users/_models/user.model';
import { UserService } from 'src/app/users/_services/user.service';


@Component({     
    selector: 'app-home',
    templateUrl: './app-home.component.html',
    styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent implements OnInit {
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

    // deleteUser(id: string) {
    //     this.userService.delete(id)
    //         .pipe(first())
    //         .subscribe(() => this.loadAllUsers());
    // }

    // private loadAllUsers() {
    //     this.userService.getAll()
    //         .pipe(first())
    //         .subscribe(users => this.users = users);
    // }
}