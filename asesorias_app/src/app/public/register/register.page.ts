import { Component, OnInit } from '@angular/core';
import { AutenticationService } from '../../services/autentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AutenticationService, private router: Router) { }

  ngOnInit() {
  }

  register(form) {
    //this.authService.register(form.value)
  }

}
