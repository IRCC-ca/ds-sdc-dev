import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
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
  rightNavData: ISideNavDataInterface[];
  rightNavDataRaw: string[] = [ // list of all right nav items
    'Buttons.Title',
    'Buttons.TypesHeading',
    'Buttons.ConfigurationsHeading',
    'Buttons.DesignGuidelinesHeading',
    'Buttons.AnatomyHeading',
    'Buttons.SpecsHeading',
    'Buttons.ContentGuidelinesHeading',
    'Buttons.FigmaHeading',
    'Buttons.AccessibilityHeading',
    'Buttons.ResearchHeading'
  ];
  altLangLink = 'buttons';
  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private navBarConfig: SideNavConfig
  ) {
    this.rightNavData = navBarConfig.getRightNavBarConfig(this.rightNavDataRaw);
  };

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  };
};
