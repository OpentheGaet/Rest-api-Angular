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
  album : any;
  artists : Artists;
  styles : any;
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
    .then(data => this.artists = data);
  }

  readStyles() {
    this.StyService.getStyles()
    .then(data => this.styles = data);
  }

  onChooseFile(event) {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }

  createAlbum(form) {
    let name = form.controls.cname.value;
    let priceString = form.controls.cprice.value;
    let boxArtString = form.controls.cartist.value;
    let boxStyString = form.controls.cstyle.value;

    let price = parseFloat(priceString);
    let boxArt = '/api/artists/' + boxArtString;
    let boxSty = '/api/types/' + boxStyString;

    let data = { 'artists' : boxArt,
                 'types' : boxSty ,
                 'name' : name,
                 'imageName' : this.fileName,
                 'price' : price };

    this.AlbService.createAlbum(data)
    .subscribe((data : {}) => {
      document.getElementById('close-cre-modal').click();
      form.form.reset();
      this.readAlbums();
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
    this.album = album;
    this.selArt = album.artists.substring(13);
    this.selSty = album.types.substring(11);
  }

  updateAlbum(form) {

    let name = form.controls.uname.value;
    let priceString = form.controls.uprice.value;
    let boxArtString = form.controls.uartist.value;
    let boxStyString = form.controls.ustyle.value;

    let price = parseFloat(priceString);
    let boxArt = '/api/artists/' + boxArtString;
    let boxSty = '/api/types/' + boxStyString;

    let oldImage = (<HTMLInputElement>document.querySelector('#old-img-name')).value;
    let id = (<HTMLInputElement>document.querySelector('#u-album-id')).value;

    let data = { 'artists' : boxArt, 'types' : boxSty , 'name' : name, 'imageName' : this.fileName , 'price' : price };

    this.AlbService.updateAlbum(id, data)
    .subscribe((data : {}) => {
      document.getElementById('close-upd-modal').click();
      form.form.reset();
      this.readAlbums();
    });

    this.deleteFile(oldImage);

    this.sendFile();
  }

  pressDelAlbum(album : any) {
    this.album = album;
  }

  deleteAlbum() {
    var id = (<HTMLInputElement>document.getElementById('id-del-album')).value;
    var imageName = (<HTMLInputElement>document.getElementById('img-album')).value;

    this.AlbService.deleteAlbum(id)
    .subscribe((data : {}) => {
      document.getElementById('close-cre-modal').click();
      this.readAlbums();
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

