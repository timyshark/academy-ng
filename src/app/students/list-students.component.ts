import { Component, OnInit } from '@angular/core';
import { Student } from '../student';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
  students : Student[] = [
    { sId: 1,
      fName: 'Mark',
      lName: 'Andria',
      sEmail: 'mark@andria.com',
      picturePath: 'assets/images/mark.png'
    },
    { sId: 1,
      fName: 'John',
      lName: 'Flamingo',
      sEmail: 'john@flamingo.com',
      picturePath: 'assets/images/john.png'
    },
    { sId: 1,
      fName: 'Mary',
      lName: 'Casandar',
      sEmail: 'mary@casandra.com',
      picturePath: 'assets/images/mary.png'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
