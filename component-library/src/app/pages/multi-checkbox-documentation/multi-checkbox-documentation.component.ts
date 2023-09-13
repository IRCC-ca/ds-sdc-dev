import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../../share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IMultiCheckboxConfig,
  StandAloneFunctions
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
  altLangLink = 'multiCheckbox';
  form: FormGroup = new FormGroup({});

  config: IMultiCheckboxConfig = {
    id: '',
    parent: {
      id: 'meat',
      formGroup: this.form,
      inlineLabel: 'Meat',
      size: 'small'
    },
    children: [
      {
        id: 'pepperoni',
        formGroup: this.form,
        inlineLabel: 'Pepperoni',
        size: 'small'
      }
    ],
    errorMessages: [{ key: 'required', errorLOV: 'ERROR.fieldIsRequired' }]
  };

  config2: IMultiCheckboxConfig = {
    id: '',
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
    errorMessages: [{ key: 'required', errorLOV: 'ERROR.fieldIsRequired' }]
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private slugify: SlugifyPipe,
    private multicheckboxService: MultiCheckboxService,
    public standAloneFunctions: StandAloneFunctions
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.config?.parent?.formGroup.addControl(
      this.config.parent.id,
      new FormControl(false, Validators.requiredTrue)
    );

    this.config.children?.forEach((res) => {
      res.formGroup.addControl(
        res.id,
        new FormControl(false, Validators.requiredTrue)
      );
    });

    this.config2?.parent?.formGroup.addControl(
      this.config2.parent.id,
      new FormControl(false, Validators.requiredTrue)
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
      this.form.get(field)?.markAsTouched();
      this.form.get(field)?.markAsDirty();
      this.multicheckboxService.checkField(field);
    }
  }
}
