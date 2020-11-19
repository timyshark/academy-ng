import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/users/_models/user.model';
import { UserService } from 'src/app/users/_services/user.service';

@Component({
  selector: 'students-layout',
  templateUrl: './students-layout.component.html',
  styleUrls: ['./students-layout.component.css']
})
export class StudentsLayoutComponent implements OnInit {
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
