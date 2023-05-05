import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ISideNavDataInterface } from '@app/components/side-nav/side-nav.model';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { TranslatedPageComponent } from '../translated-page-component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { SideNavConfig } from '@app/components/side-nav/side-nav.config';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  providers: [SlugifyPipe]
})
export class ButtonComponent implements OnInit, TranslatedPageComponent {
  altLangLink = 'buttons';
  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
  ) {
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
