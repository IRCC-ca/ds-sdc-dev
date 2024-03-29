import { Component, OnInit } from '@angular/core';
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
  rightNavData: string[] = [
    // list of all right nav items
    'General.DesignerHeading',
    'Designers.AboutHeading',
    'Designers.AccessHeading',
    'Designers.InstallFontsHeading',
    'Designers.UsingStylesHeading',
    'Designers.UsingComponentsHeading',
    'Designers.FigmaHeading'
  ];
  altLangLink = 'forDesigners';

  designerHeadingSlug: slugTitleURLConfig = {
    title: 'General.DesignerHeading',
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
    private navService: NavigationService
  ) {}

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
