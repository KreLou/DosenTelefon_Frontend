import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss'],
})
export class DisclaimerComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async dismiss() {
    const modal = await this.modalController.getTop();
    if (modal) {
      modal.dismiss();
    }
  }

}
