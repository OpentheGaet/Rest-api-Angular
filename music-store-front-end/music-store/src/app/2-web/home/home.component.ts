import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/Auth.service';
import { WebHeaderComponent } from '../1-template/1-header/web-header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService, WebHeaderComponent]
})

@Injectable()
export class HomeComponent implements OnInit {

  isLoggedIn : boolean = localStorage.loggedIn;
  user : any;
  slider : any;
  action : any;
  lap : number = 1;
  tabImg = [
    { name : 'music' },
    { name : 'music1' },
    { name : 'music2' }
  ];
  btnPlay : any;
  btnPause : any;
  btnPrev : any;
  btnNext : any;
  sliderDiv : any;
  connectForm : any

  constructor(private formBuilder : FormBuilder,
              private authService : AuthService,
              private header : WebHeaderComponent) {}

  ngOnInit() {
    this.setSliderDiv();
    this.setSliderButtons();
    this.initSliderInterval();
    this.checkConnection();
    this.setForm();
  }

  /*-------------------------- Code For slider ----------------------------- */

  setSliderDiv() {
    this.sliderDiv = document.getElementById('slider');
  }

  setSliderButtons() {
    this.btnPlay = document.getElementById('play');
    this.btnPause = document.getElementById('pause');
    this.btnPrev = document.getElementById('before');
    this.btnNext = document.getElementById('next');
  }

  initSliderInterval() {
    if (!this.slider) {
      this.slider = setInterval(
        () => {
           this.startSlider();
        }, 5000
      );
    }
    return this.slider;
  }

  destroySliderInterval() {
    clearInterval(this.slider);
    return this.slider = null;
  }

  startSlider() {
    if (this.lap <= 2) {
      this.changePics(this.lap);
      this.lap++;
    } else {
      this.lap = 0;
      this.startSlider();
    }
  }

  playSlider() {
    this.btnPlay.style.display = 'none';
    this.btnPause.style.display = 'inline';

    this.initSliderInterval();
  }

  pauseSlider() {

    this.btnPause.style.display = 'none';
    this.btnPlay.style.display = 'inline';

    this.destroySliderInterval();
  }

  blockButtons(button : any) {
    button.disabled = true;
    button.style.backgroundColor = 'grey';
    this.action = setTimeout(
      () => {
        button.disabled = false;
        button.style.backgroundColor = 'rgb(255, 255, 255)';
      }, 3000);
  }

  goToBeforePics() {
    this.blockButtons(this.btnPrev);
    this.btnPause.style.display = 'none';
    this.btnPlay.style.display = 'inline';

    this.destroySliderInterval();

    this.lap--;
    this.changePics(this.lap);
  }

  goToNextPics() {
    this.blockButtons(this.btnNext);
    this.btnPause.style.display = 'none';
    this.btnPlay.style.display = 'inline';

    this.destroySliderInterval();

    this.lap++;
    this.changePics(this.lap);
  }

  checkCounter(counter : number) {
    if (counter < 0) {
      this.lap = 2;
    } else if (counter > 2) {
      this.lap = 0;
    } else {
      this.lap = counter
    }
    return this.lap;
  }

  changePics(counter : number) {
    var i : any = this.checkCounter(counter);

    this.sliderDiv.style.cssText =
    'background-image: url(./assets/img/slider/'+ this.tabImg[i].name +'.png);'
   +'transition : background-image 2s;';
  }

  /*-------------------------- End ----------------------------- */

  /*-------------------------- Code for form connect ----------------------------- */

   showForm() {
    if (!this.isLoggedIn) {
      (<HTMLInputElement>document.getElementById('email')).value= '';
      (<HTMLInputElement>document.getElementById('password')).value='';
    }
    document.getElementById('press-connect').style.display='none';
    document.getElementById('canceld-connect').style.display='inline';

    document.getElementById('component-connector').style.display='inline';
   }

   hideForm() {
    document.getElementById('canceld-connect').style.display='none';
    document.getElementById('press-connect').style.display='inline';

    document.getElementById('component-connector').style.display='none';
   }

   setForm() {
      this.connectForm = this.formBuilder.group({
        'email' : ['', [Validators.required, Validators.email]],
        'password' : ['', Validators.required]
      });
   }

   checkConnection () {
    if (localStorage.token) {
      this.isLoggedIn = true;
      this.user = {
        'id' : localStorage.userId,
        'name' : localStorage.name,
        'firstname' : localStorage.firstname
      };
      this.header.checkConnection();
    }
    return;
  }

   logIn() {
     let email = this.connectForm.value.email;
     let pass  = this.connectForm.value.password;

     this.checkConnection();

     this.authService.setUser(email, pass, null);
     return
    }

   logOut() {
     this.authService.destroyUser();
     this.isLoggedIn = false;
   }
  /*-------------------------- End ----------------------------- */
}
