import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DropdownTypes, DSSizes, ICheckBoxComponentConfig, IComponentOutputEvent, IJLDropdownComponentConfig, IJLInputComponentConfig, InputTypes, IRadioInputComponentConfig } from 'ircc-ds-angular-component-library';

export enum HomeButtonActionTypes {
  disableCheckbox = 'disableCheckbox',
  checkboxError = 'checkboxError'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homeButtonActionTypes = HomeButtonActionTypes;

  form = new FormGroup({});


  checkboxesConfigs: ICheckBoxComponentConfig[] = [
    { //checkbox1
      id: 'checkbox_label_test',
      label: 'Testing Label',
      disableFocus: true //TODO: Not working
    },
    { //checkbox2
      id: 'checkbox_small_test',
      label: 'Small Test',
      small: true
    },
    { //checkbox3
      id: 'checkbox_error_test',
      label: 'Error Test',
      error: true
    },
    {
      id: 'checkbox_disabled_test',
      label: 'Disabled Test',
      disabled: true
    },
    {
      id: 'checkbox_form_disabled_test',
      label: 'Form Disabled Test'
    },
    {
      id: 'checkbox_form_error_test',
      label: 'Form Error Test'
    }
  ];
  //TODO: Test non-config checkboxes

  dropdownConfig: IJLDropdownComponentConfig = {
    id: 'dropdown_test1',
    options: [
      {
        text: 'Option1',
        value: 'Value1'
      },
      {
        text: 'Option2',
        value: 'Value2'
      },
      {
        text: 'Option3',
        value: 'Value3'
      }
    ],
    type: DropdownTypes.input
  };

  radioConfig: IRadioInputComponentConfig = {
    id: 'radio_input_test1',
    label: 'Radio Label Test',
    options: [
      {
        text: 'Text Test',
        value: 'Test Value',
      },
      {
        text: 'Test noValue'
      },
      {
        text: 'Size Override Test',
        sizeOverride: DSSizes.small,
      },
      {
        text: 'Disabled Single Field Test',
        disabled: true
      },
      {
        text: 'Large Error State Test',
        error: true
      },
      {
        text: 'Small Error State Test',
        sizeOverride: DSSizes.small,
        error: true
      }
    ]
  }

  demoText = '';
  demoTextArray: IComponentOutputEvent[] = [];

  inputComponentConfig: IJLInputComponentConfig = {
    label: 'Input Label',
    placeholder: 'placeholder',
    id: 'input1'
  }

  inputTestPasswordConfig: IJLInputComponentConfig = {
    label: 'Password Test',
    type: InputTypes.password,
    id: 'password'
  }

  dropdownOptions = [
    {
      text: 'Option1',
      value: 'Value1'
    },
    {
      text: 'Option2',
      value: 'Value2'
    },
    {
      text: 'Option3',
      value: 'Value3'
    },
  ]

  isLoading = false;

  constructor() { }

  ngOnInit() {
    this.checkboxesConfigs.forEach(checkbox => {
      this.form.addControl(checkbox.id, new FormControl());
      this.form.addControl((checkbox.id + '_nonConfig'), new FormControl());
    });
    this.form.addControl(this.radioConfig.id, new FormControl());
  }

  valueChange(event: any) {
    console.log(event);
    if (event.id) {
      let index = this.demoTextArray.findIndex(val => val.id === event.id);
      if (index === -1) {
        let temp: IComponentOutputEvent = { id: event.id, value: event.value };
        this.demoTextArray.push(temp)
      } else {
        this.demoTextArray[index].value = event.value;
      }
    }
  }

  resetChips() {

  }

  getFormElements() {
    interface IValReturn {
      key: string;
      value: string;
    };
    let valReturn: IValReturn[] = [];
    console.log(this.form.value);
    Object.keys(this.form.value).forEach(key => {
      valReturn.push({ key: key, value: this.form.get(key)?.value });
    });
    return valReturn;
  }

  buttonActions(actionType: HomeButtonActionTypes) {
    switch (actionType) {
      case HomeButtonActionTypes.disableCheckbox:
        this.form.get('checkbox_form_disabled_test')?.disabled ?
          this.form.get('checkbox_form_disabled_test')?.enable() : this.form.get('checkbox_form_disabled_test')?.disable();
        break;

      case HomeButtonActionTypes.checkboxError:
      this.form.get('checkbox_form_error_test')?.setErrors({'invalid': true});
      console.log(this.form);
    }
  }

}