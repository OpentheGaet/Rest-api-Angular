import { Component, OnInit, Injectable } from '@angular/core';
import { UsersService } from 'src/app/models/Users/Users.service';
import { Users } from 'src/app/models/Users/Users.model';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css'],
  providers: [UsersService]
})

@Injectable()
export class AdminUserAdminComponent implements OnInit {

  constructor(private UsersService : UsersService) { }

  users : Users[];

  ngOnInit() {
    this.getAdminUsers();
  }

  getAdminUsers() {
    this.UsersService.getAdminUsers().
    subscribe(data => this.users = data)
  }

  registerUser() {
    let pass = (<HTMLInputElement>document.getElementById('user-pass')).value;
    let confirm = (<HTMLInputElement>document.getElementById('confirm-pass')).value;
    let name = (<HTMLInputElement>document.getElementById('user-name')).value;
    let fName = (<HTMLInputElement>document.getElementById('user-firstname')).value;
    let address = (<HTMLInputElement>document.getElementById('user-address')).value;
    let number = (<HTMLInputElement>document.getElementById('user-number')).value;
    let postal = (<HTMLInputElement>document.getElementById('user-postal')).value;
    let city = (<HTMLInputElement>document.getElementById('user-city')).value;
    let email = (<HTMLInputElement>document.getElementById('user-email')).value;

    let labelPass = (<HTMLLabelElement>document.getElementsByTagName('label')[6]);
    let labelConfirm = (<HTMLLabelElement>document.getElementsByTagName('label')[7]);

    if (pass !== confirm) {

      labelPass.innerHTML = 'the password are not the same !';
      labelConfirm.innerHTML = 'the password are not the same !';

      labelPass.style.color = 'red';
      labelConfirm.style.color = 'red';

      return;
    } else if (pass.length < 5) {

      labelPass.innerHTML = 'the password field must have 5 characters at least !';
      labelConfirm.innerHTML = 'the password field must have 5 characters at least !';

      labelPass.style.color = 'red';
      labelConfirm.style.color = 'red';

      return;

    }

    let data = {
      'name': name,
      'firstname': fName,
      'address': address,
      'number': number,
      'postal_code': postal,
      'city': city,
      'email': email,
      'password': pass,
      'roles': 'ROLE_ADMIN'
    };

    this.UsersService.createUser(data)
    .subscribe((data: {}) => {
      alert('ok it sends');
    })

  }

  pressUpdUser(user :any) {
    this.UsersService.getUserById(user.id)
    .subscribe(data => {
      console.log(JSON.stringify(data));
    (<HTMLInputElement>document.getElementById('user-name-up')).value = data[0].name;
    (<HTMLInputElement>document.getElementById('user-firstname-up')).value = data[0].firstName;
    (<HTMLInputElement>document.getElementById('user-address-up')).value = data[0].address;
    (<HTMLInputElement>document.getElementById('user-number-up')).value = data[0].number;
    (<HTMLInputElement>document.getElementById('user-postal-up')).value = data[0].postalCode;
    (<HTMLInputElement>document.getElementById('user-city-up')).value = data[0].city;
    (<HTMLInputElement>document.getElementById('user-email-up')).value = data[0].email;
    (<HTMLInputElement>document.getElementById('user-id-up')).value = data[0].id;;
      data[0].id;
    });
  }

}
