import { Component, OnInit } from '@angular/core';
import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';
import { TranslateService } from '@ngx-translate/core';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { ContentItem } from '@app/share/interface/content-item.interface';

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
    title: 'Date picker',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };

  interactiveDemoSlugTitleURLConfig: slugTitleURLConfig = {
    title: 'Interactive Demo',
    anchorType: slugAnchorType.primary
  };

  anatomyContentItems: ContentItem[] = [
    {
      title: 'DatePicker.Anatomy.LabelHeading',
      description: 'DatePicker.Anatomy.LabelTxt'
    },
    {
      title: 'DatePicker.Anatomy.RequiredIndicatorHeading',
      description: 'DatePicker.Anatomy.RequiredIndicatorTxt'
    },
    {
      title: 'DatePicker.Anatomy.DescHeading',
      description: 'DatePicker.Anatomy.DescTxt'
    },
    {
      title: 'DatePicker.Anatomy.HintHeading',
      description: 'DatePicker.Anatomy.HintTxt'
    },
    {
      title: 'DatePicker.Anatomy.SelectCompoHeading',
      description: 'DatePicker.Anatomy.SelectCompoTxt'
    },
    {
      title: 'DatePicker.Anatomy.ErrMsgHeading',
      description: 'DatePicker.Anatomy.ErrMsgTxt'
    }
  ];

  figmaDirections: string[] = [
    'DatePicker.UsageInFigma.FigmaDirectionsListItem1',
    'DatePicker.UsageInFigma.FigmaDirectionsListItem2',
    'DatePicker.UsageInFigma.FigmaDirectionsListItem3',
    'DatePicker.UsageInFigma.FigmaDirectionsListItem4'
  ];
  figmaDirectionsSecond: string[] = [
    'DatePicker.UsageInFigma.FigmaDirectionsSecondItem1',
    'DatePicker.UsageInFigma.FigmaDirectionsSecondItem2'
  ];

  accessibilityColorContrast: string[] = [
    'DatePicker.Accessibility.ColorText1',
    'DatePicker.Accessibility.ColorText2',
    'DatePicker.Accessibility.ColorText3',
    'DatePicker.Accessibility.ColorText4',
    'DatePicker.Accessibility.ColorText5'
  ];

  accessibilityContent: string[] = [
    'DatePicker.Accessibility.ContentTxt1',
    'DatePicker.Accessibility.ContentTxt2',
    'DatePicker.Accessibility.ContentTxt3',
    'DatePicker.Accessibility.ContentTxt4',
    'DatePicker.Accessibility.ContentTxt5',
    'DatePicker.Accessibility.ContentTxt6',
    'DatePicker.Accessibility.ContentTxt7'
  ];
  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
