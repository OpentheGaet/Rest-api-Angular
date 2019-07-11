import { Injectable } from '@angular/core';
import { comment } from './Comment.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class CommentService {

  comment : comment[];
  apiUrl : any = 'http://127.0.0.1:8000/api/comments';

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

  getComments() {
    return this.http.get<comment[]>(this.apiUrl);
  }

  getCommentById(id : number) {
    return this.http.get<comment[]>(this.apiUrl + '/' + id);
  }

  createComment(comment : any) {
    var data = JSON.stringify(comment);
    return this.http.post<comment[]>(this.apiUrl, data, this.getHttpOptions());
  }

  updateComment(id : any, comment : any) {
    var data = JSON.stringify(comment);
    return this.http.put<comment[]>(this.apiUrl + '/' + id, data, this.getHttpOptions());
  }

  deleteComment(id : any) {
    return this.http.delete<comment>(this.apiUrl + '/' + id, this.getHttpOptions())
  }

}
