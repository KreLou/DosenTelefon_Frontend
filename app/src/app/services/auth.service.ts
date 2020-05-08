import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserItem } from '../models/user-item';
import { UserLoaderService } from './user-loader.service';
import { PeerJSCallService } from '../_services/peer-jscall.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public UserToken: BehaviorSubject<string> = new BehaviorSubject(null);

  public UserItem: BehaviorSubject<UserItem> = new BehaviorSubject(null);


  constructor(private userLoader: UserLoaderService) {

    if (localStorage.getItem('token')) {
      const foundToken = localStorage.getItem('token');
      this.setToken(foundToken);
    }

   }

  public initializeDefaultUserItem() {
    if (this.UserToken.getValue()) {
      this.userLoader.getUserItem(this.getUUID()).subscribe(data => {
        this.UserItem.next(data);
        console.log('Load new user from server: ', data);
      })
    }
  }

   public isLoggedIn() {
     return this.UserToken.asObservable();
   }

  public setToken(token: string) {
    localStorage.setItem('token', token);
    this.UserToken.next(token);
  }

  public setUUID(uuid: string) {
    localStorage.setItem('uuid', uuid);
  }
  public getUUID() {
    return localStorage.getItem('uuid');
  }
}
