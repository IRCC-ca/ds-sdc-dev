import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { IDatePickerConfig, IProgressIndicatorConfig, ISelectConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {
  form = new FormGroup({});

  selectConfig: ISelectConfig = {
    id: 'select',
    label: 'Select label',
    desc: 'Select description',
    hint: 'Select hint',
    formGroup: this.form,
    options: [
      {
        text: 'text 1'
      },
      {
        text: 'text 2'
      }
    ]
  }

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.form.addControl(this.selectConfig.id, new FormControl());
  }

}


