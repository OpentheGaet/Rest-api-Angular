import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Albums } from "./Albums.model";


@Injectable()
export class AlbumsService {

  apiUrl : any = 'http://127.0.0.1:8000/api/albums';
  apiSearch : any = 'http://127.0.0.1:8000/web/albums';
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

  getAlbums() {
    return this.http.get<Albums[]>(this.apiUrl);
  }

  getAlbumById(id : any) {
    return this.http.get<Albums[]>(this.apiUrl + '/'+ id);
  }

  createAlbum(album : any) {
    var data = JSON.stringify(album);
    return this.http.post<Albums[]>(this.apiUrl, data, this.getHttpOptions());
  }

  updateAlbum(id : any, album : any) {
    alert(id);
    var data = JSON.stringify(album);
    return this.http.put<Albums[]>(this.apiUrl + '/' + id, data, this.getHttpOptions());
  }

  deleteAlbum(id : any) {
    return this.http.delete<Albums[]>(this.apiUrl + '/' + id, this.getHttpOptions());
  }

  searchAlbums(name : any) {
    return this.http.get<Albums[]>(this.apiSearch + '/' + name, this.getHttpOptions());
  }

}
