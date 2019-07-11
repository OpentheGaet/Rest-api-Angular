import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './Login.models';
import { Observable, Subscription } from 'rxjs/Rx';


@Injectable()
export class AuthService {

  logUrl : string = 'http://127.0.0.1:8000/web/login';
  tokUrl : string = 'http://127.0.0.1:8000/web/token';
  stateLog : boolean = false;
  user : any;
  timeCount : Subscription;
  seconds : number;

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  }

  constructor(private http : HttpClient, private router : Router) {}

  getUser(logInfo : any) {
    let data = JSON.stringify(logInfo);
    return this.http.post<Login[]>(this.logUrl, data, this.httpOptions);
  }

  changeToken(userData : any) {
    return this.http.post<Login[]>(this.tokUrl, userData, this.httpOptions);
  }

  setUser(email : any, pass : any, url : string) {
    localStorage.clear();

    let logInfo = {"username" : email, "password" : pass};

    this.getUser(logInfo).subscribe(
      (data) => {
        this.user = data;
        localStorage.loggedIn = true;
        localStorage.userId = this.user.id
        localStorage.name = this.user.name,
        localStorage.firstname = this.user.firstname;
        localStorage.email = this.user.email;
        localStorage.role = this.user.role;
        localStorage.token = this.user.apiToken;
        localStorage.allowToken = this.user.apiToken;
        if (url) {
          return this.router.navigate([url]);
        }
        return;
      },
      (error) => {
        return this.destroyUser();
      }
    );
  }

  setUserToken() {
    const userData = {"id" : localStorage.userId, "token" : localStorage.token};
    let warningMsg : any = "Not any token is available";

    this.changeToken(userData).subscribe(
      (data) => {
        if (warningMsg === data) {
          return this.destroyUser();
        }
        localStorage.token = data;
        localStorage.allowToken = data;
      },
      (error) => {
        return this.destroyUser();
      }
    )
  }

  releaseTokenByTime() {
    const counter = Observable.interval(1000);

    this.timeCount = counter.subscribe(
      (value : number) => {
        this.seconds = value;

        if (this.seconds === 300) {
          this.setUserToken();
          this.timeCount.unsubscribe();
          this.releaseTokenByTime();
        }
      }
    )
  }

  destroyUser() {
    localStorage.clear();
    if (localStorage.token != '') {
      this.timeCount.unsubscribe();
    }
    return this.router.navigate(['/home']);
  }

}

