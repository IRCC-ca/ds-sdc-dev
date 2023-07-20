import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../../share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { FormGroup } from '@angular/forms';
import { IMultiCheckboxConfig } from 'dist/ircc-ds-angular-component-library/lib/form-components/multi-checkbox/multi-checkbox.component';
import { TranslatedPageComponent } from '../translated-page-component';

@Component({
  selector: 'app-multi-checkbox-documentation',
  templateUrl: './multi-checkbox-documentation.component.html',
  styleUrls: ['./multi-checkbox-documentation.component.scss'],
  providers: [SlugifyPipe]
})
export class MultiCheckboxDocumentationComponent implements OnInit, TranslatedPageComponent {

  currentLanguage: string = '';
  altLangLink = 'multi-checkbox-documentation';
  form: FormGroup = new FormGroup({});

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
