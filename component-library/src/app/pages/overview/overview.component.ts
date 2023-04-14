import {Component, OnInit} from '@angular/core';
import { ISideNavDataInterface } from "../../side-nav/side-nav.model";
import { TranslateService } from "@ngx-translate/core";
import { SideNavConfig } from "../../side-nav/side-nav.config";
import {SlugifyPipe} from "../../share/pipe-slugify.pipe";
import {LangSwitchService} from "../../share/lan-switch/lang-switch.service";
import {TranslatedPageComponent} from "../translated-page-component";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [SlugifyPipe]
})
export class OverviewComponent implements OnInit, TranslatedPageComponent {
  rightNavData: ISideNavDataInterface[];
  currentLanguage : string = '';
  altLangLink = 'overview'; // ROUTE translation path

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private slugify: SlugifyPipe,
    private navBarConfig : SideNavConfig
  ) {
    this.rightNavData = navBarConfig.getRightNavBarConfig([]);
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit(): void {
    this.lang.setAltLangLink(this.altLangLink);
  }

}
