import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async dismiss() {
    const modal = await this.modalController.getTop();
    if (modal) {
      modal.dismiss();
    }
  }

}
