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

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
