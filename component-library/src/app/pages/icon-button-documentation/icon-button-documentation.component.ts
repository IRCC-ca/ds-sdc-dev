import { Component, OnInit } from '@angular/core';
import {
  slugTitleURLConfig,
  slugAnchorType
} from '@app/components/title-slug-url/title-slug-url.component';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { TranslateService } from '@ngx-translate/core';
import {
  IIconButtonComponentConfig,
  IconButtonCategories,
  DSViewPortSize
} from 'ircc-ds-angular-component-library';

import { IResponsiveImageComponentConfig } from '@app/components/responsive-image/responsive-image.component';
@Component({
  selector: 'app-icon-button-documentation',
  templateUrl: './icon-button-documentation.component.html',
  styleUrls: ['./icon-button-documentation.component.scss']
})
export class IconButtonDocumentationComponent implements OnInit {
  headingConfig = docPageheadingConfig;
  currentLanguage: string = '';
  altLangLink = 'iconButtonDocumentation';

  pageTitleSlugConfig: slugTitleURLConfig = {
    title: 'IconButtonDocumentation.Title',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };

  primaryIconBtnConfig: IIconButtonComponentConfig = {
    id: 'icon-button',
    category: IconButtonCategories.primary,
    size: 'small',
    disabled: false
  };

  criticalIconConfig: IIconButtonComponentConfig = {
    id: 'icon-button',
    category: IconButtonCategories.critical,
    size: 'small',
    disabled: false
  };

  imageSpacingConfig: IResponsiveImageComponentConfig = {
    id: 'image-spacing',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/icon-btn-content/icon-spacing-phone-328w.png'
      }
    ],
    defaultSrc: 'assets/img/icon-btn-content/icon-spacing.png',
    altText: 'IconButtonDocumentation.Spacing.ImgAlt',
    lazyLoad: true
  };

  anatomyImgConfig: IResponsiveImageComponentConfig = {
    id: 'anatomy-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/icon-btn-content/icon-anatomy-phone.png'
      }
    ],
    defaultSrc: 'assets/img/icon-btn-content/anatomy-image-button.png',
    altText: 'IconButtonDocumentation.AnatomyImgAlt',
    lazyLoad: true
  };

  specImgConfig: IResponsiveImageComponentConfig = {
    id: 'spec-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/icon-btn-content/icon-spec-phone-328w.png'
      }
    ],
    defaultSrc: 'assets/img/icon-btn-content/spec-image-872w.png',
    altText: 'IconButtonDocumentation.SpecsImgAlt',
    lazyLoad: true
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
