import { Component, OnInit } from '@angular/core';
import { ArtistsService } from '../../models/Artists/Artists.service';
import { Artists } from '../../models/Artists/Artists.model';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  artists : Artists[];

  constructor(private ArtService : ArtistsService) { }

  ngOnInit() {
    this.ArtService.getArtists()
    .subscribe(data => this.artists = data);
  }

}
