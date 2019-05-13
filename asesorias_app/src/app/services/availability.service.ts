import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost/8100');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');


let config = { headers: headers };
@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private url = 'https://postman-echo.com/post'

  constructor(private http: HttpClient) { }

  createAvailability(data: Object): Observable<any> {
    return this.http.post(`${this.url}`, data, config).pipe(
      tap((results) => { 
        return results;
      })
    );
  }
}
