import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/Auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
  providers: [AuthService]
})

@Injectable()
export class AdminHeaderComponent implements OnInit {
  title = 'admin';
  sideBar : any;
  buttonShow : any;
  buttonHide : any;


  constructor(private authService : AuthService, private router : Router) {}

  ngOnInit() {
    this.getElements();
    this.releaseToken();
  }

  getElements() {
    this.sideBar = document.getElementById('sidebar-wrapper');
    this.buttonShow = document.getElementById('menu-show');
    this.buttonHide = document.getElementById('menu-hide');
  }

  showMenu() {
    this.buttonShow.style.display = 'none';
    this.buttonHide.style.display = 'inline';

    this.sideBar.style.cssText = `
      margin-left : 0rem;
      -webkit-transition : margin .25s ease-out;
      -moz-transition : margin .25s ease-out;
      -o-transition : margin .25s ease-out;
      transition : margin .25s ease-out;
    `;
  }

  hideMenu() {
    this.buttonHide.style.display = 'none';
    this.buttonShow.style.display = 'inline';

    this.sideBar.style.cssText = `
      margin-left: -15rem;
      -webkit-transition: margin .25s ease-out;
      -moz-transition: margin .25s ease-out;
      -o-transition: margin .25s ease-out;
      transition: margin .25s ease-out;
    `;
  }

  releaseToken() {
    this.authService.setUserToken();
    this.authService.releaseTokenByTime();
  }

  logOut() {
    this.authService.destroyUser();
  }
}
