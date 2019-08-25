import { Component, OnInit, Injectable } from '@angular/core';
import { UsersService } from 'src/app/models/Users/Users.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UsersService]
})

@Injectable()
export class RegisterComponent implements OnInit {

  regForm : any;
  name : any;
  firstname : any;
  email: any;
  address : any;
  number : any;
  postal : any;
  city : any;
  password : any;
  confirm : any;

  constructor(private UsersService: UsersService, private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.regForm = this.formBuilder.group({
      'name' : ['', [Validators.required]],
      'firstname' : ['', [Validators.required]],
      'address' : ['', [Validators.required]],
      'number' : ['', [Validators.required]],
      'postal' : ['', [Validators.required]],
      'city' : ['', [Validators.required]],
      'email' : ['', [Validators.required, Validators.email]],
      'password' : ['', [Validators.required, Validators.minLength(5)]],
      'confirm' : ['', [Validators.required, Validators.minLength(5)]]
    });

    this.name = this.regForm.controls.name;
    this.firstname = this.regForm.controls.firstname;
    this.address = this.regForm.controls.address;
    this.number = this.regForm.controls.number;
    this.postal = this.regForm.controls.postal;
    this.city = this.regForm.controls.city;
    this.email = this.regForm.controls.email;
    this.password = this.regForm.controls.password;
    this.confirm = this.regForm.controls.confirm;
  }

  checkPassword() {
    let pass = this.password.value;
    let confirm = this.confirm.value;

    if (pass !== confirm) {
      this.confirm.value = 'bad credentials';

      return false;
    }
  }

  registerUser() {
    let pass = this.password.value;
    let confirm = this.confirm.value;
    let name = this.name.value;
    let fName = this.firstname.value;
    let address = this.address.value;
    let number = this.number.value;
    let postal = this.postal.value;
    let city = this.city.value;
    let email = this.email.value;

    if (this.checkPassword() === false) {
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
      'roles': 'ROLE_USER'
    };

    this.UsersService.createUser(data)
    .subscribe((data: {}) => {
      alert('ok it sends');
    })

  }
}
