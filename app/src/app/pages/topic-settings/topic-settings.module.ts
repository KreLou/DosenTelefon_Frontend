import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopicSettingsPageRoutingModule } from './topic-settings-routing.module';

import { TopicSettingsPage } from './topic-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicSettingsPageRoutingModule
  ],
  declarations: [TopicSettingsPage]
})
export class TopicSettingsPageModule {}
