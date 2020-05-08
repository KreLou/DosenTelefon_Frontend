import { Component, OnInit, ViewChild, OnDestroy, Renderer2, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { DeckLoaderService } from 'src/app/services/deck-loader.service';
import { PopoverController, IonSelect } from '@ionic/angular';
import { DeckSelectionComponent } from './deck-selection/deck-selection.component';
import { CallManagerService } from 'src/app/services/call-manager.service';

export class Deck{
  title: string;
  cards: string[];
}
export class Card {
  text: string;
  
}

@Component({
  selector: 'app-call',
  templateUrl: './call.page.html',
  styleUrls: ['./call.page.scss'],
})
export class CallPage implements OnInit, OnDestroy, AfterViewInit {

  public decks: Deck[] = [];

  public demo_decks: Deck[] =  [
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
  public activeDeckString: string = 'Lustig'
  //public partner = this.callManager.currentCall.name;
  public partner = 'Test';
  
  public time = 0;
  private interval: any;

  moveOutWidth: number; // value in pixels that a card needs to travel to dissapear from screen
  shiftRequired: boolean; // state variable that indicates we need to remove the top card of the stack
  transitionInProgress: boolean; // state variable that indicates currently there is transition on-going


  @ViewChild('selectionList', {static: true}) selectionList: IonSelect;
  @ViewChildren('ionCard') cardElements: QueryList<ElementRef>;
  cardElementArray: Array<any>;

  constructor(private deckLoader: DeckLoaderService,
    private callManager: CallManagerService,
    private popoverCtrl: PopoverController,
    private renderer: Renderer2) { }


  ngAfterViewInit(): void {
    this.moveOutWidth = document.documentElement.clientWidth * 1;
    this.cardElementArray = this.cardElements.toArray();
    this.cardElements.changes.subscribe(()=>{
      this.cardElementArray = this.cardElements.toArray();
    })
  }

  ngOnInit() {
    this.deckLoader.getDecks().subscribe(data => {
      data.forEach(element => {
        this.deckLoader.getDeck(element).subscribe(questions => {
          const deck: Deck = {
            cards: questions,
            title: element
          };
          this.decks.push(deck);
        })
      });

    })
    this.interval = setInterval(() => this.time = this.time + 1, 1000);
  }

  handlePan(event) {
    if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0) || !this.decks[this.activeDeckIndex].cards.length) return;

    if (this.transitionInProgress) {
      this.handleShift();
    }

    this.renderer.addClass(this.cardElementArray[0].el, 'moving');

    let xMulti = event.deltaX * 0.03;
    let yMulti = event.deltaY / 80;
    let rotate = xMulti * yMulti;

    this.renderer.setStyle(this.cardElementArray[0].el, 'transform', 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)');

    this.shiftRequired = true;
  }

  handlePanEnd(event) { 

    if (!this.decks[this.activeDeckIndex].cards.length) return;

    this.renderer.removeClass(this.cardElementArray[0].el, 'moving');

    let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (keep) {

      this.renderer.setStyle(this.cardElementArray[0].el, 'transform', '');
      this.shiftRequired = false;

    } else {

      let endX = Math.max(Math.abs(event.velocityX) * this.moveOutWidth, this.moveOutWidth);
      let toX = event.deltaX > 0 ? endX : -endX;
      let endY = Math.abs(event.velocityY) * this.moveOutWidth;
      let toY = event.deltaY > 0 ? endY : -endY;
      let xMulti = event.deltaX * 0.03;
      let yMulti = event.deltaY / 80;
      let rotate = xMulti * yMulti;

      this.renderer.setStyle(this.cardElementArray[0].el, 'transform', 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)');

      this.shiftRequired = true;

      //this.emitChoice(!!(event.deltaX > 0), this.cards[0]);
    }
    this.transitionInProgress = true;
  }

  onManualMove() {
    this.decks[this.activeDeckIndex].cards.shift();
  }

  handleShift() {
    this.transitionInProgress = false;
    if (this.shiftRequired) {
      this.shiftRequired = false;
      this.decks[this.activeDeckIndex].cards.shift();
    };
  };

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

  onClose() {
    this.callManager.onHangUp();
  }

  onNewCardClick() {
    const newText = this.decks[this.activeDeckIndex].cards.shift();
    this.activeDeckString = this.decks[this.activeDeckIndex].title;
    this.activeTitle = newText;
    console.log('new: ', newText);
  }

}
