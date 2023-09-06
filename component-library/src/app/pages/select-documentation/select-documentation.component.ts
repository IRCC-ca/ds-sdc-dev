import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ISelectConfig } from 'ircc-ds-angular-component-library';

import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';

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
