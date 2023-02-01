import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { IDropdownInputConfig } from 'ircc-ds-angular-component-library';
import { IAutoTestComponentConfig, IAutoTestConfigObject } from '../auto-tester/auto-tester.component';

@Component({
  selector: 'app-mahsa',
  templateUrl: './mahsa.component.html',
  styleUrls: ['./mahsa.component.scss']
})
export class MahsaComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  
  selectConfig: IDropdownInputConfig = {
    id: 'select-dropdown-test',
    formGroup: this.form,
    label: "Dropdown test",
    category: 'secondary',
    options: [
      {
        text: "One",
        value: 'First'
      },
      {
        text: "Two",
        value: 'Second'
      }
    ],
    required: true,
    hint: "Hint Text",
    desc: "Description text",
  };

  autoConfigConfig: IAutoTestConfigObject = {
    dropdowns: [
      {
        id: 'autoConfig_category',
        formGroup: this.form,
        label: 'Category Test',
        options: [
          {
            text: 'Primary'
          },
          {
            text: 'Secondary',
          },
          {
            text: 'Plain'
          }
        ]
      },
      {
        id: 'autoConfig_disabled',
        label: 'Disable Test',
        formGroup: this.form,
        options: [
          {
            text: 'Disable all'
          },
          {
            text: 'Disable single' // ?
          }
        ]
      },
      {
        id: 'autoConfig_size',
        label: 'Size Test',
        formGroup: this.form,
        options: [ // all & single?
          {
            text: 'All large'
          },
          {
            text: 'Single large'
          },
          {
            text: 'All small'
          },
          {
            text: 'Single small'
          }
        ]
      },
      {
        id: 'autoConfig_error',
        label: 'Error Test',
        formGroup: this.form,
        options: [
          {
            text: 'clear all errors' // did we setup err yet?
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
    ],
    header : [
      {
        id: 'header-toggle-test',
        formGroup: this.form,
        lang: 'French'
      }
    ]
  };

  autoTestConfig: IAutoTestComponentConfig = {
    id: 'mahsa_autocomplete',
    formGroup: this.form,
    testFields: this.autoConfigConfig
  }

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('Mahsa-alt');
    this.form.addControl(this.selectConfig.id, new FormControl());

    this.autoConfigConfig.dropdowns?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.autoConfigConfig.checkboxes?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.autoConfigConfig.header?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.form.valueChanges.subscribe(value => {
      console.log(value);

      // let updatedConfig: 
    });
  }

}
