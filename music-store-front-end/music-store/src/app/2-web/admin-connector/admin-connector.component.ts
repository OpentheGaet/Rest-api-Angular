import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/Auth.service';
import { Login } from 'src/app/auth/Login.models';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-connector',
  templateUrl: './admin-connector.component.html',
  styleUrls: ['./admin-connector.component.css'],
  providers: [AuthService]
})

@Injectable()
export class AdminConnectorComponent implements OnInit {

  logForm : any;
  email : any;
  pass : any;
  logInfo : any;
  user : any;

  constructor(private AuthService : AuthService,
              private formBuilder : FormBuilder,
              private router : Router) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.logForm = this.formBuilder.group({
      'email'    : ['', [Validators.required, Validators.email]],
      'password' : ['', [Validators.required]]
    });

    this.email = this.logForm.controls.email;
    this.pass  = this.logForm.controls.password;
  }

  logIn() {
    let url = '/admin/home';
    let email = this.email.value;
    let pass  = this.pass.value;

    this.AuthService.setUser(email, pass, url);
  }
}
