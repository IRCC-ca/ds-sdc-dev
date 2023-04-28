import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { IInputComponentConfig } from 'ircc-ds-angular-component-library';

import {
  slugAnchorType,
  slugTitleURLConfig,
  slugTitleURLType
} from '@app/components/title-slug-url/title-slug-url.component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';

@Component({
  selector: 'app-input-documentation',
  templateUrl: './input-documentation.component.html',
  styleUrls: ['./input-documentation.component.scss'],
  providers: [SlugifyPipe]
})
export class InputDocumentationComponent implements OnInit {
  currentLanguage: string = '';
  slugTitleURLType = slugTitleURLType;
  anchorType = slugAnchorType;

  altLangLink = 'inputDocumentation';

  BASIC_INPUT_ID = 'basic_input';
  PASSWORD_INPUT_ID = 'password_input';

  form_input_basic = new FormGroup({});
  form_input_password = new FormGroup({});

  basicInputConfig: IInputComponentConfig = {
    id: this.BASIC_INPUT_ID,
    formGroup: this.form_input_basic,
    label: 'Input.LabelText',
    type: 'text'
  };

  passwordInputConfig: IInputComponentConfig = {
    id: this.PASSWORD_INPUT_ID,
    formGroup: this.form_input_password,
    label: 'Input.LabelText',
    type: 'password'
  };

  inputTitleSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Input.Title',
    anchorType: slugAnchorType.primary
  };

  interactiveDemoSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.InteractiveDemo',
    anchorType: slugAnchorType.primary
  };

  typesSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.TypesHeading',
    anchorType: slugAnchorType.primary
  };

  configurationSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.ConfigurationsHeading',
    anchorType: slugAnchorType.primary
  };

  guidelineSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.DesignGuidelinesHeading',
    anchorType: slugAnchorType.primary
  };

  anatomySlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.AnatomyHeading',
    anchorType: slugAnchorType.primary
  };

  specsSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.SpecsHeading',
    anchorType: slugAnchorType.primary
  };

  contentGuideSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.ContentGuidelinesHeading',
    anchorType: slugAnchorType.primary
  };

  figmaSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.FigmaHeading',
    anchorType: slugAnchorType.primary
  };

  accessibilitySlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.AccessibilityHeading',
    anchorType: slugAnchorType.primary
  };

  researchSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.ResearchHeading',
    anchorType: slugAnchorType.primary
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private slugify: SlugifyPipe
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit(): void {
    this.lang.setAltLangLink(this.altLangLink);
  }
}
