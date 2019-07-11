import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Styles } from './Styles.model';

@Injectable()
export class StylesService {

  apiUrl : any = 'http://127.0.0.1:8000/api/types';

  constructor(private http : HttpClient) { }

  getHttpOptions() {
      const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type'  : 'application/json',
        'authorization' : 'Basic ' + btoa(localStorage.token+':')
      })
    }
    return httpOptions
  }

  getStyles() {
    return this.http.get<Styles[]>(this.apiUrl);
  }

  getStyleById(id : number) {
    return this.http.get<Styles[]>(this.apiUrl + '/' + id);
  }

  createStyle(style : any) {
    var data = JSON.stringify(style);
    return this.http.post<Styles[]>(this.apiUrl, data, this.getHttpOptions());
  }

  updateStyle(id : any, style : any) {
    var data = JSON.stringify(style);
    return this.http.put<Styles[]>(this.apiUrl + '/' + id, data, this.getHttpOptions())
  }

  deleteStyle(id : any) {
    return this.http.delete<Styles[]>(this.apiUrl + '/' + id, this.getHttpOptions())
  }
}
