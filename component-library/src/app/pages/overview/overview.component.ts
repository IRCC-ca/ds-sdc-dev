import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../../share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { TranslatedPageComponent } from '../translated-page-component';
import { HttpClient } from '@angular/common/http';

import {
  slugTitleURLType,
  slugTitleURLConfig,
  slugAnchorType
} from '@app/components/title-slug-url/title-slug-url.component';

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
  url = '{{INSERT_URL_HERE}}';

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
          resolve(data.body);
        },
        error: (error) => {
          reject(`There was an error!: ${error}`);
        }
      });
    });
  }
}
