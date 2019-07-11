import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from '../../models/Albums/Albums.service';
import { Albums } from 'src/app/models/Albums/Albums.model';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album : Albums[];

  constructor(private AlbService : AlbumsService, private route : ActivatedRoute) {}

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    const id = this.route.snapshot.params['id'];
    this.AlbService.getAlbumById(+ id)
    .subscribe(data => this.album = data);
  }
}
