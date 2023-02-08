import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { ButtonColor, ButtonIconDirection, IButtonConfig, IIconButtonComponentConfig, IIconButtonIconConfig, IInputComponentConfig } from 'ircc-ds-angular-component-library';
import { IAutoTestComponentConfig, IAutoTestConfigObject } from '../auto-tester/auto-tester.component';

@Component({
  selector: 'app-naseer',
  templateUrl: './naseer.component.html',
  styleUrls: ['./naseer.component.scss']
})
export class NaseerComponent implements OnInit {

  INPUT_ID = 'qa_test_input';
  form = new FormGroup({});

  qaInput : IInputComponentConfig = {
    id: this.INPUT_ID,
    formGroup: this.form
  };

  qaButton : IIconButtonComponentConfig = {
    id: "qa_test_button",
    size: 'extraSmall',
    category: 'custom',
    icon:  {
      class: 'fa-solid fa-mustache',
      color: 'var(--primary-text)'
    }
  };

  customIconConfigTest : IIconButtonIconConfig = {
    class: 'fa-regular fa-igloo',
    color: 'var(--critical-text)'
  }

  testerConfig: IAutoTestConfigObject = {
    inputs: [
      {
        id: 'label',
        formGroup: this.form,
        label: 'label/Title'
      },
      {
        id: 'desc',
        formGroup: this.form,
        label: 'description'
      },
      {
        id: 'hint',
        formGroup: this.form,
        label: 'hint'
      },
      {
        id: 'placeholder',
        formGroup: this.form,
        label: 'Placeholder text'
      },
    ],
    checkboxes: [
      {
        id: 'required',
        formGroup: this.form,
        label: 'required'
      },
    ],
    dropdowns: [
      {
        id: 'type',
        label: 'Type',
        formGroup: this.form,
        options: [
          {
            text: 'text'
          },
          {
            text: 'password'
          }
        ]
      },
      {
        id: 'size',
        label: 'Size',
        formGroup: this.form,
        options: [
          {
            text: 'small'
          },
          {
            text: 'large'
          }
        ]
      }
    ]
  }

  testComponentConfig: IAutoTestComponentConfig = {
    id: 'naseer_tester',
    formGroup: this.form,
    testFields: this.testerConfig
  }

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('naseer-alt');

    this.testerConfig.dropdowns?.forEach(i => {
      this.form.addControl(i.id, new FormControl());

    });
    this.testerConfig.checkboxes?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerConfig.inputs?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });

    this.form.addControl(this.qaInput.id, new FormControl())
    // this.form.addControl(this.qaButton.id, new FormControl())
    this.form.valueChanges.subscribe(x => {

      var updatedConfig : IInputComponentConfig = {
        id: this.INPUT_ID,
        formGroup: this.form
      };

      for(let param in x){
          console.log(param);
          console.log(x[param]);

          updatedConfig = {...updatedConfig, [param] : x[param]}
          console.log('updatedConfig: ', updatedConfig);
          this.qaInput = updatedConfig;

      }
  })

  }

}
