import { Component, OnInit, Injectable } from '@angular/core';
import { CommentService } from 'src/app/models/Comments/Comment.service';

@Component({
  selector: 'app-ad-comment',
  templateUrl: './ad-comment.component.html',
  styleUrls: ['./ad-comment.component.css'],
  providers : [CommentService]
})

@Injectable()
export class AdminCommentComponent implements OnInit {

  comments : any;
  comment : any;

  constructor(private commentService : CommentService) { }

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments().subscribe(
      (data) => {
        this.comments = data;
      }
    )
  }

  getComment(comment : any) {
    this.comment = comment
  }

  pressDelComment(comment) {
    this.comment = comment
  }

  deleteComment() {
    let id = (<HTMLInputElement>document.getElementById('id-comment')).value;
    this.commentService.deleteComment(id).subscribe(
      (data) => {
        this.getComments();
      },
      (error) => {
        alert('error: ' + JSON.stringify(error));
      }
    )
  }
}
