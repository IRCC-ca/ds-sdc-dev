import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import {
  IInputComponentConfig
} from 'ircc-ds-angular-component-library';

import { slugTitleURLConfig, slugTitleURLType } from '@app/components/title-slug-url/title-slug-url.component';
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
  altLangLink = 'inputDocumentation';

  BASIC_INPUT_ID = 'basic_input'
  PASSWORD_INPUT_ID = 'password_input'

  form_input_basic = new FormGroup({});
  form_input_password = new FormGroup({});


  basicInputConfig: IInputComponentConfig = {
    id: this.BASIC_INPUT_ID,
    formGroup: this.form_input_basic,
    label: "Label text",
    type: 'text'
  }

  passwordInputConfig: IInputComponentConfig = {
    id: this.PASSWORD_INPUT_ID,
    formGroup: this.form_input_password,
    label: "Label text",
    type: 'password'
  }

  inputTitleSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.Title'
  }

  interactiveDemoSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.InteractiveDemo'
  }

  typesSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.TypesHeading'
  }

  configurationSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.TypesHeading'
  }

  guidelineSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.DesignGuidelinesHeading'
  }

  anatomySlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.AnatomyHeading'
  }

  specsSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.SpecsHeading'
  }

  contentGuideSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.ContentGuidelinesHeading'
  }

  figmaSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.FigmaHeading'
  }

  accessibilitySlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.AccessibilityHeading'
  }

  researchSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.ResearchHeading'
  }



  constructor(private translate: TranslateService,
    private lang: LangSwitchService,
    private slugify: SlugifyPipe) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit(): void {
    this.lang.setAltLangLink(this.altLangLink);

  }

}
