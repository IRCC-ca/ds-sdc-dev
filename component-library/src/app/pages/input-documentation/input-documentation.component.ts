import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
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
    type: InputTypes.text
  };

  passwordInputConfig: IInputComponentConfig = {
    id: this.PASSWORD_INPUT_ID,
    formGroup: this.form_input,
    label: 'Input.LabelText2',
    type: InputTypes.password
  };

  inputTitleSlugConfig: slugTitleURLConfig = {
    title: 'Input.Title',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };

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
