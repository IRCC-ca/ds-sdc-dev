import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SideNavConfig } from '@app/components/side-nav/side-nav.config';
import { ISideNavDataInterface } from '@app/components/side-nav/side-nav.model';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from 'src/app/share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { TranslatedPageComponent } from '../translated-page-component';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  slugTitleURLConfig,
  slugTitleURLType
} from '@app/components/title-slug-url/title-slug-url.component';
@Component({
  selector: 'app-for-developers',
  templateUrl: './for-developers.component.html',
  styleUrls: ['./for-developers.component.scss'],
  providers: [SlugifyPipe]
})
export class ForDevelopersComponent implements OnInit, TranslatedPageComponent {
  rightNavData: ISideNavDataInterface[];
  rightNavDataRaw: string[] = [
    // list of all right nav items
    'Overview.DeveloperHeading',
    'Developers.GetStartedHeading',
    'Developers.UsageHeading',
    'Developers.FontAwesomeHeading',
    'Developers.ReleasesHeading'
  ];
  altLangLink = 'forDesigners';

  paragraph1: string = 'npm install --save-dev @ircc-ca/ds-sdc-core';
  paragraph2: string = "@use '~@ircc-ca/ds-sdc-core/index' as ircc-ds; @include ircc-ds.theme-init-required(ircc-ds.palette-journeylab(),default, large, light); @include ircc-ds.element-styles();';"
  paragraph3: string = '<script src="https://kit.fontawesome.com/8e16e0c619.js" crossorigin="anonymous"></script>';
  paragraph4: string = 'npm install @ircc-ca/ds-sdc-core@patch';

  overViewDeveloperSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Overview.DeveloperHeading'
  };
  developerStartedSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Developers.GetStartedHeading'
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private navBarConfig: SideNavConfig,
    private clipboard: Clipboard
  ) {
    this.rightNavData = navBarConfig.getRightNavBarConfig(this.rightNavDataRaw);
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }

  copyToClipboard(item: string) {
    this.clipboard.copy(item);
  }
}
