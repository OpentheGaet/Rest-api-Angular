import { Component, OnInit, Injectable } from '@angular/core';
import { UsersService } from 'src/app/models/Users/Users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UsersService]
})

@Injectable()
export class RegisterComponent implements OnInit {

  regForm : any;

  constructor(private UsersService: UsersService, private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.regForm = this.formBuilder.group({
      'name' : ['', Validators.required],
      'firstname' : ['', Validators.required],
      'address' : ['', Validators.required],
      'number' : ['', Validators.required],
      'postal' : ['', Validators.required],
      'city' : ['', Validators.required],
      'email' : ['', [Validators.required, Validators.email]],
      'password' : ['', [Validators.required, Validators.minLength(5)]],
      'confirm' : ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  checkPassword(pass : any, confirm : any) {
    let labelPass = (<HTMLLabelElement>document.getElementsByTagName('label')[7]);
    let labelConfirm = (<HTMLLabelElement>document.getElementsByTagName('label')[8]);

    if (pass !== confirm) {

      labelPass.innerHTML = 'the password are not the same !';
      labelConfirm.innerHTML = 'the password are not the same !';

      labelPass.style.color = 'red';
      labelConfirm.style.color = 'red';

      return false;
    }
  }

  registerUser() {
    let pass = this.regForm.value.password;
    let confirm = this.regForm.value.confirm;
    let name = this.regForm.value.name;
    let fName = this.regForm.value.firstname;
    let address = this.regForm.value.address;
    let number = this.regForm.value.number;
    let postal = this.regForm.value.postal;
    let city = this.regForm.value.city;
    let email = this.regForm.value.email;

    if (this.checkPassword(pass, confirm) === false) {
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
