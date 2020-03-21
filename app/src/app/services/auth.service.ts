import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public UserToken: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor() {
    if (localStorage.getItem('token')) {
      const foundToken = localStorage.getItem('token');
      console.log('FoundToken: ', foundToken);
      this.setToken(foundToken);
    }
   }

  public setToken(token: string) {
    localStorage.setItem('token', token);
    this.UserToken.next(token);
  }
}
