import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IJLInputComponentConfig, InputTypes } from 'ircc-ds-angular-component-library';
// import { IJLInputComponentConfig } from 'component-lib/src/public-api';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  inputConfig : IJLInputComponentConfig = {
    id: 'test_input_1',
    formGroup: this.form,
    label: 'Password',
    desc: "This is password description",
    hint: 'enter your password',
    type: InputTypes.password,
    placeholder: 'Placeholder text',
    error: true,
    required: true,
  }

  constructor(
  ) { }

  ngOnInit() {

  }


}
