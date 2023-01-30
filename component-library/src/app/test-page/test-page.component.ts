import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IErrorComponentConfig, IJLInputComponentConfig, InputTypes } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  form = new FormGroup({});

  inputConfig: IJLInputComponentConfig = {
    id: 'input',
    formGroup: this.form,
    type: InputTypes.password,
    errorMessages: [{key: 'required', errorLOV: 'testRequiredLOV'}, {key: 'maxlength', errorLOV: 'maxLength of 3'}]
  }

  errorConfig: IErrorComponentConfig = {
    id: 'error',
    errorLOV: 'testLOV'
  }

  constructor(
  ) { }

  ngOnInit() {
    this.form.addControl(this.inputConfig.id, (new FormControl('', [Validators.required, Validators.maxLength(3)])));
  }
}
