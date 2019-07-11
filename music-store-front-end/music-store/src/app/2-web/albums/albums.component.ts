import { Component, OnInit } from '@angular/core';
import { Albums } from '../../models/Albums/Albums.model';
import { AlbumsService } from '../../models/Albums/Albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums : Albums[];

  constructor(private AlbService : AlbumsService) { }

  ngOnInit() {
    this.AlbService.getAlbums()
    .subscribe(data => this.albums = data);
  }

}
