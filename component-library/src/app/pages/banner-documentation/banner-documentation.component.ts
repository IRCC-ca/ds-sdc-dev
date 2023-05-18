import { Component, OnInit } from '@angular/core';
import { slugAnchorType, slugTitleURLConfig } from '@app/components/title-slug-url/title-slug-url.component';
import { IBannerConfig } from 'ircc-ds-angular-component-library';
import { ContentItem, configContentType, guideLinesContentType } from '@app/share/lan-switch/interface/content-item.interface';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { TranslateService } from '@ngx-translate/core';
import { docPageheadingConfig }  from '@app/share/documentation-page-headings';

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
    title: 'Banner.BannerPreview.Title',
    content: "Banner.BannerPreview.Content",
    type: 'info'
  };

  warningBannerConfig: IBannerConfig = {
    id: this.INFO_BANNER_ID,
    title: 'Banner.BannerPreview.Title',
    content: "Banner.BannerPreview.Content",
    type: 'warning'
  };

  criticalBannerConfig: IBannerConfig = {
    id: this.INFO_BANNER_ID,
    title: 'Banner.BannerPreview.Title',
    content: "Banner.BannerPreview.Content",
    type: 'critical'
  };

  successBannerConfig: IBannerConfig = {
    id: this.INFO_BANNER_ID,
    title: 'Banner.BannerPreview.Title',
    content: "Banner.BannerPreview.Content",
    type: 'success'
  };

  genericBannerConfig: IBannerConfig = {
    id: this.INFO_BANNER_ID,
    title: 'Banner.BannerPreview.Title',
    content: "Banner.BannerPreview.Content",
    type: 'generic'
  };

  pageTitleSlugConfig: slugTitleURLConfig = {
    title: 'Banner.Title',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };

  configContent: configContentType[] = [
    {
      title: "Banner.BannerConfig.SizeLabel",
      optionsArray: ['Banner.BannerConfig.SmallLabel', 'Input.ConfigSizeLarge']
    },
    {
      title: "General.TypesHeading",
      optionsArray: ['Banner.InfoHeading', 'Banner.WarningHeading', 'Banner.CriticalHeading', 'Banner.SuccessHeading', 'Banner.GenericHeading']
    },
    {
      title: "Banner.BannerConfig.StateLabel",
      optionsArray: ['Banner.BannerConfig.DefaultLabel', 'Banner.BannerConfig.HoverLabel', 'Banner.BannerConfig.ActiveLabel', 'Banner.BannerConfig.DisabledLabel', 'Banner.BannerConfig.FocusLabel']
    },
    {
      title: "Banner.BannerConfig.DescriptionLabel",
      optionsArray: ['General.TrueLabel', 'General.FalseLabel']
    },
    {
      title: "Banner.BannerConfig.TitleLabel",
      optionsArray: ['General.TrueLabel', 'General.FalseLabel']
    },
    {
      title: "Banner.BannerConfig.CloseLabel",
      optionsArray: ['General.TrueLabel', 'General.FalseLabel']
    },
    {
      title: "Banner.BannerConfig.CTA1Label",
      optionsArray: ['General.TrueLabel', 'General.FalseLabel']
    },
    {
      title: "Banner.BannerConfig.CTA2Label",
      optionsArray: ['General.TrueLabel', 'General.FalseLabel']
    },
    {
      title: "Banner.BannerConfig.CTA3Label",
      optionsArray: ['General.TrueLabel', 'General.FalseLabel']
    },
  ]
  
  designGuideLinesContent: guideLinesContentType[] = [
    {
      title: 'Banner.DesignGuideLines.KeepActionsSimpleLabel',
      description: '',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/banner-content/banner-actions-do.png',
          doImgAlt: 'Banner.DesignGuideLines.BannerActionsDoAlt',
          doImgDescription: 'Banner.DesignGuideLines.BannerActionsDoText',
          dontImgPath: 'assets/img/banner-content/banner-actions-dont.png',
          dontImgAlt: 'Banner.DesignGuideLines.BannerActionsDontAlt',
          dontImgDescription: 'Banner.DesignGuideLines.BannerActionsDontText'
        },
      ]
    },
    {
      title: 'Banner.DesignGuideLines.UseOneBannerAtATimeLabel',
      description: '',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/banner-content/banner-count-do.png',
          doImgAlt: 'Banner.DesignGuideLines.BannerCountDoAlt',
          doImgDescription: 'Banner.DesignGuideLines.BannerCountDoText',
          dontImgPath: 'assets/img/banner-content/banner-count-dont.png',
          dontImgAlt: 'Banner.DesignGuideLines.BannerCountDontAlt',
          dontImgDescription: 'Banner.DesignGuideLines.BannerCountDontText'
        },
      ]
    },
    {
      title: 'Banner.DesignGuideLines.ShowMaximumButtonsLabel',
      description: '',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/banner-content/banner-button-count-do.png',
          doImgAlt: 'Banner.DesignGuideLines.bannerButtonCountDoAlt',
          doImgDescription: 'Banner.DesignGuideLines.bannerButtonCountDoText',
          dontImgPath: 'assets/img/banner-content/banner-button-count-dont.png',
          dontImgAlt: 'Banner.DesignGuideLines.bannerButtonCountDoAlt',
          dontImgDescription: 'Banner.DesignGuideLines.bannerButtonCountDoText'
        },
      ]
    },
    {
      title: 'Banner.DesignGuideLines.ProperButtonTypeInGroupLabel',
      description: '',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/banner-content/banner-button-type-do.png',
          doImgAlt: 'Banner.DesignGuideLines.bannerButtonTypeDoAlt',
          doImgDescription: 'Banner.DesignGuideLines.bannerButtonTypeDoText',
          dontImgPath: 'assets/img/banner-content/banner-button-type-dont.png',
          dontImgAlt: 'Banner.DesignGuideLines.bannerButtonTypeDontAlt',
          dontImgDescription: 'Banner.DesignGuideLines.bannerButtonTypeDontText'
        },
      ]
    },
    {
      title: 'Banner.DesignGuideLines.BannerCorrectDismissLabel',
      description: '',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/banner-content/banner-dismiss-do.png',
          doImgAlt: 'Banner.DesignGuideLines.bannerDismissDoAlt',
          doImgDescription: 'Banner.DesignGuideLines.bannerDismissDoText',
          dontImgPath: 'assets/img/banner-content/banner-dismiss-dont.png',
          dontImgAlt: 'Banner.DesignGuideLines.bannerDismissDontAlt',
          dontImgDescription: 'Banner.DesignGuideLines.bannerDismissDontText'
        },
      ]
    },
  ];

  contentGuideLinesContent: guideLinesContentType[] = [
    {
      title: 'Banner.ContentGuideLines.UseCorrectCaseHeading',
      description: '',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/banner-content/banner-use-correct-case-do.png',
          doImgAlt: 'Banner.ContentGuideLines.BannerUseCorrectCaseDoAlt',
          doImgDescription: 'Banner.ContentGuideLines.BannerUseCorrectCaseDoText',
          dontImgPath: 'assets/img/banner-content/banner-use-correct-case-dont.png',
          dontImgAlt: 'Banner.ContentGuideLines.BannerUseCorrectCaseDontAlt',
          dontImgDescription: 'Banner.ContentGuideLines.BannerUseCorrectCaseDontText'
        },
      ]
    },
    {
      title: 'Banner.ContentGuideLines.EasyToReadTitleHeading',
      description: '',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/banner-content/banner-title-do.png',
          doImgAlt: 'Banner.ContentGuideLines.BannerTitleDoAlt',
          doImgDescription: 'Banner.ContentGuideLines.BannerTitleDoText',
          dontImgPath: 'assets/img/banner-content/banner-title-dont.png',
          dontImgAlt: 'Banner.ContentGuideLines.BannerTitleDontAlt',
          dontImgDescription: 'Banner.ContentGuideLines.BannerTitleDontText'
        },
      ]
    },
    {
      title: 'Banner.ContentGuideLines.ProperPunctuationHeading',
      description: '',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/banner-content/banner-punctuation-do.png',
          doImgAlt: 'Banner.ContentGuideLines.BannerPunctuationDoAlt',
          doImgDescription: 'Banner.ContentGuideLines.BannerPunctuationDoText',
          dontImgPath: 'assets/img/banner-content/banner-punctuation-dont.png',
          dontImgAlt: 'Banner.ContentGuideLines.BannerPunctuationDontAlt',
          dontImgDescription: 'Banner.ContentGuideLines.BannerPunctuationDontText'
        },
      ]
    },
  ];

  

  figmaDirections: string[] = [
    'Banner.UsageInFigma.FigmaDirectionsListItem1',
    'Banner.UsageInFigma.FigmaDirectionsListItem2',
    'Banner.UsageInFigma.FigmaDirectionsListItem3',
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
      title: 'Banner.Anatomy.TitleHeading',
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
    },
  ];
  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }

}
