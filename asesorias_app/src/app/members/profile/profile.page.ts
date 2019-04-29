import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AvailabilityService } from '../availability/availability.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private menuCtrl: MenuController, private service: AvailabilityService) { }

  ngOnInit() {
        this.menuCtrl.enable(true);

  }

}
