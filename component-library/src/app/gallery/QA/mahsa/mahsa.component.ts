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
  form = new FormGroup({});

  SELECT_ID = 'qa_test_select';

  qaSelect: IDropdownInputConfig = {
    id: this.SELECT_ID,
    formGroup: this.form,
  };

  
  // selectConfig: IDropdownInputConfig = {
  //   id: 'select-dropdown-test',
  //   formGroup: this.form,
  //   label: "Dropdown test",
  //   category: 'secondary',
  //   options: [
  //     {
  //       text: "One",
  //       value: 'First'
  //     },
  //     {
  //       text: "Two",
  //       value: 'Second'
  //     }
  //   ],
  //   required: true,
  //   hint: "Hint Text",
  //   desc: "Description text",
  // };

  testerConfig: IAutoTestConfigObject = {
    dropdowns: [
      {
        id: 'type',
        formGroup: this.form,
        label: 'Type',
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
        id: 'language-toggle',
        label: 'Language Test',
        formGroup: this.form,
        options: [
          {
            text: 'English'
          },
          {
            text: 'French'
          }
        ]
      },
    ],
    checkboxes: [
      {
        id: 'required', //boolean
        formGroup: this.form,
        label: 'required',
      },
    ],
    inputs: [
      {
        id: 'label',
        formGroup: this.form,
        label: 'label'
      },
      {
        id: 'hint',
        formGroup: this.form,
        label: 'hint'
      },
      {
        id: 'desc',
        formGroup: this.form,
        label: 'desc'
      }
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
    // this.form.addControl(this.selectConfig.id, new FormControl());

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
      // console.log("value: ", value);

      let updatedConfig: IDropdownInputConfig = {
        id: this.SELECT_ID,
        formGroup: this.form
      };

      for(let param in value) {
        // console.log('param: ', param);
        // console.log('value[param]: ', value[param]);

        updatedConfig = { ...updatedConfig, [param]: value[param] }
        console.log('updatedConfig: ', updatedConfig);
        this.qaSelect = updatedConfig;
      }
    });
  }

}
