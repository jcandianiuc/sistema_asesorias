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

  getClassrooms(queryParam): Observable<any> {
    return this.http.get(`${this.url}?${queryParam}`).pipe(
      map((results) => { 
        return results;
      })
    );
  }
}
