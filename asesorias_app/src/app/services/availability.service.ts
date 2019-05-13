import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ActiveEvent } from 'src/app/models/event';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private url = 'http://localhost:3011/availabilities';
  private events: ActiveEvent[];

  constructor(private http: HttpClient, private storage: Storage) { }

  createAvailability(data: Object): Observable<any> {
    return this.http.post(`${this.url}`, data).pipe(
      tap((results) => { 
        return results;
      })
    );
  }

  getAvailabilities(): Observable<any> {
    return this.http.get(`${this.url}`).pipe(
      map((results) => {
        const tmpEvents: ActiveEvent[] = [];

        results['data'].forEach((event) => {
          event.fecha = moment(new Date(event.fecha)).format('YYYY-MM-DD');
          tmpEvents.push(event);
        });
        
        return {
          'events': tmpEvents,
          'user': this.storage.get('user').then((value) => {
            return value;
          }),
        };
      })
    )
  }
}
