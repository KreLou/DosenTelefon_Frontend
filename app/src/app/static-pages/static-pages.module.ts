import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisclaimerComponent } from '../StaticPages/disclaimer/disclaimer.component';
import { IonicModule } from '@ionic/angular';
import { PrivacyComponent } from '../StaticPages/privacy/privacy.component';



@NgModule({
  declarations: [DisclaimerComponent, PrivacyComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    DisclaimerComponent,
    PrivacyComponent
  ],
  entryComponents: [
    DisclaimerComponent,
    PrivacyComponent
  ]
})
export class StaticPagesModule { }
