import { Component, OnInit } from '@angular/core';
import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';
import { TranslateService } from '@ngx-translate/core';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { ContentItem } from '@app/share/interface/content-item.interface';
import {
  IDynamicImageComponentConfig,
  DSViewPortSize
} from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-date-picker-documentation',
  templateUrl: './date-picker-documentation.component.html',
  styleUrls: ['./date-picker-documentation.component.scss']
})
export class DatePickerDocumentationComponent implements OnInit {
  currentLanguage: string = '';
  altLangLink = 'datePickerDocumentation';
  INFO_BANNER_ID = 'info_banner';
  headingConfig = docPageheadingConfig;

  datePickerTitleSlugConfig: slugTitleURLConfig = {
    title: 'DatePicker.MainTitle',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };

  imageAnatomyConfig: IDynamicImageComponentConfig = {
    id: 'anatomy-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/datePicker-content/datepicker-anatomy-mobile.png'
      }
    ],
    defaultSrc: 'assets/img/datePicker-content/anatomy.png',
    altText: 'DatePicker.Anatomy.ImgAlt',
    lazyLoad: true
  };

  imageSpecsConfig: IDynamicImageComponentConfig = {
    id: 'spec-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/datePicker-content/datepicker-specs-mobile.png'
      }
    ],
    defaultSrc: 'assets/img/datePicker-content/specs.png',
    altText: 'DatePicker.Specs.ImgAlt',
    lazyLoad: true
  };

  anatomyContentItems: ContentItem[] = [
    {
      title: 'General.LabelHeading',
      description: 'General.AnatomyLabelText'
    },
    {
      title: 'General.RequiredIndicatorHeading',
      description: 'General.RequiredIndicatorTxt'
    },
    {
      title: 'General.Description',
      description: 'General.AnatomyDescText'
    },
    {
      title: 'DatePicker.Anatomy.HintHeading',
      description: 'General.AnatomyHintText'
    },
    {
      title: 'DatePicker.Anatomy.SelectCompoHeading',
      description: 'DatePicker.Anatomy.SelectCompoTxt'
    },
    {
      title: 'General.Error',
      description: 'General.AnatomyErrorText'
    }
  ];

  figmaDirections: string[] = [
    'DatePicker.UsageInFigma.FigmaDirectionsListItem1',
    'General.FigmaDirectionsListItem2',
    'General.FigmaDirectionsListItem3',
    'DatePicker.UsageInFigma.FigmaDirectionsListItem4'
  ];
  figmaDirectionsSecond: string[] = [
    'DatePicker.UsageInFigma.FigmaDirectionsSecondItem1',
    'DatePicker.UsageInFigma.FigmaDirectionsSecondItem2'
  ];

  accessibilityContent: string[] = [
    'General.AccessibilityContentItem1',
    'DatePicker.Accessibility.ContentTxt2',
    'DatePicker.Accessibility.ContentTxt3',
    'DatePicker.Accessibility.ContentTxt4',
    'DatePicker.Accessibility.ContentTxt5',
    'DatePicker.Accessibility.ContentTxt6',
    'General.AccessibilityContentItemMax'
  ];
  rightNavData: string[] = [
    // list of all right nav items
    'DatePicker.MainTitle',
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
