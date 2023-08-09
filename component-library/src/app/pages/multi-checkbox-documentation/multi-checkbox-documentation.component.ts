import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../../share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IMultiCheckboxConfig,
  ISelectConfig
} from 'ircc-ds-angular-component-library';
import { MultiCheckboxService } from 'ircc-ds-angular-component-library';
import { TranslatedPageComponent } from '../translated-page-component';

@Component({
  selector: 'app-multi-checkbox-documentation',
  templateUrl: './multi-checkbox-documentation.component.html',
  styleUrls: ['./multi-checkbox-documentation.component.scss'],
  providers: [SlugifyPipe]
})
export class MultiCheckboxDocumentationComponent
  implements OnInit, TranslatedPageComponent
{
  currentLanguage: string = '';
  altLangLink = 'multi-checkbox-documentation';
  form: FormGroup = new FormGroup({});

  selectConfig: ISelectConfig = {
    id: 'select_conf',
    options: [{ text: 'op1' }, { text: 'op2' }, { text: 'op3' }],
    placeholder: 'test',
    formGroup: this.form
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
        id: 'mushrooms',
        formGroup: this.form,
        inlineLabel: 'Mushrooms',
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
    private slugify: SlugifyPipe,
    private multicheckboxService: MultiCheckboxService
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.config.parent.formGroup.addControl(
      this.config.parent.id,
      new FormControl(false)
    );

    this.config.children?.forEach((res) => {
      res.formGroup.addControl(
        res.id,
        new FormControl(false, Validators.requiredTrue)
      );
    });

    this.config2.parent.formGroup.addControl(
      this.config2.parent.id,
      new FormControl(false)
    );

    this.config2.children?.forEach((res) => {
      res.formGroup.addControl(
        res.id,
        new FormControl(false, Validators.requiredTrue)
      );
    });
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
