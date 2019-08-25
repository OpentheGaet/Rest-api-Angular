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
  warning : string;
  user : any;

  ngOnInit() {
    this.getAdminUsers();
  }

  getAdminUsers() {
    this.UsersService.getAdminUsers().subscribe(
      data => this.users = data
    );
  }

  registerUser(form) {

    let pass = form.controls.cpass.value;
    let confirm = form.controls.cconfirm.value;
    let name = form.controls.cname.value;
    let fName = form.controls.cfirstname.value;
    let address = form.controls.caddress.value;
    let number = form.controls.cnumber.value;
    let postal = form.controls.cpostal.value;
    let city = form.controls.ccity.value;
    let email = form.controls.cemail.value;

    if (pass !== confirm) {

      this.warning = 'bad credentials'

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

    console.log(data);

    this.UsersService.createUser(data)
    .subscribe((data: {}) => {
      this.getAdminUsers();
      this.warning = null;
      form.form.reset();
      document.getElementById('close-cre-modal').click();
    })

  }

  pressUpdUser(user) {
    this.user = user;
  }

  updateUser(form) {

    let pass = form.controls.upass.value;
    let confirm = form.controls.uconfirm.value;
    let name = form.controls.uname.value;
    let fName = form.controls.ufirstname.value;
    let address = form.controls.uaddress.value;
    let number = form.controls.unumber.value;
    let postal = form.controls.upostal.value;
    let city = form.controls.ucity.value;
    let email = form.controls.uemail.value;

    let id = (<HTMLInputElement>document.querySelector('#user-id-up')).value;

    if (pass !== confirm) {

      this.warning = 'bad credentials'

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

    this.UsersService.updateUser(id, data)
    .subscribe((data : {}) => {
      this.getAdminUsers();
      this.warning = null;
      form.form.reset();
      document.getElementById('close-upd-modal').click();
    })

  }

  pressDelUser(data) {
    (<HTMLInputElement>document.querySelector('#id-del-user')).value = data.id;
    document.querySelector('#show-del-user').innerHTML = data.first_name + ' ' + data.name;
  }

  deleteUser() {
    let id = (<HTMLInputElement>document.querySelector('#id-del-user')).value;
    alert(id);

    this.UsersService.deleteUser(id).subscribe(
      (data : {}) => {
        this.getAdminUsers()
        document.getElementById('close-del-modal').click();
      });
  }
}
