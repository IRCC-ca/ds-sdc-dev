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

  form: FormGroup = new FormGroup({});
  INPUT_ID = 'qa_test_input';
  checkboxesConfigs: ICheckBoxComponentConfig[] = [
    { //checkbox1
      id: 'checkbox_label_test',
      formGroup: this.form,
      label: 'Testing Label',
      helpText: 'Hint text',
      desc: 'Description line of text',
      disableFocus: true, //TODO: Not working,
    },
    { //checkbox2
      id: 'checkbox_small_test',
      formGroup: this.form,
      label: 'Small Test',
      size: 'small',
      helpText: 'Hint text',
      desc: 'Description line of small test',
    },
    { //checkbox3
      id: 'checkbox_error_test',
      formGroup: this.form,
      label: 'Error Test',
      customErrorText: 'Error Message',
      helpText: 'Test help text',
      desc: 'Description line of error test',
    },
    {
      id: 'checkbox_form_disabled_test',
      formGroup: this.form,
      label: 'Form Disabled Test',
      helpText: 'Test help text',
      desc: 'Description line of disabled test',
    },
    {
      id: 'checkbox_form_error_test',
      formGroup: this.form,
      label: 'Form Error Test',
      errorMessages: [{key: 'invalid', errorLOV: 'This field is invalid.'}]
    },
    {
      id: 'checkbox_validators_test',
      formGroup: this.form,
      label: 'Form Validators Test',
    },
    {
      id: 'checkbox_mixed_test',
      formGroup: this.form,
      mixed: true,
      label: 'Form Mixed Test',
    },
    {
      id: 'checkbox_mixed_error_test',
      formGroup: this.form,
      mixed: true,
      label: 'Form Mixed Error Test',
      customErrorText: 'Error Message for Mixed Error Test',
      errorMessages: [{key: 'invalid', errorLOV: 'This field is invalid.'}],
      errorIcon: {class: 'fa-solid fa-circle-xmark'}
    },
    {
      id: 'checkbox_mixed_error_test2',
      formGroup: this.form,
      mixed: true,
      size: 'small',
      label: 'Form Mixed Error Small Test',
      customErrorText: 'Error Message for Mixed Error Small Test',
      errorMessages: [{key: 'invalid', errorLOV: 'This field is invalid.'}],
      errorIcon: {class: 'fa-solid fa-circle-xmark'}
    },
  ];

  qaInputConfig : IInputComponentConfig = {
    id: this.INPUT_ID,
    formGroup: this.form
  };
  testerConfig: IAutoTestConfigObject = {
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
      {
        id: 'errorMessages',
        formGroup: this.form,
        label: 'Error message'
      },
    ],
    checkboxes: [
      {
        id: 'required',
        formGroup: this.form,
        label: 'required'
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
      }
    ]
  }
  testComponentConfig: IAutoTestComponentConfig = {
    id: 'michael_tester',
    formGroup: this.form,
    testFields: this.testerConfig
  }
  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('michael-alt');

    this.checkboxesConfigs.forEach(i => {
      if (i.id !== 'checkbox_validators_test') {
        this.form.addControl(i.id, new FormControl());
      }
    })
    this.form.addControl(this.checkboxesConfigs[5]?.id, new FormControl('', [Validators.required]));

    // Auto tester component configs
    this.testerConfig.dropdowns?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerConfig.checkboxes?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerConfig.inputs?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });

    this.form.addControl(this.qaInputConfig.id, new FormControl())

    this.form.valueChanges.subscribe(x => {
      var updatedConfig : IInputComponentConfig = {
        id: this.INPUT_ID,
        formGroup: this.form
      };
      for(let param in x){
        if (x[param] === null) continue;
        updatedConfig = {...updatedConfig, [param] : x[param]}
        // console.log('updatedConfig: ', updatedConfig);
        if (param === 'errorMessages') {
          updatedConfig = {...updatedConfig, [param] : [{
              key: 'invalid',
              errorLOV: x[param]
            }]}
        }
        this.qaInputConfig = updatedConfig;
      }
    })
  }

  buttonActions(actionType: string) {
    switch (actionType) {
      case 'disableCheckbox':
        this.form.get('checkbox_form_disabled_test')?.disabled ?
          this.form.get('checkbox_form_disabled_test')?.enable() : this.form.get('checkbox_form_disabled_test')?.disable();

        this.form.get('checkbox_form_error_test')?.disabled ?
          this.form.get('checkbox_form_error_test')?.enable() : this.form.get('checkbox_form_error_test')?.disable();
        break;
      case 'checkboxError':
        [
          'checkbox_form_error_test',
          this.checkboxesConfigs[2].id,
          this.checkboxesConfigs[7].id,
          this.checkboxesConfigs[8].id
        ].forEach((id) => {
          this.form.get(id)?.valid ?
            this.form.get(id)?.setErrors({ 'invalid': true }) :
            this.form.get(id)?.reset();
        })

        this.form.updateValueAndValidity();
        break;

      case 'inputError':
        this.form.get(this.qaInputConfig.id)?.valid ?
          this.form.get(this.qaInputConfig.id)?.setErrors({ 'invalid': true }) :
          this.form.get(this.qaInputConfig.id)?.reset();

        this.form.updateValueAndValidity();
        break;
    }
  }
}
