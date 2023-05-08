import { Component, OnInit } from '@angular/core';
import { TranslatedPageComponent } from '@app/pages/translated-page-component';
import { LangSwitchService, TranslateService } from '@app/share/templates/parent-template.module';
import { IIconConfig } from 'dist/ircc-ds-angular-component-library/lib/shared/icon/icon.component';

@Component({
  selector: 'app-info-text-small',
  templateUrl: './info-text-small.component.html',
  styleUrls: ['./info-text-small.component.scss']
})
export class InfoTextSmallComponent implements OnInit, TranslatedPageComponent {
  circleInfoIcon: IIconConfig = {
    FA_keywords: 'f05a',
    ariaLabel: ''
  };

  altLangLink = 'infoTextSmall';

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
  ) {}

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
