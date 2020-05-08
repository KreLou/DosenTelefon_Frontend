import { Injectable } from '@angular/core';
//import Peer from 'peerjs';

declare var Peer: any;

@Injectable({
  providedIn: 'root'
})
export class PeerJSCallService {

  private myPeer = null;
  private myStream: MediaStream;

  myEL: HTMLMediaElement;
  myPartnerElement: HTMLMediaElement;

  public connection;

  public myCall = null;


  constructor() {
  }
  public setPartnerElement(element) {
    this.myPartnerElement = element;
    console.log('Set Partner-element: ', element);
  }

  /* Gets **/
  public getPeerID() {
    return this.myPeer.id;
  }

  public async init(callHandler: (call: any) => void, onDisconnectHandler: () => void) {
    if (this.myPeer == null) {
      console.log('Zeit für ein neeues Peer')
      this.myPeer = new Peer();

      this.myStream = await this.getAudio();
      console.log('myStream: ', this.myStream);
    }

    this.myPeer.on('open', (id) => this.printPeerEvent('open', id));
    this.myPeer.on('connection', (data) => this.printPeerEvent('connection', data));
    this.myPeer.on('call', (data) => this.printPeerEvent('call', data));
    this.myPeer.on('close', () => this.printPeerEvent('close', null));
    this.myPeer.on('disconnected', () => this.printPeerEvent('disconnected', null));
    this.myPeer.on('error', (data) => this.printPeerEvent('error', data));
  
    this.myPeer.on('disconnected', onDisconnectHandler);
    this.myPeer.on('call', (call) => {
      this.myCall = call;
    })
    this.myPeer.on('call', callHandler);
      /*console.log('Incomming call via peerjs', call);
      call.answer(this.myStream);
      call.on('stream', (stream) => {
        console.log('Receiver gets an stream: ', stream);
        this.myPartnerElement.srcObject = stream;
      })*/
    console.log('Peer: ', this.myPeer);
  }

  private printPeerEvent(event: string, body: any | null) {
    console.log('Peer-Event ' + event + ': ', body);
  }

  public onCloseCall() {
    this.myCall.close();
    console.log('my Call closed: ', this.myCall);
  }


  public async connect(peerID: string, callback: any) {

    this.myCall = this.myPeer.call(peerID, await this.getAudio());
    this.myCall.on('close', () => {
      console.log('Close connection');
    });
    console.log('mycall: ', this.myCall);
    this.myCall.on('stream', (stream) => {
      console.log('Caller gets an stream', stream);
      this.myPartnerElement.srcObject = stream;
      console.log(this.myPartnerElement);
    })
    this.myCall.on('stream', callback);
  }

  public registerReceiver(cb: (mediaStream: MediaStream) => void, cbClose: () => any) {
    this.myPeer.on('call', async mediaConnection => {
      mediaConnection.answer(await this.getAudio());
      mediaConnection.on('stream', (stream) => {
        console.log('mediaConnection -> stream: ', stream);
        cb(stream);
      });
      mediaConnection.on('close', () => {
        console.log('Close')
      })
    })
  }

  public async getAudio(): Promise<MediaStream> {
    return await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
  }

  public answerIncommingCall() {
      console.log('Answer incomming call', this.myCall);
      this.myCall.answer(this.myStream);
      
  }

}
