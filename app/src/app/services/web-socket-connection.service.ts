import { Injectable } from '@angular/core';
import { UserItem } from '../models/user-item';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Auth, WebSocketConnectionItem } from '../models/web-socket-connection-item';
import { WebSocketResponse } from '../models/web-socket-response';
import { BehaviorSubject } from 'rxjs';
import { CallManagerService } from './call-manager.service';
import { CallEvent } from '../models/Events/call-event';

@Injectable({
  providedIn: 'root'
})
export class WebSocketConnectionService {

  public ResponseList: BehaviorSubject<WebSocketResponse> = new BehaviorSubject(null);

  private socket: any;

  private webAuth: Auth;
  //uuid:token -> Das dann als base64 decoden

  private pingInterval: any;

  constructor(private authService: AuthService) {
    this.authService.UserToken.subscribe(myToken => {
      const myUUID = this.authService.getUUID();
      this.webAuth = {token: myToken, uuid: myUUID};
    });
  }

   /**
    *  Connect the websocket to the server
    * @author KreLou
    */
  public connect() {
    var promise = new Promise((resolve, reject) => {

      this.socket = new WebSocket(environment.socket_url);
      this.socket.onmessage = this.onMessage.bind(this);
      this.socket.onopen = this.onOpen.bind(this);
      this.socket.onclose = this.onClose.bind(this);
      console.log('Socket: ', this.socket);
      resolve();
    })
    return promise;
  }
  
  public onOpen(event) {
    console.log('[WebSocket] is now open');
  }
  public onError(event) {
    console.log('[WebSocket] onError: ', event);
  }

  public onClose(event) {
    console.log('[WebSocket] is closed now');
    const response = {body: null, event: 'close', version: null} as WebSocketResponse;
    this.ResponseList.next(response);
  }

  public sendPing() {
    this.sendInternalCommand('ping', null);
  }

   private onMessage(message: MessageEvent) {
     const body: WebSocketResponse = JSON.parse(message.data);
     console.log('onNewWebsocketMessage: ', body);
     this.ResponseList.next(body);
   }

  public sendCallAccept() {
    return new Promise((resolve, reject) => {
      try {
        this.sendInternalCommand('call_accepted', null);
        resolve();
      } catch(e) {
        console.error(e);
        reject();
      }
    });
  }

  public sendCallEnded() {
    return new Promise((resolve, reject) => {
      try {
        this.sendInternalCommand('call_end', null);
        resolve();
      } catch(e) {
        console.error(e);
        reject();
      }
    })
  }

  public sendCallDeclined(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.sendInternalCommand('call_declined', null);
        resolve();
      } catch(e) {
        console.error(e);
        reject();
      }
    })
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
    this.waitForConnectedState().then(() => {
      
      console.log('Send: ', string_message);
      this.socket.send(string_message);
    })
  }

  private waitForConnectedState() {
    var promise = new Promise((resolve, reject) => {
      var loop = 0;
      var interval = setInterval(() => {
        if (this.socket.readyState == 1) {
          clearInterval(interval);
          resolve();
        }
        loop = loop +1;
        if (loop >= 10) {
          clearInterval(interval);
          reject();
        }
      }, 500)
    });
    return promise;
  }

  public disconnect() {
    this.socket.close();
  }
}
