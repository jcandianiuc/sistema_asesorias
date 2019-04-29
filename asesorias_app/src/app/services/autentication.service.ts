import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


// Constante para token for autentication
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  AutenticationService = new BehaviorSubject(false);

  constructor(public menuCtrl: MenuController, private storage: Storage, private plt: Platform) {
    // 4 if platform is ready checktoken
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
  // 1
  login() {
    return this.storage.set(TOKEN_KEY, 'Arely 12345' ).then(() => {
      this.AutenticationService.next(true);
    });
  }
  // 2
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.AutenticationService.next(false);
    });
  }

  // 3
  isAuthenticated() {
    return this.AutenticationService.value;
  }
  // 5
  checkToken() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.AutenticationService.next(true);
      }
    });
  }

}
