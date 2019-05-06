import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://127.0.0.1:3011/';

  constructor(private http: HttpClient) { }

  initApi() {
    return this.http.get(`${this.url}`);
  }
}
