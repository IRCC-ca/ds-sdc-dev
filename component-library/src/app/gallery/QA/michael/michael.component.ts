import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {ICheckBoxComponentConfig, IInputComponentConfig} from 'ircc-ds-angular-component-library';
import {IAutoTestComponentConfig, IAutoTestConfigObject} from "@app/gallery/QA/auto-tester/auto-tester.component";

@Component({
  selector: 'app-michael',
  templateUrl: './michael.component.html',
  styleUrls: ['./michael.component.scss']
})
export class MichaelComponent implements OnInit {

  form_0: FormGroup = new FormGroup({});
  CHECKBOX_ID = 'qa_test_checkbox';
  qaCheckboxConfig : IInputComponentConfig = {
    id: this.CHECKBOX_ID,
    formGroup: this.form_0,
    errorMessages: [
      {key: 'invalid', errorLOV: 'This field is invalid.'},
      {key: 'testingError', errorLOV: 'Test error message.'},
      {key: 'maxlength' , errorLOV:'This field has exceeded max length.'},
    ]
  };
  testerCheckboxConfig: IAutoTestConfigObject = {
    inputs: [
      {
        id: 'label',
        formGroup: this.form_0,
        label: 'Label/ Title'
      },
      {
        id: 'desc',
        formGroup: this.form_0,
        label: 'Description'
      },
      {
        id: 'helpText',
        formGroup: this.form_0,
        label: 'Help Text'
      },
      {
        id: 'inlineLabel',
        formGroup: this.form_0,
        label: 'Inline Label'
      },
    ],
    checkboxes: [
      {
        id: 'required',
        formGroup: this.form_0,
        inlineLabel: 'Required',
      },
      {
        id: 'mixed',
        formGroup: this.form_0,
        inlineLabel: 'Mixed',
      },
    ],
    dropdowns: [
      {
        id: 'size',
        label: 'Size',
        formGroup: this.form_0,
        options: [
          {
            text: 'small'
          },
          {
            text: 'large'
          }
        ]
      },
      {
        id: 'errorIcon',
        label: 'Error Icon',
        formGroup: this.form_0,
        options: [
          {
            text: 'X mark',
            value: 'fa-solid fa-circle-xmark'
          },
          {
            text: 'Skull crossbones',
            value: 'fa-solid fa-skull-crossbones'
          }
        ]
      }
    ]
  }
  testCheckboxComponentConfig: IAutoTestComponentConfig = {
    id: 'michael_checkbox_tester',
    formGroup: this.form_0,
    testFields: this.testerCheckboxConfig
  }

  checkboxesConfigs: ICheckBoxComponentConfig[] = [
    { //checkbox1
      id: 'checkbox_label_test',
      formGroup: this.form_0,
      label: 'Label text',
      required: true,
      inlineLabel: 'Testing Label',
      helpText: 'Hint text',
      desc: 'Description line of text',
      disableFocus: true, //TODO: Not working,
    },
    { //checkbox2
      id: 'checkbox_small_test',
      formGroup: this.form_0,
      label: 'Label text',
      required: true,
      inlineLabel: 'Small Test',
      size: 'small',
      helpText: 'Hint text',
      desc: 'Description line of small test',
    },
    { //checkbox3
      id: 'checkbox_error_test',
      formGroup: this.form_0,
      inlineLabel: 'Error Test',
      customErrorText: 'Error Message',
      helpText: 'Test help text',
      desc: 'Description line of error test',
    },
    {
      id: 'checkbox_form_disabled_test',
      formGroup: this.form_0,
      inlineLabel: 'Form Disabled Test',
      helpText: 'Test help text',
      desc: 'Description line of disabled test',
    },
    {
      id: 'checkbox_form_error_test',
      formGroup: this.form_0,
      inlineLabel: 'Form Error Test',
      errorMessages: [{key: 'invalid', errorLOV: 'This field is invalid.'}]
    },
    {
      id: 'checkbox_validators_test',
      formGroup: this.form_0,
      inlineLabel: 'Form Validators Test',
    },
    {
      id: 'checkbox_mixed_test',
      formGroup: this.form_0,
      mixed: true,
      inlineLabel: 'Form Mixed Test',
    },
    {
      id: 'checkbox_mixed_error_test',
      formGroup: this.form_0,
      mixed: true,
      inlineLabel: 'Form Mixed Error Test',
      customErrorText: 'Error Message for Mixed Error Test',
      errorMessages: [{key: 'invalid', errorLOV: 'This field is invalid.'}],
      errorIcon: {class: 'fa-solid fa-circle-xmark'}
    },
    {
      id: 'checkbox_mixed_error_test2',
      formGroup: this.form_0,
      mixed: true,
      size: 'small',
      inlineLabel: 'Form Mixed Error Small Test',
      customErrorText: 'Error Message for Mixed Error Small Test',
      errorMessages: [{key: 'invalid', errorLOV: 'This field is invalid.'}],
      errorIcon: {class: 'fa-solid fa-circle-xmark'}
    },
  ];

