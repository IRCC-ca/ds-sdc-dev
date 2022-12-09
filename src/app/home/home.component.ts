import { Component, OnInit } from '@angular/core';
import { DropdownTypes, DSSizes, ICheckBoxComponentConfig, IComponentOutputEvent, IJLDropdownComponentConfig, IJLInputComponentConfig, InputTypes, IRadioInputComponentConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  checkboxesConfigs: ICheckBoxComponentConfig[] = [
    { //checkbox1
      id: 'checkbox_label_test',
      label: 'Testing Label'
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
     }
  ];

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
        sizeOverride: DSSizes.small
      },
      {
        text: 'Disabled Single Field Test',
        disabled: true
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

}