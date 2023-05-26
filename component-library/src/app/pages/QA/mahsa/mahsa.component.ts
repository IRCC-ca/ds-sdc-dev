import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { LanguageSwitchService } from '../@shared/language-switch/language-switch.service'; //'@app/@shared/language-switch/language-switch.service';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import {
  ISelectConfig,
  IProgressTagsConfig,
  ITabNavConfig,
  ISpinnerConfig
} from 'ircc-ds-angular-component-library';
import {
  IAutoTestComponentConfig,
  IAutoTestConfigObject
} from '../auto-tester/auto-tester.component';
@Component({
  selector: 'app-mahsa',
  templateUrl: './mahsa.component.html',
  styleUrls: ['./mahsa.component.scss']
})
export class MahsaComponent implements OnInit {
  toggleComp(comp: string) {
    document.querySelectorAll('section')?.forEach((section) => {
      section.classList.remove('show');
    });
    document.getElementById(comp)?.classList.toggle('show');
  }

  form = new FormGroup({});
  tagForm = new FormGroup({});
  spinnerForm = new FormGroup({});

  SELECT_ID = 'qa_test_select';
  TAB_ID = 'qa-test-tabs';
  SPINNER_ID = 'qa-test-spinner';
  TAG_ID = 'qa-tag-test';

  /** Configs: */
  qaSelect: ISelectConfig = {
    id: this.SELECT_ID,
    formGroup: this.form,
    options: [{ text: 'Option 1' }, { text: 'Option 2' }]
  };

  qaTabs: ITabNavConfig = {
    id: this.TAB_ID,
    tab: [
      { id: 'home', title: 'Home', value: 'This is Home' },
      { id: 'profile', title: 'Profile', value: 'This is Profile' },
      { id: 'contact', title: 'Contact', value: 'This is Contact' },
      { id: 'products', title: 'Products', value: 'This is Products' },
      { id: 'login', title: 'Login', value: 'This is Login' }
    ]
  };

  qaTags: IProgressTagsConfig = {
    id: this.TAG_ID
  };

  qaSpinner: ISpinnerConfig = {
    id: this.SPINNER_ID
  };

  /** Test config objects */
  selectTesterConfig: IAutoTestConfigObject = {
    selects: [
      {
        id: 'smallErrorMessages',
        formGroup: this.form,
        label: 'Small Error',
        errorMessages: [
          { key: 'maxlength', errorLOV: 'ERROR.errorMessage' },
          { key: 'testingError', errorLOV: 'ERROR.errorMessageMahsa' }
        ],
        options: [
          { text: 'Maxlength' },
          { text: 'TestingError' },
          { text: 'Both Errors' }
        ],
        size: 'small'
      },
      {
        id: 'largeErrorMessages',
        formGroup: this.form,
        label: 'Large Error',
        errorMessages: [
          { key: 'maxlength', errorLOV: 'ERROR.errorMessage' },
          { key: 'testingError', errorLOV: 'ERROR.errorMessageMahsa' }
        ],
        options: [
          { text: 'Maxlength' },
          { text: 'TestingError' },
          { text: 'Both Errors' }
        ],
        size: 'large'
      },
      {
        id: 'size',
        formGroup: this.form,
        label: 'Size',
        options: [{ text: 'large' }, { text: 'small' }]
      }
    ],
    checkboxes: [
      {
        id: 'required',
        formGroup: this.form,
        inlineLabel: 'Required/Optional'
      }
    ],
    inputs: [
      {
        id: 'label',
        formGroup: this.form,
        label: 'Label'
      },
      {
        id: 'desc',
        formGroup: this.form,
        label: 'Description'
      },
      {
        id: 'hint',
        formGroup: this.form,
        label: 'Hint'
      }
    ]
  };

