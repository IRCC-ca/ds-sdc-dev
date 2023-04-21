import { Component, OnInit } from '@angular/core';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { FormControl, FormGroup } from '@angular/forms';
import {
  IBreadcrumbConfig,
  ICheckBoxComponentConfig,
  IIndicatorConfig,
  IInputComponentConfig
} from 'ircc-ds-angular-component-library';
import {
  IAutoTestComponentConfig,
  IAutoTestConfigObject
} from '../auto-tester/auto-tester.component'; //'/auto-tester/auto-tester.component';
// '@app/gallery/QA/auto-tester/auto-tester.component';

@Component({
  selector: 'app-michael',
  templateUrl: './michael.component.html',
  styleUrls: ['./michael.component.scss']
})
export class MichaelComponent implements OnInit {
  form_0: FormGroup = new FormGroup({});
  form_1: FormGroup = new FormGroup({});
  form_2: FormGroup = new FormGroup({});
  CHECKBOX_ID = 'qa_test_checkbox';
  qaCheckboxConfig: IInputComponentConfig = {
    id: this.CHECKBOX_ID,
    formGroup: this.form_0,
    errorMessages: [
      { key: 'invalid', errorLOV: 'ERROR.fieldIsInvalid' },
      { key: 'testingError', errorLOV: 'ERROR.testErrorMessage' },
      { key: 'maxlength', errorLOV: 'ERROR.fieldExceededMaxLength' }
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
      }
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
        inlineLabel: 'Mixed'
      }
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
  };
  testCheckboxComponentConfig: IAutoTestComponentConfig = {
    id: 'michael_checkbox_tester',
    formGroup: this.form_0,
    testFields: this.testerCheckboxConfig
  };

  form: FormGroup = new FormGroup({});
  INPUT_ID = 'qa_test_input';
  qaInputConfig: IInputComponentConfig = {
    id: this.INPUT_ID,
    formGroup: this.form,
    errorMessages: [
      { key: 'invalid', errorLOV: 'ERROR.fieldIsInvalid' },
      { key: 'testingError', errorLOV: 'ERROR.testErrorMessage' },
      { key: 'maxlength', errorLOV: 'ERROR.fieldExceededMaxLength' }
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
      }
    ],
    checkboxes: [
      {
        id: 'required',
        formGroup: this.form,
        inlineLabel: 'required'
      }
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
  };
  testInputComponentConfig: IAutoTestComponentConfig = {
    id: 'michael_input_tester',
    formGroup: this.form,
    testFields: this.testerInputConfig
  };
  breadCrumbConfig: IBreadcrumbConfig = {
    id: 'breadcrumb0',
    size: 'large',
    type: 'routerLink',
    baseUrlKey: 'ROUTES.LandingPage',
    links: [
      {
        text: 'Home'
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
        text: 'Child Page Title'
      }
    ]
  };

  indicatorConfig: IIndicatorConfig = {
    category: 'strong',
    type: 'dot',
    size: 'large',
    purpose: 'status',
    status: 'primary'
  };

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
      }
    ]
  };

  testBreadCrumbConfig: IAutoTestComponentConfig = {
    id: 'michael_breadcrumb_tester',
    formGroup: this.form_1,
    testFields: this.testerBreadcrumbConfig
  };
  testerIndicatorFieldConfig: IAutoTestConfigObject = {
    inputs: [
      {
        id: 'label',
        formGroup: this.form_2,
        label: 'Label',
        type: 'text'
      }
    ],
    selects: [
      {
        id: 'size',
        label: 'Size',
        formGroup: this.form_2,
        options: [
          {
            text: 'large'
          },
          {
            text: 'small'
          }
        ]
      },
      {
        id: 'type',
        label: 'Type',
        formGroup: this.form_2,
        options: [
          {
            text: 'dot'
          },
          {
            text: 'text'
          },
          {
            text: 'number'
          }
        ]
      },
      {
        id: 'icon',
        label: 'Icon',
        formGroup: this.form_2,
        options: [
          {
            text: 'Code',
            value: 'fa-solid fa-code'
          },
          {
            text: 'Maple Leaf',
            value: 'fa-brands fa-canadian-maple-leaf'
          }
        ]
      },
      {
        id: 'category',
        label: 'Category',
        formGroup: this.form_2,
        options: [
          {
            text: 'strong'
          },
          {
            text: 'weak'
          }
        ]
      },
      {
        id: 'purpose',
        label: 'Purpose',
        formGroup: this.form_2,
        options: [
          {
            text: 'status'
          },
          {
            text: 'palette'
          }
        ]
      },
      {
        id: 'status',
        label: 'Status',
        formGroup: this.form_2,
        options: [
          {
            text: 'information'
          },
          {
            text: 'warning'
          },
          {
            text: 'critical'
          },
          {
            text: 'neutral'
          },
          {
            text: 'primary'
          },
          {
            text: 'success'
          }
        ]
      },
      {
        id: 'palette',
        label: 'Palette',
        formGroup: this.form_2,
        options: [
          {
            text: 'teal'
          },
          {
            text: 'orange'
          },
          {
            text: 'red'
          },
          {
            text: 'grey'
          },
          {
            text: 'blue'
          },
          {
            text: 'green'
          },
          {
            text: 'purple'
          },
          {
            text: 'navy'
          }
        ]
      }
    ]
  };

  testIndicatorConfig: IAutoTestComponentConfig = {
    id: 'michael_indicator_tester',
    formGroup: this.form_2,
    testFields: this.testerIndicatorFieldConfig
  };

  constructor(private lang: LangSwitchService) {}

  ngOnInit() {
    this.lang.setAltLangLink('michael');

    // Auto tester component configs - Input
    this.testerInputConfig.selects?.forEach((i) => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerInputConfig.checkboxes?.forEach((i) => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerInputConfig.inputs?.forEach((i) => {
      this.form.addControl(i.id, new FormControl());
    });

    this.form.addControl(this.qaInputConfig.id, new FormControl());

    this.form.valueChanges.subscribe((x) => {
      let updatedConfig: IInputComponentConfig = {
        id: this.INPUT_ID,
        formGroup: this.form,
        errorMessages: this.qaInputConfig.errorMessages
      };
      for (const param in x) {
        if (x[param] === null) continue;
        updatedConfig = { ...updatedConfig, [param]: x[param] };
        // console.log('updatedConfig: ', updatedConfig);
        this.qaInputConfig = updatedConfig;
      }
    });
    this.form.patchValue({
      type: 'text'
    });

    // Auto tester component configs - Checkbox
    this.testerCheckboxConfig.selects?.forEach((i) => {
      this.form_0.addControl(i.id, new FormControl());
    });
    this.testerCheckboxConfig.checkboxes?.forEach((i) => {
      this.form_0.addControl(i.id, new FormControl());
    });
    this.testerCheckboxConfig.inputs?.forEach((i) => {
      this.form_0.addControl(i.id, new FormControl());
    });

    this.form_0.addControl(this.qaCheckboxConfig.id, new FormControl());
    this.form_0.valueChanges.subscribe((x) => {
      let updatedConfig: ICheckBoxComponentConfig = {
        id: this.CHECKBOX_ID,
        formGroup: this.form_0,
        errorMessages: this.qaCheckboxConfig.errorMessages
      };
      for (const param in x) {
        if (x[param] === null) continue;
        updatedConfig = { ...updatedConfig, [param]: x[param] };
        // console.log('updatedConfig: ', updatedConfig);
        this.qaCheckboxConfig = updatedConfig;
      }
    });
    // Set default values for Checkbox
    this.form_0.patchValue({
      label: 'Test label',
      inlineLabel: 'Test inline label',
      desc: 'Description line of text',
      helpText: 'Test help text'
    });

    // Auto tester component configs - Breadcrumb
    this.testerBreadcrumbConfig.selects?.forEach((i) => {
      this.form_1.addControl(i.id, new FormControl());
    });
    this.form_1.addControl(this.breadCrumbConfig.id, new FormControl());
    this.form_1.valueChanges.subscribe((x) => {
      let updatedConfig: IBreadcrumbConfig = { ...this.breadCrumbConfig };
      for (const param in x) {
        if (x[param] === null) continue;
        updatedConfig = { ...updatedConfig, [param]: x[param] };
        // console.log('updatedConfig: ', updatedConfig);

        this.breadCrumbConfig = updatedConfig;
      }
    });
    this.form_1.patchValue({
      size: 'large',
      type: 'routerLink'
    });

    // Auto tester component configs - Indicator
    this.testerIndicatorFieldConfig.inputs?.forEach((i) => {
      this.form_2.addControl(i.id, new FormControl());
    });
    this.testerIndicatorFieldConfig.selects?.forEach((i) => {
      this.form_2.addControl(i.id, new FormControl());
    });

    this.form_2.addControl(this.testIndicatorConfig.id, new FormControl());
    this.form_2.valueChanges.subscribe((x) => {
      let updatedConfig: IIndicatorConfig = { ...this.indicatorConfig };
      for (const param in x) {
        if (x[param] === null) continue;
        updatedConfig = { ...updatedConfig, [param]: x[param] };
        if (updatedConfig?.type === 'number') {
          updatedConfig = {
            ...updatedConfig,
            label: isNaN(Number(updatedConfig?.label))
              ? 1
              : Number(updatedConfig?.label)
          };
        }
      }
      this.indicatorConfig = updatedConfig;
    });
    this.form_2.patchValue({
      category: 'strong',
      type: 'dot',
      size: 'large',
      purpose: 'status',
      palette: 'generic'
    });
  }

  buttonActions(actionType: string) {
    switch (actionType) {
      case 'disableCheckbox':
        this.form_0.get(this.CHECKBOX_ID)?.disabled
          ? this.form_0.get(this.CHECKBOX_ID)?.enable()
          : this.form_0.get(this.CHECKBOX_ID)?.disable();
        break;
      case 'checkboxError':
        this.form_0.get(this.CHECKBOX_ID)?.valid
          ? this.form_0.get(this.CHECKBOX_ID)?.setErrors({ invalid: true })
          : this.form_0.get(this.CHECKBOX_ID)?.reset();

        this.form.updateValueAndValidity();
        break;

      case 'inputError':
        this.form.get(this.qaInputConfig.id)?.valid
          ? this.form.get(this.qaInputConfig.id)?.setErrors({ invalid: true })
          : this.form.get(this.qaInputConfig.id)?.reset();

        this.form.updateValueAndValidity();
        break;
      case 'setInputError':
        this.form.get(this.qaInputConfig.id)?.setErrors({
          invalid: true,
          testingError: true,
          maxlength: { requiredLength: 3, actualLength: 5 }
        });
        this.form.updateValueAndValidity();
        break;
      case 'removeInputError':
        this.form.get(this.qaInputConfig.id)?.setErrors({ errors: null });
        this.form.updateValueAndValidity();
        break;
    }
  }

  toggleComp(comp: string) {
    document.querySelectorAll('section')?.forEach((section) => {
      section.classList.remove('show');
    });
    document.getElementById(comp)?.classList.toggle('show');
  }
}
