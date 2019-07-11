import { Component, OnInit } from '@angular/core';
import { Albums } from '../../models/Albums/Albums.model';
import { AlbumsService } from '../../models/Albums/Albums.service';
import { Artists } from '../../models/Artists/Artists.model';
import { Styles } from '../../models/Styles/Styles.model';
import { ArtistsService } from '../../models/Artists/Artists.service';
import { StylesService } from '../../models/Styles/Styles.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  albums : Albums[];
  styles : Styles[];
  artists : Artists[];
  checkAlb : boolean = false;
  checkSty : boolean = false;
  checkArt : boolean = false;

  constructor(private AlbService : AlbumsService,
              private ArtService : ArtistsService,
              private StyService : StylesService) {}

  ngOnInit() {}

  fetchAlbums() {
    this.checkSty = false;
    this.checkArt = false;
    this.checkAlb = true;
    this.AlbService.getAlbums()
    .subscribe(data => this.albums = data);
  }

  fetchStyles() {
    this.checkAlb = false;
    this.checkArt = false;
    this.checkSty = true;
    this.StyService.getStyles()
    .subscribe(data => this.styles = data);
  }

  fetchArtists() {
    this.checkSty = false;
    this.checkAlb = false;
    this.checkArt = true;
    this.ArtService.getArtists()
    .subscribe(data => this.artists = data);
  }

  setFalse() {
    this.checkAlb = false;
    this.checkSty = false;
    this.checkArt = false;
  }

}
