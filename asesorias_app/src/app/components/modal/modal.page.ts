import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, observable } from 'rxjs';
import { ClassroomService } from 'src/app/services/classroom.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  passedId = null;
  results: Observable<any>;
  aulas: string[];

  public form = [
    { val: 'General', isChecked: true },
    { val: 'Específico', isChecked: false },
  ];

  constructor(
    private navParams: NavParams,
    private modalControler: ModalController,
    private classroomService: ClassroomService) {
      this.results = this.classroomService.getClassrooms();
      this.results.subscribe((res) => {
        this.aulas = this.validateResponse(res);
      });
     }

  ngOnInit() {
    this.passedId = this.navParams.get('custom_id');
  }

  closeModal() {
    this.modalControler.dismiss();
  }

  createDisp() {
    alert('TODO:Crear evento');
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
