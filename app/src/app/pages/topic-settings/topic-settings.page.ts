import { Component, OnInit } from '@angular/core';

export enum Status {
  Ok = 0, 
  Neutral = 1,
  NOK = 2
}

export class Topic {
  Title: string;
  Status: Status
}


@Component({
  selector: 'app-topic-settings',
  templateUrl: './topic-settings.page.html',
  styleUrls: ['./topic-settings.page.scss'],
})
export class TopicSettingsPage implements OnInit {

  public TopicsOk = ['Autos', 'Essen'];
  public TopicsNok = ['Corona'];

  public all_tops = ['Autos', 'Essen', 'Corona', 'Reisen', 'Test 2', 'Keine Ahnung', 'Etwas langes'];

  public topics: Topic[];

  constructor() { }

  ngOnInit() {
    this.topics = [];
    this.all_tops.forEach(name => {
      const isOk = this.TopicsOk.indexOf(name) >= 0;
      const isNok = this.TopicsNok.indexOf(name) >= 0;
      const status = isOk ? Status.Ok : isNok ? Status.NOK : Status.Neutral;
      console.log(name, ' is ', status, ' isOk: ', isOk, ' nok: ', isNok);
      this.topics.push({Status: status, Title: name});
    })
    console.log(this.topics);
  }


  onSaveClick() {
    console.log(this.topics);
    const topicsOK = this.topics.filter(x => x.Status == Status.Ok).map(x => x.Title);
    const topicsNok = this.topics.filter(x => x.Status == Status.NOK).map(x => x.Title);

    console.log('Ok: ', topicsOK);
    console.log('Nok: ', topicsNok);

  }

  onChange(event: CustomEvent, topic: Topic) {
    const value = event.detail.value as number;

    this.topics.filter(x => x.Title ==topic.Title)[0].Status = +value;
  }

}
