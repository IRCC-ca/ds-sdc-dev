import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IInputComponentConfig } from 'ircc-ds-angular-component-library';

import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { ContentItem, configContentType, doDontTypes, guideLinesContentType } from '@app/share/lan-switch/interface/content-item.interface';
import { docPageheadingConfig }  from '@app/share/documentation-page-headings';

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
    label: 'Input.LabelText1',
    type: 'text'
  };

  passwordInputConfig: IInputComponentConfig = {
    id: this.PASSWORD_INPUT_ID,
    formGroup: this.form_input,
    label: 'Input.LabelText2',
    type: 'password'
  };

  inputTitleSlugConfig: slugTitleURLConfig = {
    title: 'Input.Title',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };

  designGuideLinesContent: guideLinesContentType[] = [
    {
      title: 'Input.FieldWidth',
      description: '',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/input-content/field-width-do.png',
          doImgAlt: 'Input.FieldWidthImgDo',
          doImgDescription: 'Input.FieldWidthDoText',
          dontImgPath: 'assets/img/input-content/field-width-dont.png',
          dontImgAlt: 'Input.FieldWidthImgDont',
          dontImgDescription: 'Input.FieldWidthDontText'
        },
      ]
    },
    {
      title: 'Input.ErrorsHeading',
      description: '',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/input-content/error-do.png',
          doImgAlt: 'Input.ErrorDoImgAlt',
          doImgDescription: 'Input.ErrorDoText',
          dontImgPath: 'assets/img/input-content/error-dont.png',
          dontImgAlt: 'Input.ErrorDontImgAlt',
          dontImgDescription: 'Input.ErrorDontText'
        }
      ]
    },
  ];
  
  contentGuideLinesContent: guideLinesContentType[] = [
    {
      title: 'Input.WriteLabelsHeading',
      description: 'Input.WriteLabelsSubHeading',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/input-content/label-do-1.png',
          doImgAlt: 'Input.WriteLabelsDoImgAlt1',
          doImgDescription: 'Input.WriteLabelsDoText1',
          dontImgPath: 'assets/img/input-content/label-dont-1.png',
          dontImgAlt: 'Input.WriteLabelsDontImgAlt1',
          dontImgDescription: 'Input.WriteLabelsDontText1'
        },
        {
          doImgPath: 'assets/img/input-content/label-do-2.png',
          doImgAlt: 'Input.WriteLabelsDoImgAlt2',
          doImgDescription: 'Input.WriteLabelsDoText2',
          dontImgPath: 'assets/img/input-content/label-dont-2.png',
          dontImgAlt: 'Input.WriteLabelsDontImgAlt2',
          dontImgDescription: 'Input.WriteLabelsDontText2'
        }
      ]
    },
    {
      title: 'Input.WriteDescHeading',
      description: 'Input.WriteDescSubHeading',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/input-content/desc-do.png',
          doImgAlt: 'Input.WriteDescDoImgAlt',
          doImgDescription: 'Input.WriteDescDoText',
          dontImgPath: 'assets/img/input-content/desc-dont.png',
          dontImgAlt: 'Input.WriteDescDontImgAlt',
          dontImgDescription: 'Input.WriteDescDontText'
        }
      ]
    },
    {
      title: 'Input.WritePlaceholderHeading',
      description: 'Input.WritePlaceholderSubHeading',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/input-content/placeholder-do-1.png',
          doImgAlt: 'Input.WritePlaceholderDoImgAlt1',
          doImgDescription: 'Input.WritePlaceholderDoText1',
          dontImgPath: 'assets/img/input-content/placeholder-dont-1.png',
          dontImgAlt: 'Input.WritePlaceholderDontImgAlt1',
          dontImgDescription: 'Input.WritePlaceholderDontText1'
        },
        {
          doImgPath: 'assets/img/input-content/placeholder-do-2.png',
          doImgAlt: 'Input.WritePlaceholderDoImgAlt2',
          doImgDescription: 'Input.WritePlaceholderDoText2',
          dontImgPath: 'assets/img/input-content/placeholder-dont-2.png',
          dontImgAlt: 'Input.WritePlaceholderDontImgAlt2',
          dontImgDescription: 'Input.WritePlaceholderDontText2'
        }
      ]
    },
    {
      title: 'Input.WriteErrorsHeading',
      description: 'Input.WriteErrorsSubHeading',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/input-content/error-message-do.png',
          doImgAlt: 'Input.WriteErrorsDoImgAlt',
          doImgDescription: 'Input.WriteErrorsDoText',
          dontImgPath: 'assets/img/input-content/error-message-dont.png',
          dontImgAlt: 'Input.WriteErrorsDontImgAlt',
          dontImgDescription: 'Input.WriteErrorsDontText'
        }
      ]
    },
    {
      title: 'Input.NecessaryContentHeading',
      description: '',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/input-content/necessary-content-do.png',
          doImgAlt: 'Input.NecessaryContentDoImgAlt',
          doImgDescription: 'Input.NecessaryContentDoText',
          dontImgPath: 'assets/img/input-content/necessary-content-dont.png',
          dontImgAlt: 'Input.NecessaryContentDontImgAlt',
          dontImgDescription: 'Input.NecessaryContentDontText'
        }
      ]
    },
    {
      title: 'Input.RequiredFieldsHeading',
      description: '',
      doAndDontObjectArray: [
        {
          doImgPath: 'assets/img/input-content/required-field-do.png',
          doImgAlt: 'Input.RequiredFieldsDoImgAlt',
          doImgDescription: 'Input.RequiredFieldsDoText',
          dontImgPath: 'assets/img/input-content/required-field-dont.png',
          dontImgAlt: 'Input.RequiredFieldsDontImgAlt',
          dontImgDescription: 'Input.RequiredFieldsDontText'
        }
      ]
    },
  ];

  configContent: configContentType[] = [
    {
      title: "Input.ConfigSizeHeading",
      optionsArray: ['Input.ConfigSizeSmall', 'Input.ConfigSizeLarge']
    },
    {
      title: "Input.ConfigHintHeading",
      optionsArray: ['General.TrueLabel', 'General.FalseLabel']
    },
    {
      title: "Input.ConfigRequiredHeading",
      optionsArray: ['General.TrueLabel', 'General.FalseLabel']
    },
    {
      title: "Input.ConfigErrorHeading",
      optionsArray: ['General.TrueLabel', 'General.FalseLabel']
    },
    {
      title: "Input.ConfigDescHeading",
      optionsArray: ['General.TrueLabel', 'General.FalseLabel']
    },
    {
      title: "Input.ConfigPlaceholderHeading",
      optionsArray: ['General.TrueLabel', 'General.FalseLabel']
    },
  ]


  figmaDirections: string[] = [
    'Input.FigmaDirectionsListItem1',
    'Input.FigmaDirectionsListItem2',
    'Input.FigmaDirectionsListItem3',
    'Input.FigmaDirectionsListItem4'
  ];

  accessibilityContentItems: string[] = [
    'Input.AccessibilityContentItem1',
    'Input.AccessibilityContentItem2',
    'Input.AccessibilityContentItem3',
    'Input.AccessibilityContentItem4',
    'Input.AccessibilityContentItem5',
    'Input.AccessibilityContentItem6',
    'Input.AccessibilityContentItem7'
  ];

  anatomyContentItems: ContentItem[] = [
    {
      title: 'Input.AnatomyLabelHeading',
      description: 'Input.AnatomyLabelText'
    },
    {
      title: 'Input.AnatomyRequiredIndicatorHeading',
      description: 'Input.AnatomyRequiredIndicatorText'
    },
    {
      title: 'Input.AnatomyDescHeading',
      description: 'Input.AnatomyDescText'
    },
    {
      title: 'Input.AnatomyHintHeading',
      description: 'Input.AnatomyHintText'
    },
    {
      title: 'Input.AnatomyInputFieldHeading',
      description: 'Input.AnatomyInputFieldText'
    },
    {
      title: 'Input.AnatomyInputContentHeading',
      description: 'Input.AnatomyInputContentText'
    },
    {
      title: 'Input.AnatomyErrorHeading',
      description: 'Input.AnatomyErrorText'
    },
    {
      title: 'Input.AnatomyPasswordHeading',
      description: 'Input.AnatomyPasswordText'
    }
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
