import { Component, OnInit } from '@angular/core';
import { Artists } from 'src/app/models/Artists/Artists.model';
import { ArtistsService } from 'src/app/models/Artists/Artists.service';

@Component({
  selector: 'app-ad-artists',
  templateUrl: './ad-artists.component.html',
  styleUrls: ['./ad-artists.component.css']
})
export class AdminArtistsComponent implements OnInit {

  artists : Artists;

  constructor(private ArtService : ArtistsService) { }

  ngOnInit() {
    this.readArtists();
  }

  readArtists() {
    this.ArtService.getArtists()
    .then(
      data => {
        this.artists = data;
      },
      msg => {
        alert(msg);
      }
    );
  }

  createArtist(artist) {
    let name = artist.form.value.cartist;

    const artists = {'name' : name };

    this.ArtService.createArtist(artists).then((
      data : {}) => {
        this.readArtists();
        artist.form.reset();
        document.getElementById('close-cre-modal').click();
    });
  }

  pressDelArtist(artist : any) {
    document.getElementById('show-del-artist').innerHTML = artist.name;
    (<HTMLInputElement>document.getElementById('id-del-artist')).value = artist.id
  }

  pressUpdArtist(artist : any) {
    (<HTMLInputElement>document.getElementById('uartist-name')).value = artist.name;
    (<HTMLInputElement>document.getElementById('id-upd-artist')).value = artist.id
  }

  updateArtist(artist : any) {
    let name = {'name' : artist.form.value.uartist}
    let id = (<HTMLInputElement>document.getElementById('id-upd-artist')).value;


    this.ArtService.updateArtist(id, name).then((
      data : {}) => {
        this.readArtists();
        artist.form.reset();
        document.getElementById('close-upd-modal').click();
    });
  }

  deleteArtist() {
    let id = (<HTMLInputElement>document.getElementById('id-del-artist')).value;

    this.ArtService.deleteArtist(id).then((
      data : {}) => {
        this.readArtists();
        document.getElementById('close-del-modal').click();
    });
  }

}
