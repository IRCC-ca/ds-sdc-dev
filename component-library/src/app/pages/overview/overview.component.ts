import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../../share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { TranslatedPageComponent } from '../translated-page-component';

import { slugTitleURLConfig } from '@app/components/title-slug-url/title-slug-url.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMultiCheckboxConfig } from 'component-lib/src/lib/form-components/multi-checkbox/multi-checkbox.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [SlugifyPipe]
})
export class OverviewComponent implements OnInit, TranslatedPageComponent {
  currentLanguage: string = '';
  altLangLink = 'overview'; // ROUTE translation path
  form: FormGroup = new FormGroup({});

  overViewSlugTitleURLConfig: slugTitleURLConfig = {
    title: 'Overview.Heading',
    heading: 'h1'
  };

  config: IMultiCheckboxConfig = {
    id: '',
    parent: {
      id: 'meat',
      formGroup: this.form,
      inlineLabel: 'Meat',
      size: 'small'
      // errorMessages: [{ key: 'invalid', errorLOV: 'ERROR.fieldIsInvalid' }]
    },
    children: [
      {
        id: 'pepperoni',
        formGroup: this.form,
        inlineLabel: 'Pepperoni',
        size: 'small'
      }
    ],
    errorMessages: []
  };

  config2: IMultiCheckboxConfig = {
    id: '',
    parent: {
      id: 'vegetables',
      formGroup: this.form,
      inlineLabel: 'Vegetables',
      size: 'small'
    },
    children: [
      {
        id: 'mashrooms',
        formGroup: this.form,
        inlineLabel: 'Mashrooms',
        size: 'small'
      },
      {
        id: 'onions',
        formGroup: this.form,
        inlineLabel: 'Onions',
        size: 'small'
      },
      {
        id: 'olives',
        formGroup: this.form,
        inlineLabel: 'Olives',
        size: 'small'
      }
    ],
    errorMessages: []
    // errorMessages: [{ key: 'invalid', errorLOV: 'ERROR.fieldIsInvalid' }]
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
  }
}
