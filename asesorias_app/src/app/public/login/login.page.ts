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
  private username: string;
  private password: string;

  constructor(public menuCtrl: MenuController, private authService: AutenticationService, private nav: NavController, private userService: UserService) {}
  ngOnInit() {

  }

  login() {
    const { username, password } = this;
    /* this.authService.login(username, password).subscribe((res) => {
      console.log(res);
    }); */
    this.authService.login(username, password);
  }

  ionViewDidLeave() {
    // alert('Adios!');
  }
}
