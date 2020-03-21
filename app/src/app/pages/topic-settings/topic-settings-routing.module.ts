import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopicSettingsPage } from './topic-settings.page';

const routes: Routes = [
  {
    path: '',
    component: TopicSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicSettingsPageRoutingModule {}
