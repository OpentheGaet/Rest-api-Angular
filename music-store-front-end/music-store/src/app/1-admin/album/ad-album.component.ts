import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ad-album',
  templateUrl: './ad-album.component.html',
  styleUrls: ['./ad-album.component.css']
})
export class AdminAlbumComponent implements OnInit {

  album : any;
  artist : number;
  type : number;

  constructor() { }

  ngOnInit() {}

}
