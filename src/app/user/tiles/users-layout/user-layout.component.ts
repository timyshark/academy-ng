import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {
  user: User;
  constructor(
    private router: Router,
    private userService: UserService) {
       // redirect to home if already logged in
       this.user = this.userService.userValue;
    }
    

  ngOnInit(): void {
  }

}
