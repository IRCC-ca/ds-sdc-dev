import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { ICheckBoxComponentConfig, IDropdownInputConfig, IRadioInputComponentConfig } from 'ircc-ds-angular-component-library';
import { IAutoTestComponentConfig, IAutoTestConfigObject } from '../auto-tester/auto-tester.component';

@Component({
  selector: 'app-kris',
  templateUrl: './kris.component.html',
  styleUrls: ['./kris.component.scss']
})
export class KrisComponent implements OnInit {

  form = new FormGroup({});

  /** DEFAULTS */
  //TODO: Move to a const at some point
  autoConfigConfig: IAutoTestConfigObject = {
    dropdowns: [
      {
        id: 'autoConfig_category',
        formGroup: this.form,
        label: 'Category Test',
        options: [
          {
            text: 'primary'
          },
          {
            text: 'secondary',
          },
          {
            text: 'plain'
          }
        ]
      },
      {
        id: 'autoConfig_disabled',
        label: 'Disable Test',
        formGroup: this.form,
        options: [
          {
            text: 'disable all'
          },
          {
            text: 'disable single'
          }
        ]
      },
      {
        id: 'autoConfig_size',
        label: 'Size Test',
        formGroup: this.form,
        options: [
          {
            text: 'all large'
          },
          {
            text: 'single large'
          },
          {
            text: 'all small'
          },
          {
            text: 'single small'
          }
        ]
      },
      {
        id: 'autoConfig_error',
        label: 'Error Test',
        formGroup: this.form,
        options: [
          {
            text: 'clear all errors'
          },
          {
            text: 'all error'
          },
          {
            text: 'single error'
          },
          {
            text: 'custom error icon'
          },
          {
            text: 'multiple error banners'
          }
        ]
      },
      {
        id: 'autoConfig_options_change',
        label: 'Options Change Test',
        formGroup: this.form,
        options: [
          {
            text: 'options v.1'
          },
          {
            text: 'options v.2'
          }
        ]
      },
      {
        id: 'autoConfig_validators',
        label: 'Validators Test',
        formGroup: this.form,
        options: [
          {
            text: 'required validator'
          },
          {
            text: 'max length of 3'
          },
          {
            text: 'all the above'
          },
          {
            text: 'remove all'
          }
        ]
      }
    ],
    checkboxes: [
      {
        id: 'autoConfig_checkbox_title',
        formGroup: this.form,
        label: 'title'
      },
      {
        id: 'autoConfig_checkbox_required',
        formGroup: this.form,
        label: 'required',
      },
      {
        id: 'autoConfig_checkbox_description',
        formGroup: this.form,
        label: 'description'
      },
      {
        id: 'autoConfig_checkbox_hint',
        formGroup: this.form,
        label: 'hint'
      },
      {
        id: 'autoConfig_checkbox_label',
        formGroup: this.form,
        label: 'label'
      }
    ]
  };

  autoTestConfig: IAutoTestComponentConfig = {
    id: 'kris_autocomplete',
    formGroup: this.form,
    testFields: this.autoConfigConfig
  }

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('kris-alt');

    this.autoConfigConfig.dropdowns?.forEach(i => {
      this.form.addControl(i.id, new FormControl());

    });
    this.autoConfigConfig.checkboxes?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });

    this.form.valueChanges.subscribe(value=>{
        console.log(value);
    });
  }
}
