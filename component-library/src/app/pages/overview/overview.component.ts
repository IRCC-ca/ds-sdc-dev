import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../../share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { TranslatedPageComponent } from '../translated-page-component';

import {
  slugTitleURLType,
  slugTitleURLConfig
} from '@app/title-slug-url/title-slug-url.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [SlugifyPipe]
})
export class OverviewComponent implements OnInit, TranslatedPageComponent {
  currentLanguage: string = '';
  altLangLink = 'overview'; // ROUTE translation path
  slugTitleURLType = slugTitleURLType;

  overViewSlugTitleURLConfig: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Overview.Heading.Title',
    route: 'Overview.Route',
    anchor: 'Overview.Heading.Anchor'
  };
  contactSlugTitleURLConfig: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Overview.Contact.Title',
    route: 'Overview.Route',
    anchor: 'Overview.Contact.Anchor'
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private slugify: SlugifyPipe
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit(): void {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