  tagTestConfigObj: IAutoTestConfigObject = {
    selects: [
      {
        id: 'type',
        label: 'Type',
        formGroup: this.tagForm,
        options: [
          {
            text: 'primary'
          },
          {
            text: 'success'
          },
          {
            text: 'critical'
          },
          {
            text: 'locked'
          },
          {
            text: 'notStarted'
          }
        ]
      },
      {
        id: 'size',
        label: 'Size',
        formGroup: this.tagForm,
        options: [
          {
            text: 'large'
          },
          {
            text: 'small'
          }
        ]
      }
    ]
  };

  spinnerTestConfigObj: IAutoTestConfigObject = {
    selects: [
      {
        id: 'type',
        label: 'Type',
        formGroup: this.spinnerForm,
        options: [
          {
            text: 'active'
          },
          {
            text: 'success'
          },
          {
            text: 'critical'
          }
        ]
      },
      {
        id: 'size',
        label: 'Size',
        formGroup: this.spinnerForm,
        options: [
          {
            text: 'large'
          },
          {
            text: 'small'
          },
          {
            text: 'extraSmall'
          }
        ]
      },
      {
        id: 'orientation',
        label: 'Orientation',
        formGroup: this.spinnerForm,
        options: [
          {
            text: 'horizontal'
          },
          {
            text: 'vertical'
          }
        ]
      }
    ],
    inputs: [
      {
        id: 'label',
        formGroup: this.spinnerForm,
        label: 'Label'
      },
      {
        id: 'description',
        formGroup: this.spinnerForm,
        label: 'Description'
      }
    ]
  };

  autoTestConfig: IAutoTestComponentConfig = {
    id: 'mahsa_tester',
    formGroup: this.form,
    testFields: this.selectTesterConfig
  };

  tagTestConfig: IAutoTestComponentConfig = {
    id: 'tag_tester',
    formGroup: this.tagForm,
    testFields: this.tagTestConfigObj
  };

  spinnerTestConfig: IAutoTestComponentConfig = {
    id: 'spinner_tester',
    formGroup: this.spinnerForm,
    testFields: this.spinnerTestConfigObj
  };

  constructor(private lang: LangSwitchService) {}

  ngOnInit() {
    this.lang.setAltLangLink('mahsa');
    this.form.addControl(this.qaSelect.id, new FormControl());

    /** Select Auto-Testing Controls Init **/
    this.selectTesterConfig.selects?.forEach((i) => {
      this.form.addControl(i.id, new FormControl());
    });
    this.selectTesterConfig.checkboxes?.forEach((i) => {
      this.form.addControl(i.id, new FormControl());
    });
    this.selectTesterConfig.inputs?.forEach((i) => {
      this.form.addControl(i.id, new FormControl());
    });

    console.log(this.form);

    /** Tag Auto-Testing Controls Init **/
    this.tagTestConfigObj.selects?.forEach((i) => {
      this.tagForm.addControl(i.id, new FormControl());
    });
    /** Spinner Auto-Testing Controls Init **/
    this.spinnerTestConfigObj.selects?.forEach((i) => {
      this.spinnerForm.addControl(i.id, new FormControl());
    });
    this.spinnerTestConfigObj.inputs?.forEach((i) => {
      this.spinnerForm.addControl(i.id, new FormControl());
    });

    this.form.valueChanges.subscribe((value) => {
      let updatedConfig: ISelectConfig = {
        id: this.SELECT_ID,
        formGroup: this.form,
        options: [{ text: 'Option 1' }, { text: 'Option 2' }]
      };
      Object.keys(value).forEach((param) => {
        if (!value['label']) delete this.qaSelect.label;
        if (!value['desc']) delete this.qaSelect.desc;
        if (!value['hint']) delete this.qaSelect.hint;
        if (value[param]) {
          // this.qaSelect = { ...this.qaSelect, [param]: value[param] }
          updatedConfig = { ...updatedConfig, [param]: value[param] };
          this.qaSelect = updatedConfig;
        }
      });
    });

    this.tagForm.valueChanges.subscribe((value) => {
      Object.keys(value).forEach((param) => {
        if (value[param]) {
          this.qaTags = { ...this.qaTags, [param]: value[param] };
        }
      });
    });

    this.spinnerForm.valueChanges.subscribe((value) => {
      Object.keys(value).forEach((param) => {
        if (
          (value['size'] === 'small' || value['size'] === 'extraSmall') &&
          value['orientation'] === 'vertical'
        ) {
          value['orientation'] = 'horizontal';
        }
        if (!value['label']) delete this.qaSpinner.label;
        if (!value['description']) delete this.qaSpinner.description;
        if (value[param]) {
          this.qaSpinner = { ...this.qaSpinner, [param]: value[param] };
        }
      });
    });
  }

