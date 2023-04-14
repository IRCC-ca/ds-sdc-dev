import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ISideNavDataInterface} from "../../side-nav/side-nav.model";
import {TranslateService} from "@ngx-translate/core";
import {SideNavConfig} from "../../side-nav/side-nav.config";
import {SlugifyPipe} from "../../share/pipe-slugify.pipe";
import {
  breakpoint,
  breakpoints,
  colorSample,
  colorSamples,
  spacingsFixed,
  typography,
  typographys
} from "./utilities.constant";
import {SafeHtmlPipe} from "../../share/safe-html.pipe";
import {LangSwitchService} from "../../share/lan-switch/lang-switch.service";
import {TranslatedPageComponent} from "../translated-page-component";

@Component({
  selector: 'app-page-token',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
  providers: [SlugifyPipe, SafeHtmlPipe],
  encapsulation: ViewEncapsulation.None
})
export class PageUtilitiesComponent implements OnInit, TranslatedPageComponent {
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

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private navBarConfig: SideNavConfig
  ) {
    this.rightNavData = navBarConfig.getRightNavBarConfig(this.rightNavDataRaw);
  }

  ngOnInit(): void {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
