import { Component, OnInit } from '@angular/core';
import { slugAnchorType, slugTitleURLConfig, slugTitleURLType } from '@app/components/title-slug-url/title-slug-url.component';
import { IBannerConfig } from 'ircc-ds-angular-component-library';
import { FormControl, FormGroup } from '@angular/forms';
import { ContentItem } from '@app/share/lan-switch/interface/content-item.interface';

@Component({
  selector: 'app-banner-documentation',
  templateUrl: './banner-documentation.component.html',
  styleUrls: ['./banner-documentation.component.scss']
})
export class BannerDocumentationComponent implements OnInit {

  INFO_BANNER_ID = 'info_banner';

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
    type: slugTitleURLType.primary,
    title: 'Banner.Title',
    anchorType: slugAnchorType.primary
  };

  interactiveDemoSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'General.InteractiveDemo',
    anchorType: slugAnchorType.primary
  };
  
  typesSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'General.TypesHeading',
    anchorType: slugAnchorType.primary
  };

  configurationSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'General.ConfigurationsHeading',
    anchorType: slugAnchorType.primary
  };

  guidelineSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'General.DesignGuidelinesHeading',
    anchorType: slugAnchorType.primary
  };

  anatomySlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'General.AnatomyHeading',
    anchorType: slugAnchorType.primary
  };

  specsSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'General.SpecsHeading',
    anchorType: slugAnchorType.primary
  };

  contentGuideSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'General.ContentGuidelinesHeading',
    anchorType: slugAnchorType.primary
  };

  figmaSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'General.FigmaHeading',
    anchorType: slugAnchorType.primary
  };

  accessibilitySlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'General.AccessibilityHeading',
    anchorType: slugAnchorType.primary
  };

  researchSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'General.ResearchHeading',
    anchorType: slugAnchorType.primary
  };

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
  constructor() { }

  ngOnInit(): void {
  }

}
