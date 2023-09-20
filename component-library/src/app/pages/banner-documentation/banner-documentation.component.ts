import { Component, OnInit } from '@angular/core';
import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import {
  DSViewPortSize,
  IBannerConfig,
  IDynamicImageComponentConfig
} from 'ircc-ds-angular-component-library';
import { ContentItem } from '@app/share/interface/content-item.interface';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { TranslateService } from '@ngx-translate/core';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';

@Component({
  selector: 'app-banner-documentation',
  templateUrl: './banner-documentation.component.html',
  styleUrls: ['./banner-documentation.component.scss']
})
export class BannerDocumentationComponent implements OnInit {
  currentLanguage: string = '';
  altLangLink = 'bannerDocumentation';
  INFO_BANNER_ID = 'info_banner';
  headingConfig = docPageheadingConfig;

  infoBannerConfig: IBannerConfig = {
    id: this.INFO_BANNER_ID,
    title: 'General.TitleHeading',
    content: 'Banner.BannerPreview.Content',
    type: 'info',
    size: 'small'
  };

  warningBannerConfig: IBannerConfig = {
    id: this.INFO_BANNER_ID,
    title: 'General.TitleHeading',
    content: 'Banner.BannerPreview.Content',
    type: 'warning',
    size: 'small'
  };

  criticalBannerConfig: IBannerConfig = {
    id: this.INFO_BANNER_ID,
    title: 'General.TitleHeading',
    content: 'Banner.BannerPreview.Content',
    type: 'critical',
    size: 'small'
  };

  successBannerConfig: IBannerConfig = {
    id: this.INFO_BANNER_ID,
    title: 'General.TitleHeading',
    content: 'Banner.BannerPreview.Content',
    type: 'success',
    size: 'small'
  };

  genericBannerConfig: IBannerConfig = {
    id: this.INFO_BANNER_ID,
    title: 'General.TitleHeading',
    content: 'Banner.BannerPreview.Content',
    type: 'generic',
    size: 'small'
  };

  pageTitleSlugConfig: slugTitleURLConfig = {
    title: 'Banner.Title',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };

  imageAnatomyConfig: IDynamicImageComponentConfig = {
    id: 'anatomy-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/banner-content/banner-anatomy-mobile.png'
      }
    ],
    defaultSrc: 'assets/img/banner-content/banner-anatomy.png',
    altText: 'Banner.Anatomy.ImgAlt',
    lazyLoad: true
  };

  imageSpecsConfig: IDynamicImageComponentConfig = {
    id: 'spec-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/banner-content/banner-spec-mobile.png'
      }
    ],
    defaultSrc: 'assets/img/banner-content/banner-specs.png',
    altText: 'Banner.Specs.ImgAlt',
    lazyLoad: true
  };

  figmaDirections: string[] = [
    'Banner.UsageInFigma.FigmaDirectionsListItem1',
    'General.FigmaDirectionsListItem2',
    'General.FigmaDirectionsListItem3',
    'Banner.UsageInFigma.FigmaDirectionsListItem4'
  ];

  accessibilityColorContrast: string[] = [
    'Banner.Accessibility.ColorText1',
    'Banner.Accessibility.ColorText2',
    'Banner.Accessibility.ColorText3',
    'Banner.Accessibility.ColorText4',
    'Banner.Accessibility.ColorText5'
  ];

  anatomyContentItems: ContentItem[] = [
    {
      title: 'Banner.Anatomy.ContainerHeading',
      description: 'Banner.Anatomy.ContainerText'
    },
    {
      title: 'Banner.Anatomy.BannerIconTypeHeading',
      description: 'Banner.Anatomy.BannerIconTypeText'
    },
    {
      title: 'Banner.Anatomy.BannerBarHeading',
      description: 'Banner.Anatomy.BannerBarText'
    },
    {
      title: 'General.TitleHeading',
      description: 'Banner.Anatomy.TitleText'
    },
    {
      title: 'Banner.Anatomy.DescriptionHeading',
      description: 'Banner.Anatomy.DescriptionText'
    },
    {
      title: 'Banner.Anatomy.CloseBtnHeading',
      description: 'Banner.Anatomy.CloseBtnText'
    },
    {
      title: 'Banner.Anatomy.CTAGroupHeading',
      description: 'Banner.Anatomy.CTAGroupText'
    }
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
