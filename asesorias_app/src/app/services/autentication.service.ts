import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';


// Constante para token for autentication
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  private api = 'http://localhost:3011/';
  res: Observable<any>;
  AutenticationService = new BehaviorSubject(false);

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private plt: Platform,
    private http: HttpClient) {
      this.plt.ready().then(() => {
        this.checkToken();
      });
  }

  login(username, password) {
    /* return this.http.get(this.api).pipe(
      map(results => {
        console.log('Data', results);
        return results;
      })
    ); */
    /* this.http.get(this.api).subscribe((response) => {
      console.log(response);
    }); */
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
