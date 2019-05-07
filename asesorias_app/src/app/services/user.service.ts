import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3011/';

  constructor(private http: HttpClient) {}

  initApi() {
    this.http.get(this.url).subscribe((response) => {
      console.log(response);
    });
  }
}
