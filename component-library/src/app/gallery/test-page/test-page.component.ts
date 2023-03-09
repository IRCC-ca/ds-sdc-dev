import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { IDatePickerConfig, IDatePickerErrorMessages } from 'component-lib/src/public-api';
import { IBannerConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
  form = new FormGroup({});

  datePickerErrorMessages: IDatePickerErrorMessages = {
    general: [
      {
        key: 'required',
        errorLOV: 'ACC_DEMO.ERRORS.REQUIRED',
      },
    ],
  };

  datePickerConfig: IDatePickerConfig = {
    id: 'datePicker',
    label: 'test label',
    formGroup: this.form,
    hint: 'Test hint',
    required: true,
    desc: 'Test description',
    errorMessages: this.datePickerErrorMessages,
    // size: 'small'
  };

  constructor(private altLang: LanguageSwitchService) {}

  ngOnInit() {
    this.form.addControl(this.datePickerConfig.id + '_dayControl', new FormControl('', Validators.required));
    this.form.addControl(this.datePickerConfig.id + '_monthControl', new FormControl('', Validators.required));
    this.form.addControl(this.datePickerConfig.id + '_yearControl', new FormControl('', Validators.required));
    console.log(this.form.controls, this.datePickerConfig.formGroup.controls);
  }
}
