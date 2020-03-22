import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-deck-selection',
  templateUrl: './deck-selection.component.html',
  styleUrls: ['./deck-selection.component.scss'],
})
export class DeckSelectionComponent implements OnInit {

   @Input() decks: string[];
   @Input() currentID: number;

  constructor() { }

  ngOnInit() {
    console.log('Decks: ', this.decks);
  }

}
