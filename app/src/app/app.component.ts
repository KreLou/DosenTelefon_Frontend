import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ResolveStart, RouterEvent } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  showGreenBox: boolean = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private auth: AuthService
  ) {
    this.initializeApp();
    this.router.events.subscribe((event: RouterEvent) => {
      if  (event instanceof ResolveStart) {
        this.showGreenBox = event.url.toLowerCase() != '/login'
      };
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.auth.initializeDefaultUserItem(); //Load User from Server
    });
  }

  ngOnInit() {}
}
