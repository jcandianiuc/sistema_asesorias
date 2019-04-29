import { HttpClient } from '@angular/common/http';
import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AutenticationService } from './../../services/autentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  information: any[];
  item: any[];

  automaticClose = false;

  constructor(private menuCtrl: MenuController, private authService: AutenticationService,
              private navCtrl: NavController, private httpClient: HttpClient) {
    httpClient.get('assets/carrersInfo.json')
      .subscribe(data => { // data is already a JSON object
        // tslint:disable-next-line:no-string-literal
        this.information = data['items'];
        // this.information[0].open = true; // Función por trabajar
      });
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  mostrarOpciones($event) {
    console.log($event.target.value);
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
    if (this.automaticClose && this.information[i].open) {
      this.information.filter((item, itemi) => itemi !== i)
        .map(item => item.open = false);
    }
  }

  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  buyItem() {}
}
