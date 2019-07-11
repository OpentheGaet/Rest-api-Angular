import { Component, OnInit, Input } from '@angular/core';
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

  commentForm : any;
  logForm : any
  isLoggedIn : boolean =  false;
  @Input() albumId : any;
  user : object;
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

  setFormForComment() {
    this.commentForm = this.formBuilder.group({
      'comment' : ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  setFormForLogIn() {
    this.logForm = this.formBuilder.group({
      'email'    : ['', Validators.required],
      'password' : ['', Validators.required]
    });
  }

  logIn() {
    let id = (<HTMLInputElement>document.getElementById('id-album')).value;
    let email = this.logForm.value.email;
    let pass  = this.logForm.value.password;
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

  sendComment() {
    let comment = this.commentForm.value.comment;
    let date    = new Date();
    let idAlbum = (<HTMLInputElement>document.getElementById('id-album')).value;
    let userId  = (<HTMLInputElement>document.getElementById('id-user')).value;

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
}
