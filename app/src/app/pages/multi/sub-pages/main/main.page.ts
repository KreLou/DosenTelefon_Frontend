import { Component, OnInit } from '@angular/core';
import { UserItem } from 'src/app/models/user-item';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserLoaderService } from 'src/app/services/user-loader.service';
import { WebSocketConnectionService } from 'src/app/services/web-socket-connection.service';
import { CallManagerService } from 'src/app/services/call-manager.service';
import { CallStatus } from 'src/app/enums/call-status.enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  private userItem: UserItem;

  public defaultValue: 'yes' | 'no' | 'neutral' = 'neutral';

  constructor(public authService: AuthService, private router: Router, private userLoader: UserLoaderService, private callManager: CallManagerService) { }

  ngOnInit() {
    this.authService.UserItem.subscribe(user => {
      this.userItem = user;
      if (user) {
        if (this.userItem.topicsOK.indexOf('corona') >= 0) {
          this.defaultValue = 'yes'
        } else if (this.userItem.topicsNotOK.indexOf('corona') >= 0) {
          this.defaultValue = 'no';
        }
      }
    });
  }

  onSelectClick() {
    this.callManager.initSession(this.userItem);
  }

  onPreferenceChange(event) {

    var okTopics = []
    var nokTopics = [];
    switch (event.detail.value) {
      case 'no': nokTopics = ['corona']; break;
      case 'yes': okTopics = ['corona']; break;
    }
    this.userItem.topicsNotOK = nokTopics;
    this.userItem.topicsOK = okTopics;
    this.userLoader.updateUserItem(this.userItem).subscribe(data => {
      this.authService.UserItem.next(data);
    })
  }

}
