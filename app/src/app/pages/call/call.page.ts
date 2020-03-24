import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DeckLoaderService } from 'src/app/services/deck-loader.service';
import { PopoverController, IonSelect } from '@ionic/angular';
import { DeckSelectionComponent } from './deck-selection/deck-selection.component';

export class Deck{
  title: string;
  cards: string[];
}

@Component({
  selector: 'app-call',
  templateUrl: './call.page.html',
  styleUrls: ['./call.page.scss'],
})
export class CallPage implements OnInit, OnDestroy {

  public decks: Deck[] =  [
    {
      title: 'Lustig', 
      cards: [
        'Was hälst du von der Klopapier-Debatte?',
        'Was fehlt dir momentan am meisten? (lustig bitte!)',
        'Welches lustige Hamsterverhalten ist dir beim letzten Einkauf aufgefallen?'
      ]
    }, {
      title: 'Philosophisch',
      cards: [
        'Was ist dein Lieblings-Witz?',
        'Was ist dir heute Witziges passiert?'
      ]
    }
  ]

  public activeDeckIndex = 0;

  public activeTitle: string;
  public activeDeckString: string;
  public partner = "Doris"

  public time = 0;
  private interval: any;


  @ViewChild('selectionList', {static: true}) selectionList: IonSelect;

  constructor(private deckLoader: DeckLoaderService, private popoverCtrl: PopoverController) { }

  ngOnInit() {
    console.log('Decks: ', this.decks);
    this.deckLoader.getDecks().subscribe(data => {
      console.log('Decks: ', data);
    })
    this.interval = setInterval(() => this.time = this.time + 1, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  async onDeckChangeClick(ev: any) {
    this.selectionList.open();
  }

  onSelectionChange(event){
    const deckName = event.detail.value;
    this.activeDeckIndex = this.decks.map(x => x.title).indexOf(deckName);
  }

  onNewCardClick() {
    const newText = this.decks[this.activeDeckIndex].cards.shift();
    this.activeDeckString = this.decks[this.activeDeckIndex].title;
    this.activeTitle = newText;
    console.log('new: ', newText);
  }

}
