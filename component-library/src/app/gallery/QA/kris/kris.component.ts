import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import {
  ICheckBoxComponentConfig,
  ISelectConfig,
  IRadioInputComponentConfig
} from 'ircc-ds-angular-component-library';
import {
  IAutoTestComponentConfig,
  IAutoTestConfigObject
} from '../auto-tester/auto-tester.component';

// Parent components imports
import {
  ParentTemplateComponent,
  TranslateService,
  StandAloneFunctions,
  Router
} from '../../../@shared/templates/parent-template.module';

@Component({
  selector: 'app-kris',
  templateUrl: './kris.component.html',
  styleUrls: ['./kris.component.scss']
})
export class KrisComponent extends ParentTemplateComponent implements OnInit {
  form = new FormGroup({});

  selectConfig: ISelectConfig = {
    id: 'select',
    formGroup: this.form,
    label: 'Testing input select',
    hint: "Try clicking into the select, but not selecting anything on first load to trigger the 'required' error",
    desc: 'Email regex and minLength of 7 - email should be valid, "short" should trigger two errors',
    options: [
      {
        text: 'email@email.com'
      },
      {
        text: 'short'
      }
    ],
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'Required Error'
      },
      {
        key: 'minlength',
        errorLOV: 'Minlength Error'
      },
      {
        key: 'pattern',
        errorLOV: 'Pattern Error'
      }
    ]
  };

  constructor(
    altLang: LanguageSwitchService,
    translate: TranslateService,
    standAloneFunctions: StandAloneFunctions,
    router: Router
  ) {
    super(altLang, translate, standAloneFunctions, router);
  }

  ngOnInit() {
    this.altLang.setAltLangLink('kris-alt');
    this.form.addControl(
      this.selectConfig.id,
      new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ])
    );
    console.log(super.getURL());
  }
}
