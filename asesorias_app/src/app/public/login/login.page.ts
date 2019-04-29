import { Component, OnInit } from '@angular/core';
import { AutenticationService } from '../../services/autentication.service';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public menuCtrl: MenuController, private authService: AutenticationService, private nav: NavController) {}

  ngOnInit() {

  }

  login() {
    // alert('Hola!'); //Este método muentra un cuadro de alerta con mensaje específico
    this.authService.login();
  }

  ionViewDidLeave() {
    // alert('Adios!');
  }
}
