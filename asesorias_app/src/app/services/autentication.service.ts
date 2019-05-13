import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AES_GCM } from 'asmcrypto.js/dist_es5/aes/gcm';
import { Pbkdf2HmacSha256 } from 'asmcrypto.js/dist_es5/pbkdf2/pbkdf2-hmac-sha256';
import { bytes_to_string, string_to_bytes } from 'asmcrypto.js/dist_es5/other/utils';

// Constante para token for autentication
const TOKEN_KEY = '';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  private url = 'http://localhost:3011/user';
  private aesKEy: string;
  private salt = string_to_bytes('Ucaribe salt');

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

  login(username: string, password: string) {
    return this.http.get(`${this.url}/login?email=${username}&password=${password}`).pipe(
      map((results) => {
          this.storage.set('user', results['data']);

          return this.storage.set(TOKEN_KEY, results['data']['password']).then(() => {
            this.AutenticationService.next(true);
          }, (error) =>{
            console.log(error);
          });
      })
    )
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
