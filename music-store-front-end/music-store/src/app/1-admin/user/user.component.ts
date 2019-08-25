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
  user : any;

  constructor(private UsersService : UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.UsersService.getUsers().
    subscribe(data => this.users = data)
  }

  pressUpdUser(user) {
    this.user = user;
  }

  pressDelUser(user) {
    (<HTMLInputElement>document.querySelector('#id-del-user')).value = user.id;
    document.querySelector('#show-del-user').innerHTML = user.first_name + ' ' + user.name;
  }

  deleteUser() {
    let id = (<HTMLInputElement>document.querySelector('#id-del-user')).value;

    this.UsersService.deleteUser(id).subscribe(
      (data : {}) => {
        this.getUsers()
        document.getElementById('close-del-modal').click();
      });
  }
}
