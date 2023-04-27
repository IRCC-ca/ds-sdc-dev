import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SideNavConfig } from '@app/components/side-nav/side-nav.config';
import { ISideNavDataInterface } from '@app/components/side-nav/side-nav.model';
import { slugTitleURLConfig, slugTitleURLType } from '@app/components/title-slug-url/title-slug-url.component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { SafeHtmlPipe } from '@app/share/safe-html.pipe';
import { TranslateService } from '@ngx-translate/core';
import { TranslatedPageComponent } from '../translated-page-component';
import { breakpoint, breakpoints, colorSample, colorSamples, spacingsFixed, typography, typographys } from './utilities.constant';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
  providers: [SlugifyPipe, SafeHtmlPipe],
  encapsulation: ViewEncapsulation.None
})
export class UtilitiesComponent implements OnInit, TranslatedPageComponent { 
  rightNavData: ISideNavDataInterface[];
  rightNavDataRaw: string[] = [ // list of all right nav items
    'Utilities.Heading',
    'LeftSideNav.sub-titles.colours',
    'LeftSideNav.sub-titles.typography',
    'Utilities.SpacingHeading',
    'Utilities.BreakpointsHeading',
  ]
  colorSample: colorSample[] = colorSamples;
  spacingSample: number[] = spacingsFixed;
  breakpoints: breakpoint[] = breakpoints;
  typographySample: typography[] = typographys;
  altLangLink = 'utilities'; // ROUTE translation path

  utilitiesHeadingSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Utilities.Heading'
  };
  utilitiesColorSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Utilities.ColourHeading'
  };
  utilitiesTypographySlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Utilities.TypographyHeading'
  };
  utilitiesSpacingSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Utilities.SpacingHeading'
  };
  utilitiesBreakpointsSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Utilities.BreakpointsHeading'
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private navBarConfig: SideNavConfig
  ) {
    this.rightNavData = navBarConfig.getRightNavBarConfig(this.rightNavDataRaw);
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
