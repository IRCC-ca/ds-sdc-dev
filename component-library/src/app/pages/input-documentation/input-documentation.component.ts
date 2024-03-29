import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  DSViewPortSize,
  IDynamicImageComponentConfig,
  IInputComponentConfig,
  InputTypes
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
  selector: 'app-input-documentation',
  templateUrl: './input-documentation.component.html',
  styleUrls: ['./input-documentation.component.scss'],
  providers: [SlugifyPipe]
})
export class InputDocumentationComponent implements OnInit {
  currentLanguage: string = '';
  anchorType = slugAnchorType;
  headingConfig = docPageheadingConfig;

  altLangLink = 'inputDocumentation';

  BASIC_INPUT_ID = 'basic_input';
  PASSWORD_INPUT_ID = 'password_input';

  form_input = new FormGroup({});

  basicInputConfig: IInputComponentConfig = {
    id: this.BASIC_INPUT_ID,
    formGroup: this.form_input,
    label: 'General.Label',
    type: InputTypes.text,
    size: 'small'
  };

  passwordInputConfig: IInputComponentConfig = {
    id: this.PASSWORD_INPUT_ID,
    formGroup: this.form_input,
    label: 'General.Password',
    type: InputTypes.password,
    size: 'small'
  };

  inputTitleSlugConfig: slugTitleURLConfig = {
    title: 'Input.Title',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };

  imageMinMaxConfig: IDynamicImageComponentConfig = {
    id: 'min-max-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/input-content/input-max-width-mobile.png'
      },
      {
        maxWidth: DSViewPortSize.tablet,
        src: 'assets/img/input-content/input-max-width-tablet.png'
      }
    ],
    defaultSrc: 'assets/img/input-content/input-max-width-desktop.png',
    altText: 'Input.MaxMinWidthImgAlt',
    lazyLoad: true
  };

  imageAnatomyConfig: IDynamicImageComponentConfig = {
    id: 'anatomy-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/input-content/input-anatomy-mobile.png'
      },
      {
        maxWidth: DSViewPortSize.tablet,
        src: 'assets/img/input-content/input-anatomy-tablet.png'
      }
    ],
    defaultSrc: 'assets/img/input-content/input-anatomy-desktop.png',
    altText: 'Input.AnatomyImgAlt',
    lazyLoad: true
  };

  imageSpecsConfig: IDynamicImageComponentConfig = {
    id: 'spec-image',
    breakpoints: [
      {
        maxWidth: DSViewPortSize.mobile,
        src: 'assets/img/input-content/input-specs-mobile.png'
      },
      {
        maxWidth: DSViewPortSize.tablet,
        src: 'assets/img/input-content/input-specs-tablet.png'
      }
    ],
    defaultSrc: 'assets/img/input-content/input-specs-desktop.png',
    altText: 'Input.SpecsImgAlt',
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
      title: 'General.TitleHeading',
      description: 'Banner.Anatomy.TitleText'
    },
    {
      title: 'General.Hint',
      description: 'General.AnatomyHintText'
    },
    {
      title: 'General.InputField',
      description: 'Input.AnatomyInputFieldText'
    },
    {
      title: 'Input.AnatomyInputContentHeading',
      description: 'Input.AnatomyInputContentText'
    },
    {
      title: 'General.Error',
      description: 'General.AnatomyErrorText'
    },
    {
      title: 'Input.AnatomyPasswordHeading',
      description: 'Input.AnatomyPasswordText'
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

  rightNavData: string[] = [
    // list of all right nav items
    'Input.Title',
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
    private lang: LangSwitchService,
    private slugify: SlugifyPipe
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
    this.form_input.addControl(this.BASIC_INPUT_ID, new FormControl());
    this.form_input.addControl(this.PASSWORD_INPUT_ID, new FormControl());
  }
}
