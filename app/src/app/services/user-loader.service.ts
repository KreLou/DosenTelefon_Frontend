import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserItem } from '../models/user-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoaderService {

  constructor(private http: HttpClient) { }


  public postNewUser(myUsername: string, myEmail: string) {
    const user = new UserItem();
    user.username = myUsername;
    user.email = myEmail;
    user.active = true;
    user.newToken = '',
    user.token = '',
    user.topicsNotOK = [];
    user.topicsOK = [];
    user.uuid = '';
    console.log('user: ', user);
    return this.http.post<UserItem>(environment.apiURL + 'users', user);
  }

  public getUserItem(uuid: string): Observable<UserItem> {
    return this.http.get<UserItem>(environment.apiURL + 'users/' + uuid);
  }


}
