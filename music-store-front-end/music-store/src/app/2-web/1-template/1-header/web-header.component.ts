import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/Auth.service';

@Component({
  selector: 'web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.css'],
  providers: [AuthService]
})

@Injectable()
export class WebHeaderComponent implements OnInit{
  title = 'music-store';

  isLoggedIn : boolean = false;

  constructor(private authService : AuthService) {}

  ngOnInit() {
    if (this.checkUrl() !== false) {
      this.checkConnection();
    }
  }

  checkUrl(id : number  = null) {
    const urlHome = 'http://127.0.0.1:4200/home';
    const urlAlb  = 'http://127.0.0.1:4200/album';

    let url = document.location.href.substring(0, 27);

    if (url == urlHome || url == urlAlb) {
      return false;
    }
  }

  checkConnection () {
    if (localStorage.token) {
      this.authService.setUserToken();
      this.authService.releaseTokenByTime();
    }
  }

}
