import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { IDatePickerConfig } from 'component-lib/src/public-api';
import { IBannerConfig } from 'ircc-ds-angular-component-library';


@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {
  form = new FormGroup({});

  datePickerConfig: IDatePickerConfig = {
    id: 'datePicker',
    label: 'test label',
    formGroup: this.form,
    hint: 'Test hint',
    required: true,
    desc: 'Test description',
    // size: 'small'
  }


  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.form.addControl((this.datePickerConfig.id + '_dayControl'), new FormControl());
    this.form.addControl((this.datePickerConfig.id + '_monthControl'), new FormControl());
    this.form.addControl((this.datePickerConfig.id + '_yearControl'), new FormControl());
    console.log(this.form.controls, this.datePickerConfig.formGroup.controls);


  }
}


