import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private url = 'http://localhost:3011/aulas';
  constructor(private http: HttpClient) { }

  getClassrooms(): Observable<any> {
    return this.http.get(this.url).pipe(
      map((results) => { 
        return results;
      })
    );
  }
}
