import { Component, OnInit } from '@angular/core';
import { UserItem } from 'src/app/models/user-item';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  private userItem: UserItem;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.UserItem.subscribe(user => this.userItem = user);

  }

  onSelectClick() {

  }

  onPreferenceChange(event) {
    console.log(event);
    console.log('user: ', this.userItem);

    var okTopics = []
    var nokTopics = [];

    switch (event.detail.value) {
      case 'no': nokTopics = ['corona']
      case 'yes': okTopics = ['corona']
    }
    console.log('NOK: ', nokTopics);
    this.userItem.topicsNotOK = nokTopics;
    this.userItem.topicsOK = okTopics;
    console.log('User: ', this.userItem);
  }

}
