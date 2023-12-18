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

  imageMinMaxConfig: IDynamicImageComponentConfig = {
    id: 'min-max-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/banner-content/banner-max-width-mobile.png'
      },
      {
        maxWidth: DSViewPortSize.tablet,
        src: 'assets/img/banner-content/banner-max-width-tablet.png'
      }
    ],
    defaultSrc: 'assets/img/banner-content/banner-max-width-desktop.png',
    altText: 'Banner.DesignGuideLines.bannerMinMaxWidthAlt',
    lazyLoad: true
  };

  imageAnatomyConfig: IDynamicImageComponentConfig = {
    id: 'anatomy-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/banner-content/banner-anatomy-mobile.png'
      },
      {
        maxWidth: DSViewPortSize.tablet,
        src: 'assets/img/banner-content/banner-anatomy-tablet.png'
      }
    ],
    defaultSrc: 'assets/img/banner-content/banner-anatomy-desktop.png',
    altText: 'Banner.Anatomy.ImgAlt',
    lazyLoad: true
  };

  imageSpecsConfig: IDynamicImageComponentConfig = {
    id: 'spec-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/banner-content/banner-specs-mobile.png'
      },
      {
        maxWidth: DSViewPortSize.tablet,
        src: 'assets/img/banner-content/banner-specs-tablet.png'
      }
    ],
    defaultSrc: 'assets/img/banner-content/banner-specs-desktop.png',
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

  rightNavData: string[] = [
    // list of all right nav items
    'Banner.Title',
    'General.InteractiveDemo',
    'General.TypesHeading',
    'General.ConfigurationsHeading',
    'General.DesignGuidelinesHeading',
    'General.AnatomyHeading',
    'General.SpecsHeading',
    'General.ContentGuidelinesHeading',
    'General.FigmaHeading',
    'General.AccessibilityHeading',
    'General.ResearchHeading'
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
