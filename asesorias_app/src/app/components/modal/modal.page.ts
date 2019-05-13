import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, observable } from 'rxjs';
import { ClassroomService } from 'src/app/services/classroom.service';
import { AvailabilityService } from 'src/app/services/availability.service';
import * as moment from 'moment';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  passedId = null;
  createAvailability: Observable<any>;
  results: Observable<any>;
  aulas: string[];
  availability: Object;

  buildings = [
    { value: 'A' },
    { value: 'B' },
    { value: 'C' },
    { value: 'E' },
    { value: 'Ingenieria' },
    { value: 'Licenciatura' },
  ];

  aula: string;
  tipoDisponibilidad: string;
  fecha: Date;
  timeInit: Date;
  timeFin: Date;

  constructor(
    private navParams: NavParams,
    private modalControler: ModalController,
    private classroomService: ClassroomService,
    private availabilityService: AvailabilityService) { }

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
    this.availability = this.adaptData();
    this.availability['idUsuario'] = 1;
    this.availability['status'] = 1;
    this.availability['tipoDisponibilidad'] = this.tipoDisponibilidad;
    this.availability['createdAt'] = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    this.availability['createdBy'] = 1;
    
    this.createAvailability = this.availabilityService.createAvailability(this.availability);
    this.createAvailability.subscribe((res) => {
      console.log(res);
    });
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

  private adaptData() {
    return {
      fecha: moment(this.fecha).format('YYYY-MM-DD HH:mm:ss'),
      timeInit: moment(this.timeInit).format('HH:mm:ss'),
      timeFin: moment(this.timeFin).format('HH:mm:ss'),
    };
  }
}
