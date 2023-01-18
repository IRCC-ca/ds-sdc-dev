import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IRadioInputComponentConfig } from 'ircc-ds-angular-component-library';



@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  radioConfig: IRadioInputComponentConfig = {
    id: 'testing_radio_input_1',
    formGroup: this.form,
    label: 'Radio Label Test',
    desc: 'Description for radio input',
    hint: 'this is hint text',
    error: true,
    errorMessage: 'Error message',
    required: true,
    options: [
      {
        text: 'Text Test',
        value: 'Test Value',
      },
      {
        text: 'Text Test2',
        value: 'Test Value2',
      },
      {
        text: 'Text Test',
        value: 'Test Value',
      },
      {
        text: 'Text Test2',
        value: 'Test Value2',
      }]
  }

  constructor(
  ) { }

  ngOnInit() {
    this.form.addControl(this.radioConfig.id, new FormControl());
  }


}
