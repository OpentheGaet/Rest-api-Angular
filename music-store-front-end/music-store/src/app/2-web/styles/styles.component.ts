import { Component, OnInit } from '@angular/core';
import { Styles } from 'src/app/models/Styles/Styles.model';
import { StylesService } from 'src/app/models/Styles/Styles.service';

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.css']
})
export class StylesComponent implements OnInit {

  styles : Styles[];

  constructor(private StyService : StylesService) { }

  ngOnInit() {
    this.readStyle();
  }

  readStyle() {
    this.StyService.getStyles()
    .then(data => this.styles = data);
  }

}
