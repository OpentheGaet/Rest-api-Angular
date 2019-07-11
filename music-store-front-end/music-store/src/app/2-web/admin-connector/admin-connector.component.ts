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
  email : string;
  pass : string;
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
      'email' : ['', Validators.required],
      'password' : ['', Validators.required]
    });
  }

  logIn() {
    let email = this.logForm.value.email;
    let pass  = this.logForm.value.password;
    let url = '/admin/home'

    this.AuthService.setUser(email, pass, url);
  }
}