  form: FormGroup = new FormGroup({});
  INPUT_ID = 'qa_test_input';
  qaInputConfig : IInputComponentConfig = {
    id: this.INPUT_ID,
    formGroup: this.form,
    errorMessages: [
      {key: 'invalid', errorLOV: 'This field is invalid.'},
      {key: 'testingError', errorLOV: 'Test error message.'},
      {key: 'maxlength' , errorLOV:'This field has exceeded max length.'},
    ]
  };
  testerInputConfig: IAutoTestConfigObject = {
    inputs: [
      {
        id: 'label',
        formGroup: this.form,
        label: 'label/Title'
      },
      {
        id: 'desc',
        formGroup: this.form,
        label: 'description'
      },
      {
        id: 'hint',
        formGroup: this.form,
        label: 'hint'
      },
      {
        id: 'placeholder',
        formGroup: this.form,
        label: 'Placeholder text'
      },
    ],
    checkboxes: [
      {
        id: 'required',
        formGroup: this.form,
        inlineLabel: 'required'
      },
    ],
    dropdowns: [
      {
        id: 'type',
        label: 'Type',
        formGroup: this.form,
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
        formGroup: this.form,
        options: [
          {
            text: 'small'
          },
          {
            text: 'large'
          }
        ]
      },
      {
        id: 'errorIcon',
        label: 'Error Icon',
        formGroup: this.form,
        options: [
          {
            text: 'X mark',
            value: 'fa-solid fa-circle-xmark'
          },
          {
            text: 'Skull crossbones',
            value: 'fa-solid fa-skull-crossbones'
          }
        ]
      }
    ]
  }
  testInputComponentConfig: IAutoTestComponentConfig = {
    id: 'michael_input_tester',
    formGroup: this.form,
    testFields: this.testerInputConfig
  }
  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('michael-alt');

    this.checkboxesConfigs.forEach(i => {
      if (i.id !== 'checkbox_validators_test') {
        this.form_0.addControl(i.id, new FormControl());
      }
    })
    this.form_0.addControl(this.checkboxesConfigs[5]?.id, new FormControl('', [Validators.required]));

    // Auto tester component configs - Input
    this.testerInputConfig.dropdowns?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerInputConfig.checkboxes?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerInputConfig.inputs?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });

    this.form.addControl(this.qaInputConfig.id, new FormControl())

    this.form.valueChanges.subscribe(x => {
      var updatedConfig : IInputComponentConfig = {
        id: this.INPUT_ID,
        formGroup: this.form,
        errorMessages: this.qaInputConfig.errorMessages
      };
      for(let param in x){
        if (x[param] === null) continue;
        updatedConfig = {...updatedConfig, [param] : x[param]}
        // console.log('updatedConfig: ', updatedConfig);
        if (param === 'errorIcon') {
          updatedConfig = {...updatedConfig, ['errorIcon'] : {
              class: x[param]
            }}
        }
        this.qaInputConfig = updatedConfig;
      }
    })

    // Auto tester component configs - Checkbox
    this.testerCheckboxConfig.dropdowns?.forEach(i => {
      this.form_0.addControl(i.id, new FormControl());
    });
    this.testerCheckboxConfig.checkboxes?.forEach(i => {
      this.form_0.addControl(i.id, new FormControl());
    });
    this.testerCheckboxConfig.inputs?.forEach(i => {
      this.form_0.addControl(i.id, new FormControl());
    });

    this.form_0.addControl(this.qaCheckboxConfig.id, new FormControl());
    this.form_0.valueChanges.subscribe(x => {
      let updatedConfig: ICheckBoxComponentConfig = {
        id: this.CHECKBOX_ID,
        formGroup: this.form_0,
        errorMessages: this.qaCheckboxConfig.errorMessages
      };
      for(let param in x){
        if (x[param] === null) continue;
        updatedConfig = {...updatedConfig, [param] : x[param]}
        // console.log('updatedConfig: ', updatedConfig);
        if (param === 'errorIcon') {
          updatedConfig = {...updatedConfig, ['errorIcon'] : {
              class: x[param]
            }}
        }
        this.qaCheckboxConfig = updatedConfig;
      }
    })
    // Set default values for Checkbox
    this.form_0.patchValue({
      'label': 'Test label',
      'inlineLabel': 'Test inline label',
      'desc': 'Description line of text',
      'helpText': 'Test help text'
    });
  }

  buttonActions(actionType: string) {
    switch (actionType) {
      case 'disableCheckbox':
        this.form_0.get(this.CHECKBOX_ID)?.disabled ?
          this.form_0.get(this.CHECKBOX_ID)?.enable() : this.form_0.get(this.CHECKBOX_ID)?.disable();
        break;
      case 'checkboxError':
        this.form_0.get(this.CHECKBOX_ID)?.valid ?
          this.form_0.get(this.CHECKBOX_ID)?.setErrors({ 'invalid': true }) :
          this.form_0.get(this.CHECKBOX_ID)?.reset();

        this.form.updateValueAndValidity();
        break;

      case 'inputError':
        this.form.get(this.qaInputConfig.id)?.valid ?
          this.form.get(this.qaInputConfig.id)?.setErrors({ 'invalid': true }) :
          this.form.get(this.qaInputConfig.id)?.reset();

        this.form.updateValueAndValidity();
        break;
      case 'setInputError':
        this.form.get(this.qaInputConfig.id)?.
          setErrors({
            'invalid': true,
            'testingError': true,
            'maxlength': { requiredLength: 3, actualLength: 5 }});
        this.form.updateValueAndValidity();
        break;
      case 'removeInputError':
        this.form.get(this.qaInputConfig.id)?.setErrors({errors: null});
        this.form.updateValueAndValidity();
        break;
    }
  }
}
