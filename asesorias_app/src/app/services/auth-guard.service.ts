import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AutenticationService } from './autentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private authService: AutenticationService) { }

  canActivate(): boolean {
    return this.authService.isAuthenticated();
  }

}
