import { Component, OnInit } from '@angular/core';
import { SideNavConfig } from '@app/components/side-nav/side-nav.config';
import { ISideNavDataInterface } from '@app/components/side-nav/side-nav.model';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from 'src/app/share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { TranslatedPageComponent } from '../translated-page-component';
import { Clipboard } from '@angular/cdk/clipboard';
import { slugTitleURLConfig } from '@app/components/title-slug-url/title-slug-url.component';
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
    'Developers.ThemesHeading',
    'Developers.FontAwesomeHeading',
    'Developers.ReleasesHeading'
  ];
  altLangLink = 'forDevelopers';

  paragraph1: string = `@use '~@ircc-ca/ds-sdc-core/index' as ircc-ds;\n
    @include ircc-ds.theme-init-required(ircc-ds.palette-journeylab(), default, large);\n
    @include ircc-ds.element-styles();`;
  paragraph2: string =
    '<script src="https://kit.fontawesome.com/8e16e0c619.js" crossorigin="anonymous"></script>';
  paragraph3: string = 'npm install @ircc-ca/ds-sdc-core@patch';
  placeholder: string = '<code block/>';
  overViewDeveloperSlug: slugTitleURLConfig = {
    title: 'Overview.DeveloperHeading',
    heading: 'h1'
  };
  developerStartedSlug: slugTitleURLConfig = {
    title: 'Developers.GetStartedHeading'
  };
  developerUsageSlug: slugTitleURLConfig = {
    title: 'Developers.UsageHeading'
  };
  developerThemesSlug: slugTitleURLConfig = {
    title: 'Developers.ThemesHeading'
  };
  developerFontAwesomeSlug: slugTitleURLConfig = {
    title: 'Developers.FontAwesomeHeading'
  };
  developerReleasesSlug: slugTitleURLConfig = {
    title: 'Developers.ReleasesHeading'
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
