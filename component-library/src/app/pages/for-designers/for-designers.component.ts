import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from 'src/app/share/pipe-slugify.pipe';
import { SideNavConfig } from 'src/app/side-nav/side-nav.config';
import { ISideNavDataInterface } from 'src/app/side-nav/side-nav.model';
import {LangSwitchService} from "../../share/lan-switch/lang-switch.service";
import {TranslatedPageComponent} from "../translated-page-component";

@Component({
  selector: 'app-for-designers',
  templateUrl: './for-designers.component.html',
  styleUrls: ['./for-designers.component.scss'],
  providers: [SlugifyPipe]
})
export class ForDesignersComponent implements OnInit, TranslatedPageComponent {

  rightNavData: ISideNavDataInterface[];
  rightNavDataRaw: string[] = [ // list of all right nav items
    'Designers.Heading',
    'Designers.AboutHeading',
    'Designers.AccessHeading',
    'Designers.InstallFontsHeading',
    'Designers.UsingStylesHeading',
    'Designers.UsingComponentsHeading',
    'Designers.FigmaHeading',
  ]
  altLangLink = 'forDesigners';

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
