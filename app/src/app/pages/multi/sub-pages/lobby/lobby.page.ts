import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { WebSocketConnectionService } from 'src/app/services/web-socket-connection.service';
import { CallRequestBody } from 'src/app/models/web-socket-response';
import { CallManagerService } from 'src/app/services/call-manager.service';
import { CallStatus } from 'src/app/enums/call-status.enum';

export class IncommingCall {
  name: string;
  peerId: string;
  callOther: boolean;
  otherAccepted: boolean = false;
}

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit, OnDestroy {

  waitingStrings: string[] = [
    'Bei DosenTelefon handelt es sich um einen GesprächsClienten, der Privatpersonen für kurze Gespräche miteinander verbindet. Es ist keine psychosoziale Beratung und stellt keine Therapiemöglichkeit da. Bitte verhaltet euch dementsprechend.',
    'Dass DosenTelefon gut funktionieren kann, hängt vor allem von euch ab! Haltet euch an normale Verhaltensregeln und geht so mit anderen Personen um, wie ihr das auch im realen Leben tun würdet.',
    'Eure Gesprächsanteile sollten gleichberechtigt verteilt sein, lasst eure Dialogpartner ausreden und hört ihnen aktiv und interessiert zu. Vermeidet bitte die Bewertung von persönlichen Einstellungen.',
    'Damit ihr alle eine gute Gesprächsatmosphäre genießen könnt, nehmt euch für die Nutzung und die Gespräche auf DosenTelefon Zeit und vermeidet andere Ablenkungen. ',
    'Außerdem unterstützt DosenTelefon nicht das Verbreiten von Inhalten, welche rassistisch, sexistisch, homophob, xenophob, ableistisch oder in anderer Weise ausgrenzend sind.',
    'Über DosenTelefon entstehen inspirierende Gespräche zwischen Fremden.',
    'Zusammen ist man weniger allein - ein Gespräch pro Tag mit DosenTelefon senkt das Gefühl der Isolation und Einsamkeit.',
    'DosenTelefon lässt neue Freundschaften entstehen und eröffnet neue Horizonte in den Gesprächen',
    'DosenTelefon stärkt den gesellschaftlichen Zusammenhalt'
  ]

  private interval: any;
  public counter: number = 0;

  constructor(private router: Router,private callManager: CallManagerService) { }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.changeDisplayCounter();
    }, 7000);
  }

  changeDisplayCounter() {
    this.counter = this.counter + 1;
    if (this.counter >= this.waitingStrings.length) {
      this.counter = this.counter - this.waitingStrings.length;
    }
  }



  ngOnDestroy() {
    clearInterval(this.interval);
  }

  onAbortClick() {
    console.log('Abort');
    this.callManager.onAbort();
  }

}
