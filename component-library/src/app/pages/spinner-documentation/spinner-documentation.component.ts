import { Component, OnInit } from '@angular/core';
import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';
import { ContentItem } from '@app/share/interface/content-item.interface';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { TranslateService } from '@ngx-translate/core';
import {
  IDynamicImageComponentConfig,
  DSViewPortSize
} from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-spinner-documentation',
  templateUrl: './spinner-documentation.component.html',
  styleUrls: ['./spinner-documentation.component.scss']
})
export class SpinnerDocumentationComponent implements OnInit {
  currentLanguage: string = '';
  altLangLink = 'spinnerDocumentation';
  headingConfig = docPageheadingConfig;

  spinnerTitleSlugConfig: slugTitleURLConfig = {
    title: 'Spinner.MainTitle',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };

  imageMaxWidthConfig: IDynamicImageComponentConfig = {
    id: 'max-width-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/spinner-content/spinner-minMaxWidth-mobile.png'
      },
      {
        maxWidth: DSViewPortSize.tablet,
        src: 'assets/img/spinner-content/spinner-minMaxWidth-tablet.png'
      }
    ],
    defaultSrc: 'assets/img/spinner-content/spinner-minMaxWidth-desktop.png',
    altText: 'Spinner.MaxMinWidthImgAlt',
    lazyLoad: true
  };

  imageAnatomyConfig: IDynamicImageComponentConfig = {
    id: 'anatomy-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/spinner-content/spinner-anatomy-mobile.png'
      },
      {
        maxWidth: DSViewPortSize.tablet,
        src: 'assets/img/spinner-content/spinner-anatomy-tablet.png'
      }
    ],
    defaultSrc: 'assets/img/spinner-content/spinner-anatomy-desktop.png',
    altText: 'Spinner.Anatomy.ImgAlt',
    lazyLoad: true
  };

  imageSpecsConfig: IDynamicImageComponentConfig = {
    id: 'spec-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/spinner-content/spinner-specs-mobile.png'
      },
      {
        maxWidth: DSViewPortSize.tablet,
        src: 'assets/img/spinner-content/spinner-specs-tablet.png'
      }
    ],
    defaultSrc: 'assets/img/spinner-content/spinner-specs-desktop.png',
    altText: 'Spinner.Specs.ImgAlt',
    lazyLoad: true
  };

  anatomyContentItems: ContentItem[] = [
    {
      title: 'Spinner.MainTitle',
      description: 'Spinner.SpinnerAnatomy'
    },
    {
      title: 'General.LabelOptional',
      description: 'Spinner.LabelAnatomy'
    },
    {
      title: 'General.DescriptionOptional',
      description: 'Spinner.DescriptionAnatomy'
    }
  ];

  figmaDirections: string[] = [
    'Spinner.UsageInFigma.FigmaDirectionsListItem1',
    'General.FigmaDirectionsListItem2',
    'General.FigmaDirectionsListItem3'
  ];

  accessibilityContent: string[] = [
    'General.AccessibilityContentItem1',
    'Spinner.AccessibilityContentItem2',
    'Spinner.AccessibilityContentItem3',
    'Spinner.AccessibilityContentItem4',
    'General.AccessibilityContentItemMax'
  ];

  rightNavData: string[] = [
    // list of all right nav items
    'Spinner.MainTitle',
    'General.InteractiveDemo',
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
  ) {}

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
