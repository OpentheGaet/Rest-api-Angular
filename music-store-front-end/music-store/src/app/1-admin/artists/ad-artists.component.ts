import { Component, OnInit } from '@angular/core';
import { Artists } from 'src/app/models/Artists/Artists.model';
import { ArtistsService } from 'src/app/models/Artists/Artists.service';

@Component({
  selector: 'app-ad-artists',
  templateUrl: './ad-artists.component.html',
  styleUrls: ['./ad-artists.component.css']
})
export class AdminArtistsComponent implements OnInit {

  artists : Artists[];

  constructor(private ArtService : ArtistsService) { }

  ngOnInit() {
    this.readArtists();
  }

  readArtists() {
    this.ArtService.getArtists()
    .subscribe(data => this.artists = data);
  }

  createArtist() {
    var name = (<HTMLInputElement>document.getElementById('cartist-name')).value;

    const artists = {'name' : name };

    this.ArtService.createArtist(artists).subscribe((data : {}) => {
      this.readArtists();
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

  updateArtist() {
    var id = (<HTMLInputElement>document.getElementById('id-upd-artist')).value;
    var name = (<HTMLInputElement>document.getElementById('uartist-name')).value;

    const artist = {'name' : name};

    this.ArtService.updateArtist(id, artist).subscribe((data : {}) => {
      this.readArtists();
      document.getElementById('close-upd-modal').click();
    });
  }

  deleteArtist() {
    var id = (<HTMLInputElement>document.getElementById('id-del-artist')).value;

    this.ArtService.deleteArtist(id).subscribe((data : {}) => {
      this.readArtists();
      document.getElementById('close-del-modal').click();
    });
  }

}
