import { Component, OnInit } from '@angular/core';
import { TranslatedPageComponent } from '../translated-page-component';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import {
  slugTitleURLConfig,
} from '@app/components/title-slug-url/title-slug-url.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit, TranslatedPageComponent {
  contactSubTitleSlug: slugTitleURLConfig = {
    title: 'LeftSideNav.sub-titles.contact'
  };
  altLangLink = 'contact';

  constructor(private lang: LangSwitchService) {}

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
