import { Component, OnInit } from '@angular/core';
import { Styles } from 'src/app/models/Styles/Styles.model';
import { StylesService } from 'src/app/models/Styles/Styles.service';

@Component({
  selector: 'app-ad-styles',
  templateUrl: './ad-styles.component.html',
  styleUrls: ['./ad-styles.component.css']
})
export class AdminStylesComponent implements OnInit {

  styles : Styles[];

  constructor(private StySerices : StylesService) { }

  ngOnInit() {
    this.readStyles();
  }

  readStyles() {
    this.StySerices.getStyles()
    .subscribe(data => this.styles = data);
  }

  createStyle() {
    var name = (<HTMLInputElement>document.getElementById('cstyle-name')).value;

    const style = {'name' : name };

    this.StySerices.createStyle(style).subscribe((data : {}) => {
      this.readStyles();
      (<HTMLInputElement>document.getElementById('cstyle-name')).value = '';
      document.getElementById('close-cre-modal').click();
    });
  }

  pressDelStyle(style : any) {
    document.getElementById('show-del-style').innerHTML = style.name;
    (<HTMLInputElement>document.getElementById('id-del-style')).value = style.id
  }

  pressUpdStyle(style : any) {
    (<HTMLInputElement>document.getElementById('ustyle-name')).value = style.name;
    (<HTMLInputElement>document.getElementById('id-upd-style')).value = style.id
  }

  updateStyle() {
    var id = (<HTMLInputElement>document.getElementById('id-upd-style')).value;
    var name = (<HTMLInputElement>document.getElementById('ustyle-name')).value;

    const style = {'name' : name};

    this.StySerices.updateStyle(id, style).subscribe((data : {}) => {
      this.readStyles();
      (<HTMLInputElement>document.getElementById('ustyle-name')).value = '';
      document.getElementById('close-upd-modal').click();
    });
  }

  deleteStyle() {
    var id = (<HTMLInputElement>document.getElementById('id-del-style')).value;

    this.StySerices.deleteStyle(id).subscribe((data : {}) => {
      this.readStyles();
      document.getElementById('close-del-modal').click();
    });
  }
}