  disable() {
    this.qaSelect?.formGroup.get(this.qaSelect.id)?.disabled
      ? this.qaSelect?.formGroup.get(this.qaSelect.id)?.enable()
      : this.qaSelect?.formGroup.get(this.qaSelect.id)?.disable();
  }

  setSamllError() {
    if (
      this.qaSelect?.formGroup.get('smallErrorMessages')?.value === 'Maxlength'
    ) {
      this.qaSelect?.formGroup
        .get('smallErrorMessages')
        ?.setErrors({ maxlength: { requiredLength: 3, actualLength: 5 } });
    } else if (
      this.qaSelect?.formGroup.get('smallErrorMessages')?.value ===
      'TestingError'
    ) {
      this.qaSelect?.formGroup
        .get('smallErrorMessages')
        ?.setErrors({ testingError: true });
    } else {
      this.qaSelect?.formGroup.get('smallErrorMessages')?.setErrors({
        testingError: true,
        maxlength: { requiredLength: 3, actualLength: 5 }
      });
    }
  }
  setLargeError() {
    if (
      this.qaSelect?.formGroup.get('largeErrorMessages')?.value === 'Maxlength'
    ) {
      this.qaSelect?.formGroup
        .get('largeErrorMessages')
        ?.setErrors({ maxlength: { requiredLength: 3, actualLength: 5 } });
    } else if (
      this.qaSelect?.formGroup.get('largeErrorMessages')?.value ===
      'TestingError'
    ) {
      this.qaSelect?.formGroup
        .get('largeErrorMessages')
        ?.setErrors({ testingError: true });
    } else {
      this.qaSelect?.formGroup.get('largeErrorMessages')?.setErrors({
        testingError: true,
        maxlength: { requiredLength: 3, actualLength: 5 }
      });
    }
  }
  resetError() {
    this.qaSelect?.formGroup.get('smallErrorMessages')?.reset();
    this.qaSelect?.formGroup.get('largeErrorMessages')?.reset();
  }

  disableSelectedBtn() {
    this.qaTabs?.tab?.forEach((item: any) => {
      if (document.getElementById(item.id)?.hasAttribute('selected')) {
        document.getElementById(item.id)?.setAttribute('disabled', '');
      } else {
        document.getElementById(item.id)?.removeAttribute('disabled');
      }
    });
  }

  size() {
    this.qaTabs.size
      ? (this.qaTabs.size = 'large')
      : (this.qaTabs.size = 'small');
  }

  hideShowError() {
    document.getElementById('spinner-div')?.toggleAttribute('hidden');
    this.qaSpinner.type = 'active';
    this.qaSpinner.label = 'Loading';
    this.qaSpinner.description = 'This is Loading!';
    setTimeout(() => {
      this.qaSpinner.type = 'critical';
      this.qaSpinner.label = 'Error Label';
      this.qaSpinner.description = 'Error Description';
    }, 2000);
  }
  hideShowSuccess() {
    document.getElementById('spinner-div2')?.toggleAttribute('hidden');
    this.qaSpinner.type = 'active';
    this.qaSpinner.label = 'Loading';
    this.qaSpinner.description = 'This is Loading!';
    setTimeout(() => {
      this.qaSpinner.type = 'success';
      this.qaSpinner.label = 'Success Label';
      this.qaSpinner.description = 'Success Description';
    }, 2000);
  }
}
