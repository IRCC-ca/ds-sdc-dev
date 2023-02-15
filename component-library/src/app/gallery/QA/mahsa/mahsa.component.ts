import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { IDropdownInputConfig, ITabNavConfig } from 'ircc-ds-angular-component-library';
import { IAutoTestComponentConfig, IAutoTestConfigObject } from '../auto-tester/auto-tester.component';
@Component({
  selector: 'app-mahsa',
  templateUrl: './mahsa.component.html',
  styleUrls: ['./mahsa.component.scss']
})
export class MahsaComponent implements OnInit {
  form = new FormGroup({});

  SELECT_ID = 'qa_test_select';
  TAB_ID = 'qa-test-tabs';

  qaSelect: IDropdownInputConfig = {
    id: this.SELECT_ID,
    formGroup: this.form,
    options: [
      { text: 'Option 1'},
      { text: 'Option 2'},
    ],
  };

  qaTabs: ITabNavConfig = {
    id: this.TAB_ID,
    formGroup: this.form,
    tab: [
      { id: 'home', title: 'Home', value: 'This is Home' },
      { id: 'profile', title: 'Profile', value: 'This is Profile' },
      { id: 'contact', title: 'Contact', value: 'This is Contact' },
      { id: 'products', title: 'Products', value: 'This is Products' },
      { id: 'login', title: 'Login', value: 'This is Login' },
    ],
    // size: 'small'
  }

  testerConfig: IAutoTestConfigObject = {
    dropdowns: [
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
        id: 'errorMessages',
        formGroup: this.form,
        label: 'Error',
        errorMessages: [
          { key:'maxlength' , errorLOV:'Error message' }, 
          { key: 'testingError', errorLOV: 'Testing error message thing take 1000' }
        ],
        options: [
          { text: 'Maxlength' }, 
          { text: 'TestingError' }, 
          { text: 'Both Errors' }
        ]
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
        label: 'Required/Optional',
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

  autoTestConfig: IAutoTestComponentConfig = {
    id: 'mahsa_tester',
    formGroup: this.form,
    testFields: this.testerConfig
  }

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('Mahsa-alt');

    this.testerConfig.dropdowns?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerConfig.checkboxes?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerConfig.inputs?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.form.addControl(this.qaSelect.id, new FormControl());
    
    this.form.valueChanges.subscribe(value => {
      let updatedConfig: IDropdownInputConfig = {
        id: this.SELECT_ID,
        formGroup: this.form
      };
      let tabUpdatedConfig: ITabNavConfig = {
        id: this.TAB_ID,
        formGroup: this.form
      };

      for(let param in value) {
        updatedConfig = { ...updatedConfig, [param]: value[param] }
        tabUpdatedConfig = { ...tabUpdatedConfig, [param]: value[param] }
        this.qaSelect = updatedConfig;
        this.qaSelect = tabUpdatedConfig;
      }
    });
  }

  disable() {
    this.qaSelect?.formGroup.get(this.qaSelect.id)?.disabled ?
    this.qaSelect?.formGroup.get(this.qaSelect.id)?.enable() :
    this.qaSelect?.formGroup.get(this.qaSelect.id)?.disable();
  }

  setError() {
    if (this.qaSelect?.formGroup.get('errorMessages')?.value === 'Maxlength')  {
      this.qaSelect?.formGroup.get('errorMessages')?.setErrors({'maxlength': { requiredLength: 3, actualLength: 5 }});
    } else if (this.qaSelect?.formGroup.get('errorMessages')?.value === 'TestingError') {
      this.qaSelect?.formGroup.get('errorMessages')?.setErrors({'testingError': true});
    } else {
      this.qaSelect?.formGroup.get('errorMessages')?.
      setErrors({'testingError': true, 'maxlength': { requiredLength: 3, actualLength: 5 }});
    }
  };
  resetError() {
    this.qaSelect?.formGroup.get('errorMessages')?.reset();
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
}
