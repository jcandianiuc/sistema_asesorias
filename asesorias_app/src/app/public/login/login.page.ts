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
  private email: string;
  private password: string;
  private credentials: Observable<any>;

  constructor(public menuCtrl: MenuController, private authService: AutenticationService, private nav: NavController, private userService: UserService) {}
  ngOnInit() {

  }

  login() {
    const { email, password } = this;

    this.credentials = this.authService.login(email, password);
    this.credentials.subscribe((res) => {
      const { data } = res;
      console.log(data);
    });
  }

  ionViewDidLeave() {
    // alert('Adios!');
  }
}
