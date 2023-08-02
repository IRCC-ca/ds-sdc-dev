import { Component, OnInit } from '@angular/core';
import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';
import { TranslateService } from '@ngx-translate/core';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { ContentItem } from '@app/share/interface/content-item.interface';
import { ISideNavDataInterface } from '@app/components/side-nav/side-nav.model';
import { SideNavConfig } from '@app/components/side-nav/side-nav.config';

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
      title: 'General.DescriptionHeading',
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
      title: 'ERROR.errorMessage',
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
  rightNavData: ISideNavDataInterface[];
  rightNavDataRaw: string[] = [
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
    private lang: LangSwitchService,
    private navBarConfig: SideNavConfig
  ) {
    this.rightNavData = navBarConfig.getRightNavBarConfig(this.rightNavDataRaw);
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
