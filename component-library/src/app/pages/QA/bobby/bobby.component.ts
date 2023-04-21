import { LanguageSwitchService } from '../@shared/language-switch/language-switch.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  IIconButtonIconConfig,
  IInputComponentConfig
} from 'ircc-ds-angular-component-library';
import {
  IAutoTestComponentConfig,
  IAutoTestConfigObject
} from '../auto-tester/auto-tester.component';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';

export enum InputFieldType {
  BASICINPUTFIELD = 'basicInputConfig',
  PASSWORDINPUTFIELD = 'passwordInputConfig',

}

@Component({
  selector: 'app-bobby',
  templateUrl: './bobby.component.html',
  styleUrls: ['./bobby.component.scss'],
  providers: [SlugifyPipe]
})
export class BobbyComponent implements OnInit {
  showInputComponent: boolean = false;
  BASIC_INPUT_ID = 'basic_input'
  PASSWORD_INPUT_ID = 'password_input'

  INPUT_ID = 'qa_test_input';
  form_input = new FormGroup({})
  form_input_basic = new FormGroup({});
  form_input_password = new FormGroup({});


  qaInput: IInputComponentConfig = {
    id: this.INPUT_ID,
    formGroup: this.form_input
  };

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

  customIconConfigTest: IIconButtonIconConfig = {
    class: 'fa-regular fa-igloo',
    color: 'var(--critical-text)'
  };

  testerConfigInput: IAutoTestConfigObject = {
    inputs: [
      {
        id: 'label',
        formGroup: this.form_input,
        label: 'label/Title'
      },
      {
        id: 'desc',
        formGroup: this.form_input,
        label: 'description'
      },
      {
        id: 'hint',
        formGroup: this.form_input,
        label: 'hint'
      },
      {
        id: 'placeholder',
        formGroup: this.form_input,
        label: 'Placeholder text'
      }
    ],
    checkboxes: [
      {
        id: 'required',
        formGroup: this.form_input,
        inlineLabel: 'required'
      }
    ],
    selects: [
      {
        id: 'type',
        label: 'Type',
        formGroup: this.form_input,
        options: [
          {
            text: 'text'
          },
          {
            text: 'password'
          }
        ]
      },
      {
        id: 'size',
        label: 'Size',
        formGroup: this.form_input,
        options: [
          {
            text: 'small'
          },
          {
            text: 'large'
          }
        ]
      }
    ]
  };


  testInputComponentConfig: IAutoTestComponentConfig = {
    id: 'naseer_input_tester',
    formGroup: this.form_input,
    testFields: this.testerConfigInput
  };

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('naseer-alt');

    //******************************************************************************************************** */
    //********************************* Input Component Tester *********************************************** */
    //******************************************************************************************************** */

    this.testerConfigInput.selects?.forEach((i) => {
      this.form_input.addControl(i.id, new FormControl());
    });
    this.testerConfigInput.checkboxes?.forEach((i) => {
      this.form_input.addControl(i.id, new FormControl());
    });
    this.testerConfigInput.inputs?.forEach((i) => {
      this.form_input.addControl(i.id, new FormControl());
    });

    this.form_input.addControl(this.qaInput.id, new FormControl());
    this.form_input.valueChanges.subscribe((x) => {
      let updatedConfig: IInputComponentConfig = {
        id: this.INPUT_ID,
        formGroup: this.form_input
      };
      if (!x['type']) x['type'] = 'text';
      for (const param in x) {
        updatedConfig = { ...updatedConfig, [param]: x[param] };
        this.qaInput = updatedConfig;
      }
    });
  }

  buttonActions(actionType: string) {
    switch (actionType) {
      case 'inputComponent':
        this.showInputComponent = true;
        break;

      case 'disable-input':
        this.qaInput?.formGroup.get(this.qaInput.id)?.disabled
          ? this.qaInput?.formGroup.get(this.qaInput.id)?.enable()
          : this.qaInput?.formGroup.get(this.qaInput.id)?.disable();
        break;
    }
  }
}
