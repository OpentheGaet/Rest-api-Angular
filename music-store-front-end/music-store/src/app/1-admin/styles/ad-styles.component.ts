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
    .then(data => this.styles = data);
  }

  createStyle(style) {
    var name = style.form.value.cstyle;
    const data = {'name' : name };

   this.StySerices.createStyle(data).then((data : {}) => {
      this.readStyles();
      style.form.reset();
      document.getElementById('close-cre-modal').click();
    });
  }

  pressDelStyle(style : any) {
    document.querySelector('#show-del-style').innerHTML = style.name;
    (<HTMLInputElement>document.querySelector('#id-del-style')).value = style.id
  }

  pressUpdStyle(style : any) {
    (<HTMLInputElement>document.querySelector('#ustyle-name')).value = style.name;
    (<HTMLInputElement>document.querySelector('#id-upd-style')).value = style.id
  }

  updateStyle(style : any) {
    let name = {'name' : style.form.value.ustyle};
    let id = (<HTMLInputElement>document.querySelector('#id-upd-style')).value;

    this.StySerices.updateStyle(id, name).then((data : {}) => {
      this.readStyles();
      style.form.reset();
      document.getElementById('close-upd-modal').click();
    });
  }

  deleteStyle() {
    var id = (<HTMLInputElement>document.querySelector('#id-del-style')).value;

    this.StySerices.deleteStyle(id).then((data : {}) => {
      this.readStyles();
      document.getElementById('close-del-modal').click();
    });
  }
}
