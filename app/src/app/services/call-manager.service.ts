import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CallEvent } from '../models/Events/call-event';
import { WebSocketConnectionService } from './web-socket-connection.service';
import { IncommingCall } from '../pages/multi/sub-pages/lobby/lobby.page';
import { CallRequestBody } from '../models/web-socket-response';
import { AlertController } from '@ionic/angular';
import { CallStatus } from '../enums/call-status.enum';
import { PeerJSCallService } from '../_services/peer-jscall.service';
import { UserItem } from '../models/user-item';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CallManagerService {

  public Events: BehaviorSubject<CallEvent> = new BehaviorSubject(null);
  public Status: BehaviorSubject<CallStatus> = new BehaviorSubject(CallStatus.NoCall);

  public audioElement: any;

  public currentCall: IncommingCall;

  constructor(
    private webSocket: WebSocketConnectionService,
    private alertController: AlertController,
    private peerJS: PeerJSCallService) { 
    this.webSocket.ResponseList.subscribe(this.onHandleWebsocketResponse.bind(this));
    this.Status.subscribe((status) => {
      if (status === CallStatus.NoCall) {
        this.currentCall = null;
        if (this.audioElement) {
          this.audioElement.srcObject = null;
        }
        console.log('reset currentcall');
      }
    })
    this.peerJS.init(function (call: any)  {
      console.log('I got a call', call);
      this.onIncommingCall(this.currentCall);
      call.on('stream', (stream) => {
        this.audioElement.srcObject = stream;
      })
    }.bind(this), function() {
      console.log('On disconnected');
      console.log('Status:', this.Status.value);
      if (this.Status.value === 1) {
        console.log('leave lobby');
        this.Status.next(CallStatus.NoCall);
      }
    }.bind(this));
  }
  
  onHandleWebsocketResponse(event) {
    if (event) {
      console.log('Websocket-Response: ', event);

      if (event.event == 'call_request') {
        
        const callBody = event.body as CallRequestBody
        console.log('New call');
        const otherUser = callBody.username ? callBody.username : 'Anonymous';

        const call: IncommingCall = {name: otherUser, peerId: callBody.peerId, callOther: callBody.caller, otherAccepted: false};
        this.currentCall = call;


        console.log('On new call: ', call);
        if (call.callOther) {
          // The other person calls me, so I have to wait.
          this.onIncommingCall(call);
        } else {

          // I have to call the other person.
          console.log('New Receiving call');
          this.peerJS.registerReceiver(async (mediaStream) => {
            console.log('mediastream: ', mediaStream);
            this.audioElement.srcObject = mediaStream;
            console.log(this.audioElement);
          }, () => {
            console.log('Now its closed');
          })
        }
      }
      else if (event.event == 'close') {
        if (this.Status.value != CallStatus.InCall) {
          this.Status.next(CallStatus.NoCall);
        }
      } else if (event.event == 'call_declined') {
        this.Status.next(CallStatus.NoCall);
      }
      else if (event.event == 'call_end') {
        if (this.Status.value == CallStatus.InCall) {
          this.onHangUp();
        }
      }
      else if (event.event == 'call_accepted') {
        this.currentCall.otherAccepted = true;
        this.checkCallStatus();
      }
    }
  }

  /**
   * Inits session and send start to the server
   * @author KreLou
   */
  public initSession(user: UserItem) {
    const peerID = this.peerJS.getPeerID();
    user.peerId = peerID;
    this.initAudio();
    this.webSocket.connect().then(() => {

      this.webSocket.sendConnection(user).then(() => {
        this.Status.next(CallStatus.Waiting);
      })
    })

  }


  /**
   * Determines whether hang up the call
   * @author KreLou
   */
  public onHangUp() {
    console.log('End Call')
    this.peerJS.onCloseCall();
    this.webSocket.sendCallEnded().then(() => {
      this.Status.next(CallStatus.NoCall);
    })
  }

  /**
   * Determines whether abourt on lobby
   * @author KreLou
   */
  public onAbort() {
    this.webSocket.disconnect();
  }


  
  async onIncommingCall(call: IncommingCall) {
    call.name = call.name.charAt(0).toUpperCase() + call.name.slice(1);
    const header = call.callOther ? 'Partner gefunden' : 'Eingehender Anruf';
    const subheader = call.callOther ? `${call.name} passt zu deiner Einstellung` : `${call.name} ruft dich an`; 
    console.log('new Incomming call', call);
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            this.onDeclineCall(call);
          }
        },{
          text: 'Annehmen',
          handler: () => {
            this.onAcceptCall(call);
          }
        }
      ]
    })
    await alert.present();
  }

  private initAudio() {
    this.audioElement = document.createElement('audio');
    this.audioElement.autoplay = true;
    
    
    document.body.appendChild(this.audioElement);
    console.log('Audio: ', this.audioElement);

    this.peerJS.setPartnerElement(this.audioElement);
  }

  private onAcceptCall(call: IncommingCall) {

    this.Status.next(CallStatus.Pending);
    this.webSocket.sendCallAccept();
    if (call.callOther) {
      // I have to call the other participant
      this.peerJS.connect(call.peerId, (call) => {
        console.log('Receive: ', call);
      });
    } else { 
      //I got a call, so i have to answer it
      this.peerJS.answerIncommingCall();
    }

    this.checkCallStatus();
  }

  private checkCallStatus() {
    console.log('Other: ', this.currentCall.otherAccepted);
    console.log('Me:    ', this.Status.value);

    if (this.Status.value == CallStatus.Pending && this.currentCall.otherAccepted) {
      console.log('Both are ok');
      this.Status.next(CallStatus.InCall);
    }
  }

  private onDeclineCall(call: IncommingCall) {
    this.webSocket.sendCallDeclined().then(() => {
      this.Status.next(CallStatus.NoCall);
    })
  }

}