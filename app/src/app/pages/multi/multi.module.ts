import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultiPageRoutingModule } from './multi-routing.module';

import { MultiPage } from './multi.page';
import { LobbyPage } from './sub-pages/lobby/lobby.page';
import { MainPage } from './sub-pages/main/main.page';
import { CallPage } from './sub-pages/call/call.page';
import { DeckSelectionComponent } from './sub-pages/call/deck-selection/deck-selection.component';
import { TimerDisplayPipe } from 'src/app/pipes/timer-display.pipe';
import { PendingPage } from './sub-pages/pending/pending.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultiPageRoutingModule
  ],
  declarations: [
    MultiPage,
    LobbyPage,
    CallPage,
    MainPage,
    PendingPage,
    DeckSelectionComponent,
    TimerDisplayPipe
  ],
  entryComponents: [DeckSelectionComponent]
})
export class MultiPageModule {}
