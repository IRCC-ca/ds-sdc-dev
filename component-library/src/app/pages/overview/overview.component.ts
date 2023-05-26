import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../../share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { TranslatedPageComponent } from '../translated-page-component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [SlugifyPipe]
})
export class OverviewComponent implements OnInit, TranslatedPageComponent {
  currentLanguage: string = '';
  altLangLink = 'overview';

  headers = {};
  body = { title: 'body_title_field' };
  url =
    'https://flyu2zvymhha3je5vnlx7g5z5u0ixvml.lambda-url.ca-central-1.on.aws/';

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private slugify: SlugifyPipe,
    private http: HttpClient
  ) {
    this.currentLanguage = translate.currentLang;
  }

  async ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    console.log(await this.sendRequest());
  }

  async sendRequest() {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.url, this.body).subscribe({
        next: (data) => {
          resolve(data.event.body);
        },
        error: (error) => {
          reject(`There was an error!: ${error}`);
        }
      });
    });
  }
}
