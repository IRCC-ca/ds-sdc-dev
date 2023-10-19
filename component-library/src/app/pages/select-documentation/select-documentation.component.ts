import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  DSViewPortSize,
  IDynamicImageComponentConfig,
  ISelectConfig
} from 'ircc-ds-angular-component-library';

import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';
import { ContentItem } from '@app/share/interface/content-item.interface';

@Component({
  selector: 'app-select-documentation',
  templateUrl: './select-documentation.component.html',
  styleUrls: ['./select-documentation.component.scss'],
  providers: [SlugifyPipe]
})
export class SelectDocumentationComponent implements OnInit {
  currentLanguage: string = '';
  anchorType = slugAnchorType;
  headingConfig = docPageheadingConfig;

  altLangLink = 'selectDocumentation';

  BASIC_SELECT_ID = 'basic_select';
  form_select = new FormGroup({});

  basicSelectConfig: ISelectConfig = {
    id: this.BASIC_SELECT_ID,
    formGroup: this.form_select,
    label: 'General.Label'
  };

  selectTitleSlugConfig: slugTitleURLConfig = {
    title: 'Select.Title',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };

  imageMaxWidthConfig: IDynamicImageComponentConfig = {
    id: 'min-max-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/select-content/select-max-width-mobile.png'
      },
      {
        maxWidth: DSViewPortSize.tablet,
        src: 'assets/img/select-content/select-max-width-tablet.png'
      }
    ],
    defaultSrc: 'assets/img/select-content/select-max-width-desktop.png',
    altText: 'Select.Alt.MinMax',
    lazyLoad: true
  };

  imageAnatomyConfig: IDynamicImageComponentConfig = {
    id: 'anatomy-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/select-content/select-anatomy-mobile.png'
      },
      {
        maxWidth: DSViewPortSize.tablet,
        src: 'assets/img/select-content/select-anatomy-tablet.png'
      }
    ],
    defaultSrc: 'assets/img/select-content/select-anatomy-desktop.png',
    altText: 'Select.Alt.Anatomy',
    lazyLoad: true
  };

  imageSpecsConfig: IDynamicImageComponentConfig = {
    id: 'spec-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/select-content/select-specs-mobile.png'
      },
      {
        maxWidth: DSViewPortSize.tablet,
        src: 'assets/img/select-content/select-specs-tablet.png'
      }
    ],
    defaultSrc: 'assets/img/select-content/select-specs-desktop.png',
    altText: 'Select.Alt.Specs',
    lazyLoad: true
  };

  figmaDirections: string[] = [
    'Input.FigmaDirectionsListItem1',
    'General.FigmaDirectionsListItem2',
    'General.FigmaDirectionsListItem3',
    'Input.FigmaDirectionsListItem4'
  ];
  figmaDirectionsSecond: string[] = [
    'Input.AccessInputsListItem1',
    'Select.FigmaAccess2',
    'Select.FigmaAccess3'
  ];

  anatomyContentItems: ContentItem[] = [
    {
      title: 'General.RequiredIndicatorHeading',
      description: 'General.RequiredIndicatorTxt'
    },
    {
      title: 'General.LabelHeading',
      description: 'General.AnatomyLabelText'
    },
    {
      title: 'General.Description',
      description: 'General.AnatomyDescriptionText'
    },
    {
      title: 'General.Hint',
      description: 'General.AnatomyHintTxt'
    },
    {
      title: 'General.InputField',
      description: 'General.AnatomyInputFieldText'
    },
    {
      title: 'General.Error',
      description: 'General.AnatomyErrorText'
    },
    {
      title: 'Select.Anatomy.Dropdown',
      description: 'Select.Anatomy.DropdownText'
    }
  ];

  accessibilityContent: string[] = [
    'General.AccessibilityContentItem1',
    'Input.AccessibilityContentItem2',
    'Input.AccessibilityContentItem3',
    'Input.AccessibilityContentItem4',
    'Input.AccessibilityContentItem5',
    'Input.AccessibilityContentItem6',
    'General.AccessibilityContentItemMax'
  ];

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private slugify: SlugifyPipe
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
    this.form_select.addControl(this.BASIC_SELECT_ID, new FormControl());
  }
}
