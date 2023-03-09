import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import {  ISelectConfig, IProgressTagsConfig, ITabNavConfig } from 'ircc-ds-angular-component-library';
import { IAutoTestComponentConfig, IAutoTestConfigObject } from '../auto-tester/auto-tester.component';
@Component({
  selector: 'app-mahsa',
  templateUrl: './mahsa.component.html',
  styleUrls: ['./mahsa.component.scss']
})
export class MahsaComponent implements OnInit {
  form = new FormGroup({});
  tagForm = new FormGroup({});

  SELECT_ID = 'qa_test_select';
  TAB_ID = 'qa-test-tabs';

  qaSelect:  ISelectConfig = {
    id: this.SELECT_ID,
    formGroup: this.form,
    options: [
      { text: 'Option 1'},
      { text: 'Option 2'},
    ],
  };

  qaTabs: ITabNavConfig = {
    id: this.TAB_ID,
    tab: [
      { id: 'home', title: 'Home', value: 'This is Home' },
      { id: 'profile', title: 'Profile', value: 'This is Profile' },
      { id: 'contact', title: 'Contact', value: 'This is Contact' },
      { id: 'products', title: 'Products', value: 'This is Products' },
      { id: 'login', title: 'Login', value: 'This is Login' },
    ],
  };

  qaTags: IProgressTagsConfig = {
    id: 'tag-test',
  }

  testerConfig: IAutoTestConfigObject = {
    selects: [
      {
        id: 'category', //should be same as config property that we target
        formGroup: this.form,
        label: 'Category',
        options: [
          {
            text: 'secondary'
          },
          {
            text: 'primary'
          },
          {
            text: 'plain'
          }
        ],
      },
      {
        id: 'smallErrorMessages',
        formGroup: this.form,
        label: 'Small Error',
        errorMessages: [
          { key: 'maxlength' , errorLOV: 'ERROR.errorMessage' },
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
          { key:'maxlength' , errorLOV: 'ERROR.errorMessage' },
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
        options: [
          { text: 'large' },
          { text: 'small' }
        ]
      }
    ],
    checkboxes: [
      {
        id: 'required',
        formGroup: this.form,
        inlineLabel: 'Required/Optional',
      },
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
      },
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

  autoTestConfig: IAutoTestComponentConfig = {
    id: 'mahsa_tester',
    formGroup: this.form,
    testFields: this.testerConfig
  };

  tagTestConfig: IAutoTestComponentConfig = {
    id: 'tag_tester',
    formGroup: this.tagForm,
    testFields: this.tagTestConfigObj
  };

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('mahsa-alt');

    this.testerConfig.selects?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerConfig.checkboxes?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerConfig.inputs?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.form.addControl(this.qaSelect.id, new FormControl());

    this.tagTestConfigObj.selects?.forEach(i => {
      this.tagForm.addControl(i.id, new FormControl());
    });

    this.form.valueChanges.subscribe(value => {
      let updatedConfig: ISelectConfig = {
        id: this.SELECT_ID,
        formGroup: this.form
      };

      for(let param in value) {
        updatedConfig = { ...updatedConfig, [param]: value[param] };
        this.qaSelect = updatedConfig;
      }
    });

    this.tagForm.valueChanges.subscribe(value => {
      let tagConf: ISelectConfig = {
        id: 'tag1',
        formGroup: this.tagForm
      };
      for (let param in value) {
        tagConf = { ...tagConf, [param]: value[param] };
        this.qaTags = tagConf;
      }
    });
  }

  disable() {
    this.qaSelect?.formGroup.get(this.qaSelect.id)?.disabled ?
    this.qaSelect?.formGroup.get(this.qaSelect.id)?.enable() :
    this.qaSelect?.formGroup.get(this.qaSelect.id)?.disable();
  }

  setSamllError() {
    if (this.qaSelect?.formGroup.get('smallErrorMessages')?.value === 'Maxlength')  {
      this.qaSelect?.formGroup.get('smallErrorMessages')?.setErrors({'maxlength': { requiredLength: 3, actualLength: 5 }});
    } else if (this.qaSelect?.formGroup.get('smallErrorMessages')?.value === 'TestingError') {
      this.qaSelect?.formGroup.get('smallErrorMessages')?.setErrors({'testingError': true});
    } else {
      this.qaSelect?.formGroup.get('smallErrorMessages')?.
      setErrors({'testingError': true, 'maxlength': { requiredLength: 3, actualLength: 5 }});
    }
  };
  setLargeError() {
    if (this.qaSelect?.formGroup.get('largeErrorMessages')?.value === 'Maxlength')  {
      this.qaSelect?.formGroup.get('largeErrorMessages')?.setErrors({'maxlength': { requiredLength: 3, actualLength: 5 }});
    } else if (this.qaSelect?.formGroup.get('largeErrorMessages')?.value === 'TestingError') {
      this.qaSelect?.formGroup.get('largeErrorMessages')?.setErrors({'testingError': true});
    } else {
      this.qaSelect?.formGroup.get('largeErrorMessages')?.
      setErrors({'testingError': true, 'maxlength': { requiredLength: 3, actualLength: 5 }});
    }
  };
  resetError() {
    this.qaSelect?.formGroup.get('smallErrorMessages')?.reset();
    this.qaSelect?.formGroup.get('largeErrorMessages')?.reset();
  };

  disableSelectedBtn() {
    this.qaTabs?.tab?.forEach((item: any) => {
      if (document.getElementById(item.id)?.hasAttribute("selected")) {
        document.getElementById(item.id)?.setAttribute("disabled", '');
      } else {
        document.getElementById(item.id)?.removeAttribute("disabled");
      }
    });
  };

  size() {
    this.qaTabs.size ? this.qaTabs.size = 'large' : this.qaTabs.size = 'small';
  };
}
