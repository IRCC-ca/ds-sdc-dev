import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../../share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAutocompleteComponent } from 'ircc-ds-angular-component-library';
import { MultiCheckboxService } from 'ircc-ds-angular-component-library';
import { TranslatedPageComponent } from '../translated-page-component';

import TestArrays from './TestArrays';

@Component({
  selector: 'app-autocomplete-documentation',
  templateUrl: './autocomplete-documentation.component.html',
  styleUrls: ['./autocomplete-documentation.component.scss'],
  providers: [SlugifyPipe]
})
export class AutocompleteDocumentationComponent
  implements OnInit, TranslatedPageComponent
{
  currentLanguage: string = '';
  altLangLink = 'autocomplete';
  form: FormGroup = new FormGroup({});

  testArrays = TestArrays;

  config: IAutocompleteComponent = {
    id: 'auto-complete',
    formGroup: this.form,
    label: 'label',
    hint: 'hint',
    desc: 'desc',
    placeholder: 'placeholder',
    size: 'small',
    suggestions: this.testArrays.quotes
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private slugify: SlugifyPipe,
    private multicheckboxService: MultiCheckboxService
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.config.formGroup.addControl(this.config.id, new FormControl());
    //'', Validators.required
  }

  submitForm() {
    for (const field in this.form.controls) {
      this.multicheckboxService.checkField(
        this.form.get(field),
        field,
        `Field ${field} is required`
      );
    }
  }
}
