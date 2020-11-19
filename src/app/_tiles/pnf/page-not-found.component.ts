import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/users/_models/user.model';
import { UserService } from 'src/app/users/_services/user.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  user : User;
  constructor(private userService: UserService) {
    this.user = userService.userValue;
   }

  ngOnInit(): void {
  }

}
