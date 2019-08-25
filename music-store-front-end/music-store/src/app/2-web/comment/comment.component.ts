import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/Auth.service';
import { WebHeaderComponent } from '../1-template/1-header/web-header.component';
import { CommentService } from 'src/app/models/Comments/Comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [AuthService, WebHeaderComponent]
})

export class CommentComponent implements OnInit {

  @Input() albumId : any;
  @Output() userName = new EventEmitter<string>();
  isLoggedIn : boolean =  false;
  commentForm : any;
  logForm : any;
  user : object;
  email : any;
  pass : any;
  comment : any;
  DBComments : any;

  constructor(private formBuilder : FormBuilder,
              private authService : AuthService,
              private commentService : CommentService,
              private header :  WebHeaderComponent) { }

  ngOnInit() {
    this.setFormForComment();
    this.setFormForLogIn();
    this.checkConnection();
    this.getComments();
  }

  setFormForLogIn() {
    this.logForm = this.formBuilder.group({
      'email'    : ['', [Validators.required, Validators.email]],
      'password' : ['', [Validators.required]]
    });

    this.email = this.logForm.controls.email;
    this.pass = this.logForm.controls.password;
  }

  logIn() {
    let id = (<HTMLInputElement>document.querySelector('#id-album')).value;
    let email = this.email.value;
    let pass  = this.pass.value;
    let url = '/album/' + id;

    this.checkConnection();

    this.authService.setUser(email, pass, url);
  }

  logOut() {
    this.isLoggedIn = false;
    this.authService.destroyUser();
  }

  checkConnection () {
    if (localStorage.token) {
      this.isLoggedIn = true;
      this.user = {
        'id' : localStorage.userId,
        'name' : localStorage.name,
        'firstname' : localStorage.firstname
      };
      this.header.checkConnection();
    }
  }

  setFormForComment() {
    this.commentForm = this.formBuilder.group({
      'comment' : ['', [Validators.required, Validators.minLength(10)]]
    });

    this.comment = this.commentForm.controls.comment;
  }

  sendComment() {
    let comment = this.comment.value;
    let date    = new Date();
    let idAlbum = (<HTMLInputElement>document.querySelector('#id-album')).value;
    let userId  = (<HTMLInputElement>document.querySelector('#id-user')).value;

    let album = '/api/albums/' + idAlbum;
    let user  = '/api/users/' + userId;

    let data = {'content' : comment, 'date' : date, 'user' : user, 'album' : album};

    this.commentService.createComment(data).subscribe(
      (data) => {
        this.getComments()
      },
      (error) => {
        alert('error : '+ JSON.stringify(error))
      }
    );
  }

  getComments() {
    this.commentService.getComments().subscribe(
      (data) => this.DBComments = data.reverse());
  }

  getUserName(name, firstname) {
    let data = name + ' ' + firstname;
    this.userName.emit(data);
  }
}
