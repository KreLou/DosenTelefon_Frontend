import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisclaimerComponent } from '../StaticPages/disclaimer/disclaimer.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [DisclaimerComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    DisclaimerComponent
  ],
  entryComponents: [
    DisclaimerComponent
  ]
})
export class StaticPagesModule { }
