import { Component, OnInit } from '@angular/core';
import { IJLInputComponentConfig, IJLInputComponentOutput, InputTypes } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  demoText = '';
  demoTextArray: IJLInputComponentOutput[] = [];

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
    }
  ]

  isLoading = false;

  constructor() { }

  ngOnInit() {
  }

  valueChange(event: any) {
    if (event.id) {
      let index = this.demoTextArray.findIndex(val => val.id === event.id);
      if (index === -1) {
        let temp: IJLInputComponentOutput = { id: event.id, value: event.value };
        this.demoTextArray.push(temp)
      } else {
        this.demoTextArray[index].value = event.value;
      }
    }
  }

}