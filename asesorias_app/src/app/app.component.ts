import { Component } from '@angular/core';
import { PageItem } from 'src/app/core/interfaces/PageItem.interfaces';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AutenticationService } from './services/autentication.service';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  pages: PageItem[] = [
    {
      title: 'Modificar Perfil',
      url: '/members/profile',
      icon: 'contact'
    },
    {
      title: 'Programas Académicos',
      url: '/members/dashboard',
      icon: 'briefcase'
    },
    {
      title: 'Crear Disponibilidad',
      url: '/members/availability',
      root: true,
      icon: 'create'
    }
  ];

  selectedPath = '';

  constructor(
    private authService: AutenticationService,
    private router: Router,
    private menuCtrl: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nav: NavController
  ) {
    this.initializeApp();
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    } );
  }

  async navigate(page: PageItem) {
    await this.nav.navigateForward(page.url);
  }

  initializeApp() {
    this.menuCtrl.enable(false, 'menu1');
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show(); // hide()
      this.authService.AutenticationService.subscribe( state => {
        console.log('Auth changed: ', state);
        if (state) {
          this.router.navigate(['members', 'menu']);
        } else {
          this.router.navigate(['login']);
          this.menuCtrl.enable(false);

        }
      });
    });
  }

  logout() {
    this.authService.logout();
    this.menuCtrl.close();
  }

}
