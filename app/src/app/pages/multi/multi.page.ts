import { Component, OnInit } from '@angular/core';
import { CallManagerService } from 'src/app/services/call-manager.service';
import { CallStatus } from 'src/app/enums/call-status.enum';

@Component({
  selector: 'app-multi',
  templateUrl: './multi.page.html',
  styleUrls: ['./multi.page.scss'],
})
export class MultiPage implements OnInit {

  status: CallStatus;

  constructor(private callManager: CallManagerService) { }

  ngOnInit() {
    this.callManager.Status.subscribe(status => this.status = status);
  }

}
