import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Users } from "./Users.model";


@Injectable()
export class UsersService {

  webReg : any = 'http://127.0.0.1:8000/web/register';
  apiAdUsers : any = 'http://127.0.0.1:8000/admin/admin_users';
  apiUsers : any = 'http://127.0.0.1:8000/admin/users';
  apiUrl : any = 'http://127.0.0.1:8000/api/users';
  httpOptions : any;

  constructor(private http : HttpClient) { }

  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Basic ' + btoa(localStorage.token + ':')
      })
    }
    return httpOptions
  }

  createUser(user : any) {
    let data = JSON.stringify(user);
    return this.http.post<Users[]>(this.webReg, data, this.getHttpOptions());
  }

  getAdminUsers() {
    return this.http.get<Users[]>(this.apiAdUsers);
  }

  getUsers() {
    return this.http.get<Users[]>(this.apiUsers);
  }

  getUserById(id : any) {
    return this.http.get<Users[]>(this.apiUrl, id);
  }

}
