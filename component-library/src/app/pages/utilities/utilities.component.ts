import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { slugTitleURLConfig } from '@app/components/title-slug-url/title-slug-url.component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { SafeHtmlPipe } from '@app/share/safe-html.pipe';
import { TranslateService } from '@ngx-translate/core';
import { TranslatedPageComponent } from '../translated-page-component';
import {
  breakpoint,
  breakpoints,
  colorSample,
  colorSamples,
  spacingsFixed,
  typography,
  typographys
} from './utilities.constant';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
  providers: [SlugifyPipe, SafeHtmlPipe],
  encapsulation: ViewEncapsulation.None
})
export class UtilitiesComponent implements OnInit, TranslatedPageComponent {
  rightNavData: string[] = [
    // list of all right nav items
    'Utilities.Heading',
    'General.ColourHeading',
    'General.TypographyHeading',
    'Utilities.SpacingHeading',
    'Utilities.BreakpointsHeading'
  ];
  colorSample: colorSample[] = colorSamples;
  spacingSample: number[] = spacingsFixed;
  breakpoints: breakpoint[] = breakpoints;
  typographySample: typography[] = typographys;
  altLangLink = 'utilities'; // ROUTE translation path

  utilitiesHeadingSlug: slugTitleURLConfig = {
    title: 'Utilities.Heading',
    heading: 'h1'
  };
  utilitiesColorSlug: slugTitleURLConfig = {
    title: 'General.ColourHeading'
  };
  utilitiesTypographySlug: slugTitleURLConfig = {
    title: 'General.TypographyHeading'
  };
  utilitiesSpacingSlug: slugTitleURLConfig = {
    title: 'Utilities.SpacingHeading'
  };
  utilitiesBreakpointsSlug: slugTitleURLConfig = {
    title: 'Utilities.BreakpointsHeading'
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
