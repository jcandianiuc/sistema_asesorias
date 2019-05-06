import { Component, OnInit } from '@angular/core';
import { AutenticationService } from '../../services/autentication.service';
import { NavController, MenuController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  results: Observable<any>;

  constructor(public menuCtrl: MenuController, private authService: AutenticationService, private nav: NavController, private userService: UserService) {}

  ngOnInit() {

  }

  login() {
    // alert('Hola!'); //Este método muentra un cuadro de alerta con mensaje específico
    this.authService.login();
  }

  ionViewDidLeave() {
    // alert('Adios!');
  }

  initApi() {
    this.results = this.userService.initApi();

    this.results.subscribe((res) => {
      console.log(res);
    });
  }
}
