import { Injectable } from '@angular/core';
import { UserItem } from '../models/user-item';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Auth, WebSocketConnectionItem } from '../models/web-socket-connection-item';
import { WebSocketResponse } from '../models/web-socket-response';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketConnectionService {

  public ResponseList: BehaviorSubject<WebSocketResponse> = new BehaviorSubject(null);

  private socket: any;

  private webAuth: Auth;

  private pingInterval: any;

  constructor(private authService: AuthService) {
    this.authService.UserToken.subscribe(myToken => {
      const myUUID = this.authService.getUUID();
      this.webAuth = {token: myToken, uuid: myUUID};
    });

    this.socket = new WebSocket(environment.socket_url);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onopen = this.onOpen;
    this.socket.onclose = this.onClose;
    console.log('Socket: ', this.socket);

    this.pingInterval = setInterval(() => {
      //this.sendPing()
    }, 1000 * 60); //Every 1 Minute
   }
  
  public onOpen(event) {
    console.log('[WebSocket] is now open');
  }
  public onError(event) {
    console.log('[WebSocket] onError: ', event);
  }

  public onClose(event) {
    console.log('WebSocket is closed now');
  }

  public sendPing() {
    console.log('Send Ping to WebSocket');
    this.sendInternalCommand('ping', null);
  }

   private onMessage(message: MessageEvent) {
     const body: WebSocketResponse = JSON.parse(message.data);
     console.log('New Message: ', body);
     this.ResponseList.next(body);
   }

  public sendConnection(user: UserItem): Promise<any> {
    return new Promise((resolve, reject) => {

      try {
        this.sendInternalCommand('link_user', user);
        resolve();
      } catch(e) {
        console.error(e);
        reject();
      }
    })
  }


  private sendInternalCommand(command: string, data: any) {
    const message: WebSocketConnectionItem = {
      version: 1,
      event: command,
      auth: this.webAuth,
      body: data
    };
    const string_message = JSON.stringify(message);
    console.log('Send: ', string_message);
    this.socket.send(string_message);
  }
}
