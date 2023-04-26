import { Component, OnInit } from '@angular/core';
import { SideNavConfig } from '@app/components/side-nav/side-nav.config';
import { ISideNavDataInterface } from '@app/components/side-nav/side-nav.model';
import { slugTitleURLConfig, slugTitleURLType } from '@app/components/title-slug-url/title-slug-url.component';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from 'src/app/share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { TranslatedPageComponent } from '../translated-page-component';

@Component({
  selector: 'app-for-designers',
  templateUrl: './for-designers.component.html',
  styleUrls: ['./for-designers.component.scss'],
  providers: [SlugifyPipe]
})
export class ForDesignersComponent implements OnInit, TranslatedPageComponent {
  rightNavData: ISideNavDataInterface[];
  rightNavDataRaw: string[] = [
    // list of all right nav items
    'Designers.Heading',
    'Designers.AboutHeading',
    'Designers.AccessHeading',
    'Designers.InstallFontsHeading',
    'Designers.UsingStylesHeading',
    'Designers.UsingComponentsHeading',
    'Designers.FigmaHeading',
  ];
  altLangLink = 'forDesigners';

  designerHeadingSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Designers.Heading'
  };
  designerAboutHeadingSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Designers.AboutHeading'
  };
  designerAccessHeadingSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Designers.AccessHeading'
  };
  designerInstallFontSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Designers.InstallFontsHeading'
  };
  designerUsingStylesHeadingSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Designers.UsingStylesHeading'
  };
  designerUsingComponentsHeadingSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Designers.UsingComponentsHeading'
  };
  designerFigmaHeadingSlug: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Designers.FigmaHeading'
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
