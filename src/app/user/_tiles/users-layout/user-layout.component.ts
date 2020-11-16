import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'user-layout',
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
