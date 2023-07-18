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
      id: 'parent1',
      formGroup: this.form,
      label: 'Parent1',
      size: 'small'
      // mixed: false
    },
    children: [
      {
        id: 'child1',
        formGroup: this.form,
        label: 'Child1',
        size: 'small'
      }
    ]
  };

  config2: IMultiCheckboxConfig = {
    id: '',
    parent: {
      id: 'parent2',
      formGroup: this.form,
      label: 'Parent2',
      size: 'small'
      // mixed: false
    },
    children: [
      {
        id: 'child2',
        formGroup: this.form,
        label: 'child2',
        size: 'small'
      },
      {
        id: 'child22',
        formGroup: this.form,
        label: 'child22',
        size: 'small'
      }
    ]
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
