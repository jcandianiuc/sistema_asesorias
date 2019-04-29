import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  passedId = null;

  public form = [
    { val: 'General', isChecked: true },
    { val: 'Específico', isChecked: false },
  ];

  constructor(private navParams: NavParams, private modalControler: ModalController) { }

  ngOnInit() {
    this.passedId = this.navParams.get('custom_id');
  }

  closeModal() {
    this.modalControler.dismiss();
  }

  createDisp() {
    alert('TODO:Crear evento');
  }

}
