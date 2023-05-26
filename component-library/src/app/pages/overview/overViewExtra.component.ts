import { Component, OnInit } from '@angular/core';
import { OverviewService } from './overview.service';

@Component({
  selector: 'app-overview-extra',
  template: ` <h3>Example of syncing</h3>
    <p>
      <code>{{ responseService | json }}</code>
    </p>
    <p><button (click)="sendtoBackend()">Send Backend Command</button></p>
    <div></div>`
})
export class overviewExtraComponent implements OnInit {
  currentLanguage: string = '';
  altLangLink = 'overview';

  headers = {};
  body = { title: 'body_title_field' };
  url =
    'https://flyu2zvymhha3je5vnlx7g5z5u0ixvml.lambda-url.ca-central-1.on.aws/';

  responseService: any;

  constructor(private overviewService: OverviewService) {}

  async ngOnInit() {
    this.getDataService();
    this.body = { title: 'Calls can be synced!' };

    setTimeout(() => {
      this.overviewService.getData(this.url, this.body);
    }, 5000);
  }

  sendtoBackend() {
    this.body = { title: Math.floor(Math.random() * 5000).toString() };
    this.overviewService.getData(this.url, this.body);
  }

  getDataService() {
    this.overviewService.dataResponseObs$.subscribe((response: any) => {
      if (response) {
        this.responseService = response;
      }
    });
  }
}
