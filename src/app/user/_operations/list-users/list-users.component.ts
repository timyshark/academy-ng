import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'user-list',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
      this.userService.getAll()
          .pipe(first())
          .subscribe(users => this.users = users);
  }

  deleteUser(id: string) {
      const user = this.users.find(search => search.id === id);
      user.isDeleting = true;
      this.userService.delete(id)
          .pipe(first())
          .subscribe(() => this.users = this.users.filter(search => search.id !== id));
  }
}
