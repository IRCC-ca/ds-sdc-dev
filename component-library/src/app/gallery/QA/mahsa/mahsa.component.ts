import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { IDropdownInputConfig } from 'ircc-ds-angular-component-library';
import { IAutoTestComponentConfig, IAutoTestConfigObject } from '../auto-tester/auto-tester.component';

export const EMAIL_REGEX =
  /^([A-Za-z0-9\.\-_]+@{1}([A-Za-z0-9]+([\-\.]{0,1}[A-Za-z0-9]+)*)\.{1}[A-Za-z0-9]{2,6})$/;

@Component({
  selector: 'app-mahsa',
  templateUrl: './mahsa.component.html',
  styleUrls: ['./mahsa.component.scss']
})
export class MahsaComponent implements OnInit {
  form = new FormGroup({});

  SELECT_ID = 'qa_test_select';

  qaSelect: IDropdownInputConfig = {
    id: this.SELECT_ID,
    formGroup: this.form,
  };

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
        errorMessages: [{ key:'maxlength' , errorLOV:'Error message' }, {key: 'pattern', errorLOV: 'Testing Error Message'}, 
      {key: 'testingError', errorLOV: 'Testing error message thing take 1000'}],
        options: [{ text: 'error' }]
      },
      {
        id: 'size',
        formGroup: this.form,
        label: 'Size',
        options: [
          { text: 'small' },
          { text: 'large' }
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

    this.form.get('errorMessages')?.addValidators([Validators.pattern(EMAIL_REGEX)]);
    
    this.form.valueChanges.subscribe(value => {

      let updatedConfig: IDropdownInputConfig = {
        id: this.SELECT_ID,
        formGroup: this.form
      };

      for(let param in value) {
        updatedConfig = { ...updatedConfig, [param]: value[param] }
        console.log('updatedConfig: ', updatedConfig);
        this.qaSelect = updatedConfig;
      }
    });
  }

  click() {
    this.qaSelect?.formGroup.get(this.qaSelect.id)?.disabled ?
    this.qaSelect?.formGroup.get(this.qaSelect.id)?.enable() :
    this.qaSelect?.formGroup.get(this.qaSelect.id)?.disable();
  }
  clickError() {
    // this.qaSelect?.formGroup.get(this.qaSelect.id)?.valid && this.qaSelect?.formGroup.get(this.qaSelect.id)?.touched ?
    // // this.qaSelect?.formGroup.get(this.qaSelect.id)?.setErrors({ 'maxLength': true }) :
    // this.qaSelect?.formGroup.get(this.qaSelect.id)?.reset();

    // this.qaSelect?.formGroup.get(this.qaSelect.id)?.markAsTouched();
    // this.qaSelect?.formGroup.get(this.qaSelect.id)?.setErrors({ 'testingError': true });
    this.qaSelect?.formGroup.get('errorMessages')?.setErrors({ 'testingError': true, 'maxlength': {requiredLength: 3, actualLength: 5}});
    console.log(this.form.get('errorMessages')?.errors);
  }

}
