import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Artists } from './Artists.model';

@Injectable()
export class ArtistsService {
  apiUrl : any = 'http://127.0.0.1:8000/api/artists';
  httpOptions : any;

  constructor(private http : HttpClient) {}

  getHttpOptions() {
      const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type'  : 'application/json',
        'authorization' : 'Basic ' + btoa(localStorage.token+':')
      })
    }
    return httpOptions
  }

  getArtists() {
    return this.http.get<Artists[]>(this.apiUrl);
  }

  getArtistById(id : number) {
    return this.http.get<Artists[]>(this.apiUrl + '/' + id);
  }

  createArtist(artist : any) {
    var data = JSON.stringify(artist);
    return this.http.post<Artists[]>(this.apiUrl, data, this.getHttpOptions());
  }

  updateArtist(id : any, artist : any) {
    var data = JSON.stringify(artist);
    return this.http.put<Artists[]>(this.apiUrl + '/' + id, data, this.getHttpOptions())
  }

  deleteArtist(id : any) {
    return this.http.delete<Artists[]>(this.apiUrl + '/' + id, this.getHttpOptions())
  }
}
