import { PopoverPage } from './../../components/popover/popover.page';
import { ModalPage } from './../../components/modal/modal.page';
import { AvailabilityService } from 'src/app/services/availability.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavParams, PopoverController, NavController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.page.html',
  styleUrls: ['./availability.page.scss'],
})
export class AvailabilityPage implements OnInit {
  results: Observable<any>
  events: any[] = [];
  user: Object = {};
  value = 0;
  passedIs = null;
  public cerrar = false;

  constructor(private menuCtrl: MenuController, private availabilityService: AvailabilityService,
              private nav: NavController, private modalcontroler: ModalController, private popoverControler: PopoverController) { }

  async ngOnInit() {
    this.menuCtrl.enable(true);
    await this.getActiveEvents();
  }

  async getActiveEvents() {
    this.results = this.availabilityService.getAvailabilities();
    this.results.subscribe((res) => {
      this.events = res.events;
      res.user.then((val) =>{
        this.user = val;
      })
    });
  }

  pushPage() {
    this.nav.navigateForward(`/avalability/${this.value}`);
  }

  async openModal() {
    const modal = await this.modalcontroler.create({
      component: ModalPage,
      componentProps: {
        custom_id: this.value,
        translucent: true
      }
    });
    modal.present();
  }

  async openPopover() {
    const popover = await this.popoverControler.create({
      component: PopoverPage,
      componentProps: {
        custom_id: this.value,
        trunslucent: true
      },
    });
    popover.present();
  }

  delete() {
    // alert('TODO: Cerrar evento');
    console.log('borrar');
  }

  moreInfo() {
    alert('TODO: Lista de descarga');
  }

}
