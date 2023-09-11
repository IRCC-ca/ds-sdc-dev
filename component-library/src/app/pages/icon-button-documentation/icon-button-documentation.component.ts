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
  IconButtonCategories
} from 'ircc-ds-angular-component-library';
import { ContentItem } from '@app/share/interface/content-item.interface';
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
    mobileSrc: 'assets/img/icon-btn-content/icon-spacing-phone-328w.png',
    desktopSrc: 'assets/img/icon-btn-content/icon-spacing.png',
    defaultSrc: 'assets/img/icon-btn-content/icon-spacing.png',
    maxWidth: 768,
    altText: 'IconButtonDocumentation.Spacing.ImgAlt',
    lazyLoad: true
  };

  anatomyImgConfig: IResponsiveImageComponentConfig = {
    id: 'anatomy-image',
    mobileSrc: 'assets/img/icon-btn-content/icon-anatomy-phone.png',
    desktopSrc: 'assets/img/icon-btn-content/anatomy-image-button.png',
    defaultSrc: 'assets/img/icon-btn-content/anatomy-image-button.png',
    maxWidth: 768,
    altText: 'IconButtonDocumentation.AnatomyImgAlt',
    lazyLoad: true
  };

  specImgConfig: IResponsiveImageComponentConfig = {
    id: 'spec-image',
    mobileSrc: 'assets/img/icon-btn-content/icon-spec-phone-328w.png',
    desktopSrc: 'assets/img/icon-btn-content/spec-image-872w.png',
    defaultSrc: 'assets/img/icon-btn-content/spec-image-872w.png',
    maxWidth: 768,
    altText: 'IconButtonDocumentation.SpecsImgAlt',
    lazyLoad: true
  };

  anatomyContentItems: ContentItem[] = [
    {
      title: 'IconButtonDocumentation.AnatomyHeading',
      description: 'IconButtonDocumentation.AnatomyText'
    }
  ];

  figmaDirections: string[] = [
    'IconButtonDocumentation.FigmaDirectionsListItem1',
    'General.FigmaDirectionsListItem2',
    'General.FigmaDirectionsListItem3',
    'IconButtonDocumentation.FigmaDirectionsListItem4'
  ];

  accessibilityContent: string[] = [
    'IconButtonDocumentation.AccessibilityContentItem1',
    'IconButtonDocumentation.AccessibilityContentItem2',
    'IconButtonDocumentation.AccessibilityContentItem3'
  ];

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
