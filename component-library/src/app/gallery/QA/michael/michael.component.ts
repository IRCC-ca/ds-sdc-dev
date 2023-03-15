import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { FormControl, FormGroup } from "@angular/forms";
import {
  IBreadcrumbConfig,
  ICheckBoxComponentConfig,
  IIndicatorConfig,
  IInputComponentConfig
} from 'ircc-ds-angular-component-library';
import {IAutoTestComponentConfig, IAutoTestConfigObject} from "@app/gallery/QA/auto-tester/auto-tester.component";

@Component({
  selector: 'app-michael',
  templateUrl: './michael.component.html',
  styleUrls: ['./michael.component.scss']
})
export class MichaelComponent implements OnInit {

  form_0: FormGroup = new FormGroup({});
  form_1: FormGroup = new FormGroup({});
  CHECKBOX_ID = 'qa_test_checkbox';
  qaCheckboxConfig : IInputComponentConfig = {
    id: this.CHECKBOX_ID,
    formGroup: this.form_0,
    errorMessages: [
      {key: 'invalid', errorLOV: 'ERROR.fieldIsInvalid'},
      {key: 'testingError', errorLOV: 'ERROR.testErrorMessage'},
      {key: 'maxlength' , errorLOV:'ERROR.fieldExceededMaxLength'},
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
        inlineLabelBold: true
      },
      {
        id: 'mixed',
        formGroup: this.form_0,
        inlineLabel: 'Mixed',
      },
    ],
    selects: [
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

  form: FormGroup = new FormGroup({});
  INPUT_ID = 'qa_test_input';
  qaInputConfig : IInputComponentConfig = {
    id: this.INPUT_ID,
    formGroup: this.form,
    errorMessages: [
      {key: 'invalid', errorLOV: 'ERROR.fieldIsInvalid'},
      {key: 'testingError', errorLOV: 'ERROR.testErrorMessage'},
      {key: 'maxlength' , errorLOV: 'ERROR.fieldExceededMaxLength'},
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
    selects: [
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
  breadCrumbConfig: IBreadcrumbConfig = {
    id: "breadcrumb0",
    size: 'large',
    type: 'routerLink',
    baseUrlKey: 'ROUTES.LandingPage',
    links: [
      {
        text: 'Home',
      },
      {
        text: 'QA.header',
        linkKey: 'ROUTES.QATesting'
      },
      {
        text: 'QA.michael',
        linkKey: 'ROUTES.michael'
      },
      {
        text: 'Child Page Title',
      }
    ],
  };

  indicatorConfigs: IIndicatorConfig[] = [
    {
      label: 3,
      category: 'strong',
      type: 'dot',
      size: 'large',
      purpose: 'palette',
      palette: 'purple'
    },
    {
      label: 'Label',
      icon: 'fa-solid fa-code',
      category: 'strong',
      type: 'text',
      size: 'small',
      purpose: 'palette',
      palette: 'purple'
    },
    {
      label: 'Label',
      icon: 'fa-solid fa-code',
      category: 'weak',
      type: 'text',
      size: 'small',
      purpose: 'palette',
      palette: 'navy'
    },
    {
      label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      icon: 'fa-solid fa-code',
      category: 'strong',
      type: 'text',
      size: 'large',
      purpose: 'palette',
      palette: 'purple'
    },
    {
      label: 'L',
      category: 'strong',
      type: 'text',
      size: 'large',
      purpose: 'palette',
      palette: 'purple'
    },
    {
      label: 88,
      category: 'strong',
      type: 'number',
      size: 'large',
      purpose: 'palette',
      palette: 'purple'
    },
    {
      label: 1,
      category: 'strong',
      type: 'number',
      size: 'large',
      purpose: 'status',
      status: 'warning'
    },
    {
      label: 999,
      category: 'strong',
      type: 'number',
      size: 'large',
      purpose: 'status',
      status: 'generic'
    },
  ]

  testerBreadcrumbConfig: IAutoTestConfigObject = {
    selects: [
      {
        id: 'size',
        label: 'Size',
        formGroup: this.form_1,
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
        id: 'type',
        label: 'Type',
        formGroup: this.form_1,
        options: [
          {
            text: 'href'
          },
          {
            text: 'routerLink'
          }
        ]
      },
    ]
  };

  testBreadCrumbConfig: IAutoTestComponentConfig = {
    id: 'michael_breadcrumb_tester',
    formGroup: this.form_1,
    testFields: this.testerBreadcrumbConfig,
  };

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('michael-alt');

    // Auto tester component configs - Input
    this.testerInputConfig.selects?.forEach(i => {
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
    this.form.patchValue({
      'type': 'text'
    });

    // Auto tester component configs - Checkbox
    this.testerCheckboxConfig.selects?.forEach(i => {
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

    // Auto tester component configs - Breadcrumb
    this.testerBreadcrumbConfig.selects?.forEach(i => {
      this.form_1.addControl(i.id, new FormControl());
    });
    this.form_1.addControl(this.breadCrumbConfig.id, new FormControl());
    this.form_1.valueChanges.subscribe(x => {
      let updatedConfig: IBreadcrumbConfig = {...this.breadCrumbConfig};
      for(let param in x){
        if (x[param] === null) continue;
        updatedConfig = {...updatedConfig, [param] : x[param]}
        // console.log('updatedConfig: ', updatedConfig);

        this.breadCrumbConfig = updatedConfig;
      }
    })
    this.form_1.patchValue({
      'size': 'large',
      'type': 'routerLink'
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
