import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, observable } from 'rxjs';
import { ClassroomService } from 'src/app/services/classroom.service';
import * as moment from 'moment';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  passedId = null;
  results: Observable<any>;
  aulas: string[];

  buildings = [
    { value: 'A' },
    { value: 'B' },
    { value: 'C' },
    { value: 'E' },
  ];

  aula: string;
  fecha: Date;
  timeInit: Date;
  timeFin: Date;

  constructor(
    private navParams: NavParams,
    private modalControler: ModalController,
    private classroomService: ClassroomService) { }

  ngOnInit() {
    this.passedId = this.navParams.get('custom_id');
  }

  closeModal() {
    this.modalControler.dismiss();
  }

  getClassrooms(building) {
    const param = 'edificio='
    const val = building.detail.value;
    this.results = this.classroomService.getClassrooms(`${param+val}`);
      this.results.subscribe((res) => {
        this.aulas = this.validateResponse(res);
      });
  }

  createDisp() {
    const tmpFecha = new Date(this.fecha).toISOString().split('T')[0];

    console.log('Fecha: ', tmpFecha);
  }

  private validateResponse(res) {
    if (res.error) {
      Observable.throw(res.flash)
    } else if (res.data.lenght === 0) {
      Observable.throw('El servicio no está disponible, intente más tarde');
    } else {
      return res.data;
    }
  }
}
