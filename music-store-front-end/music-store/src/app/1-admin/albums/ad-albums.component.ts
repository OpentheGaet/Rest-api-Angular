import { Component, OnInit } from '@angular/core';
import { Albums } from 'src/app/models/Albums/Albums.model';
import { AlbumsService } from 'src/app/models/Albums/Albums.service';
import { Artists } from 'src/app/models/Artists/Artists.model';
import { Styles } from 'src/app/models/Styles/Styles.model';
import { StylesService } from 'src/app/models/Styles/Styles.service';
import { ArtistsService } from 'src/app/models/Artists/Artists.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ad-albums',
  templateUrl: './ad-albums.component.html',
  styleUrls: ['./ad-albums.component.css'],
})

export class AdminAlbumsComponent implements OnInit {

  albums : Albums[];
  artists : Artists[];
  styles : Styles[];
  selArt : string;
  selSty : string;
  file : File;
  fileName : string;
  data : any;

  constructor(private AlbService : AlbumsService,
              private StyService : StylesService,
              private ArtService : ArtistsService,
              private http : HttpClient) { }

  ngOnInit() {
    this.readAlbums();
    this.readArtists();
    this.readStyles();
  }

  readAlbums() {
    this.AlbService.getAlbums()
    .subscribe(data => this.albums = data);
  }

  readArtists() {
    this.ArtService.getArtists()
    .subscribe(data => this.artists = data);
  }

  readStyles() {
    this.StyService.getStyles()
    .subscribe(data => this.styles = data);
  }

  onChooseFile(event) {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }

  createArtist() {
    var name = (<HTMLInputElement>document.getElementById('c-album-name')).value;
    var priceString = (<HTMLInputElement>document.getElementById('c-album-price')).value;
    var boxArtString = (<HTMLSelectElement>document.getElementById('c-album-artist')).value;
    var boxStyString = (<HTMLSelectElement>document.getElementById('c-album-style')).value;

    var price = parseFloat(priceString);
    var boxArt = '/api/artists/' + boxArtString;
    var boxSty = '/api/types/' + boxStyString;

    var data = { 'artists' : boxArt, 'types' : boxSty , 'name' : name, 'imageName' : this.fileName , 'price' : price };

    this.AlbService.createAlbum(data)
    .subscribe((data : {}) => {
      this.readAlbums()
    });

    this.sendFile();

  }

  sendFile() {
    let formData = new FormData();
    formData.append("image", this.file, this.file.name);

    this.http.post('http://localhost:3000/api/upload', formData)
    .subscribe((response) => {})
  }

  pressUpdAlbum(album) {
    (<HTMLInputElement>document.getElementById('u-album-id')).value = album.id;
    (<HTMLInputElement>document.getElementById('u-album-name')).value = album.name;
    (<HTMLImageElement>document.getElementById('display-img')).src = './assets/img/albums/' + album.imageName;
    (<HTMLInputElement>document.getElementById('img-name')).value = album.imageName;
    (<HTMLInputElement>document.getElementById('u-album-price')).value = album.price;

    this.selArt = album.artists.substring(13);
    this.selSty = album.types.substring(11);
  }

  updateAlbum() {
    var id = (<HTMLInputElement>document.getElementById('u-album-id')).value;
    var name = (<HTMLInputElement>document.getElementById('u-album-name')).value;
    var oldImage = (<HTMLInputElement>document.getElementById('img-name')).value;
    var priceString = (<HTMLInputElement>document.getElementById('u-album-price')).value;
    var boxArtString = (<HTMLSelectElement>document.getElementById('u-album-artist')).value;
    var boxStyString = (<HTMLSelectElement>document.getElementById('u-album-style')).value;

    var price = parseFloat(priceString);
    var boxArt = '/api/artists/' + boxArtString;
    var boxSty = '/api/types/' + boxStyString;

    var data = { 'artists' : boxArt, 'types' : boxSty , 'name' : name, 'imageName' : this.fileName , 'price' : price };

    this.AlbService.updataAlbum(id, data)
    .subscribe((data : {}) => {
      this.readAlbums()
    });

    this.deleteFile(oldImage);

    this.sendFile();
  }



  pressDelAlbum(album : any) {
    document.getElementById('show-del-album').innerHTML = album.name;
    (<HTMLInputElement>document.getElementById('id-del-album')).value = album.id;
    (<HTMLInputElement>document.getElementById('img-album')).value = album.imageName;
  }

  deleteAlbum() {
    var id = (<HTMLInputElement>document.getElementById('id-del-album')).value;

    var imageName = (<HTMLInputElement>document.getElementById('img-album')).value;

    this.AlbService.deleteAlbum(id)
    .subscribe((data : {}) => {
      this.readAlbums()
    });

    this.deleteFile(imageName);
  }

  deleteFile(name : string) {
    let formData = new FormData();
    var blob = new Blob();

    formData.append('image', blob, name);

    this.http.post('http://localhost:3001/api/delete', formData)
    .subscribe((response) => {
      console.log('response received is ', response);
    })
  }
}

