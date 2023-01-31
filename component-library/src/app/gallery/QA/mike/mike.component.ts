import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { FormGroup, FormControl} from '@angular/forms';
import { IAutoTestComponentConfig, IAutoTestConfigObject } from '../auto-tester/auto-tester.component';

@Component({
  selector: 'app-mike',
  templateUrl: './mike.component.html',
  styleUrls: ['./mike.component.scss']
})
export class MikeComponent implements OnInit {

  form = new FormGroup({});

  testerConfig: IAutoTestConfigObject = {
    checkboxes: [
        {
          id: 'autoConfig_checkbox_title',
          formGroup: this.form,
          label: 'title'
        },
        {
          id: 'autoConfig_checkbox_desc',
          formGroup: this.form,
          label: 'description'
        },
        {
          id: 'autoConfig_checkbox_title',
          formGroup: this.form,
          label: 'cta - [coming soon]'
        }
    ],
    dropdowns: [
      {
        id: 'autoConfig_type',
        label: 'Type',
        formGroup: this.form,
        options: [
          {
            text: 'Information'
          },
          {
            text: 'Warning'
          },
          {
            text: 'Critical'
          },
          {
            text: 'Success'
          },
          {
            text: 'Generic'
          }
        ]
      }
    ]
  }

  testComponentConfig: IAutoTestComponentConfig = {
    id: 'mike_tester',
    formGroup: this.form,
    testFields: this.testerConfig
  }

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('mike-alt');

    this.testerConfig.dropdowns?.forEach(i => {
      this.form.addControl(i.id, new FormControl());

    });
    this.testerConfig.checkboxes?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });

  }

}
