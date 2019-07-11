import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/models/Users/Users.service';
import { Users } from 'src/app/models/Users/Users.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UsersService]
})
export class AdminUserComponent implements OnInit {

  users : Users[];

  constructor(private UsersService : UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.UsersService.getUsers().
    subscribe(data => this.users = data)
  }
}
