import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserItem } from '../models/user-item';
import { UserLoaderService } from './user-loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public UserToken: BehaviorSubject<string> = new BehaviorSubject(null);

  public UserItem: BehaviorSubject<UserItem> = new BehaviorSubject(null);


  constructor(private userLoader: UserLoaderService) {

    this.UserToken.subscribe(token => {
      if (token) {
        console.log('Handle new Token: ', token);
        this.userLoader.getUserItem(this.getUUID()).subscribe(data => {
          console.log('UserData: ', data);
        })
      }
    })

    if (localStorage.getItem('token')) {
      const foundToken = localStorage.getItem('token');
      console.log('FoundToken: ', foundToken);
      this.setToken(foundToken);
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
