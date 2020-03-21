import { Component, OnInit } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DisclaimerComponent } from 'src/app/StaticPages/disclaimer/disclaimer.component';
import { UserLoaderService } from 'src/app/services/user-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginFormGroup: FormGroup;

  constructor(private modalController: ModalController, private userLoader: UserLoaderService) { }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      usernameCtrl: new FormControl(null, []),
      emailCtrl: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  doLogin() {
    if (this.loginFormGroup.valid) {
      const email = this.loginFormGroup.controls['emailCtrl'].value;
      const username = this.loginFormGroup.controls['usernameCtrl'].value;
      console.log('TODO: Register Email: ' + email + ' for user: ' + username);
      this.userLoader.postNewUser(username, email).subscribe(data => {
        console.log(data);
      })
    }
  }

  async onOpenDisclaimer() {
    const modal = await this.modalController.create({
      component: DisclaimerComponent
    });
    return await modal.present();
  }

}
