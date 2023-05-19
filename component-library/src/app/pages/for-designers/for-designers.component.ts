import { Component, OnInit } from '@angular/core';
import { SideNavConfig } from '@app/components/side-nav/side-nav.config';
import { ISideNavDataInterface } from '@app/components/side-nav/side-nav.model';
import { slugTitleURLConfig } from '@app/components/title-slug-url/title-slug-url.component';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from 'src/app/share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { TranslatedPageComponent } from '../translated-page-component';
import { NavigationService } from 'ircc-ds-angular-component-library';

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
    'Designers.FigmaHeading'
  ];
  altLangLink = 'forDesigners';

  designerHeadingSlug: slugTitleURLConfig = {
    title: 'Designers.Heading',
    heading: 'h1'
  };
  designerAboutHeadingSlug: slugTitleURLConfig = {
    title: 'Designers.AboutHeading'
  };
  designerAccessHeadingSlug: slugTitleURLConfig = {
    title: 'Designers.AccessHeading'
  };
  designerInstallFontSlug: slugTitleURLConfig = {
    title: 'Designers.InstallFontsHeading'
  };
  designerUsingStylesHeadingSlug: slugTitleURLConfig = {
    title: 'Designers.UsingStylesHeading'
  };
  designerUsingComponentsHeadingSlug: slugTitleURLConfig = {
    title: 'Designers.UsingComponentsHeading'
  };
  designerFigmaHeadingSlug: slugTitleURLConfig = {
    title: 'Designers.FigmaHeading'
  };
  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private navBarConfig: SideNavConfig,
    private navService: NavigationService
  ) {
    this.rightNavData = navBarConfig.getRightNavBarConfig(this.rightNavDataRaw);
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
    this.navService.setNavItem({
      label: 'I AM NOT TRANSLATED',
      href: 'ROUTES.overview',
      external: false,
      id: 'Overview.Heading',
      icon: 'fa-regular fa-user',
      trailingIcon: 'fa-regular fa-arrow-right',
      type: 'link',
      children: [],
      indicator: { status: 'critical', icon: 'fa-regular fa-square' }
      }
    )
  }
}
