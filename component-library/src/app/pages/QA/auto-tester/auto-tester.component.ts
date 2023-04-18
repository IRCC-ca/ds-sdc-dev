import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ICheckBoxComponentConfig,
  ISelectConfig,
  IInputComponentConfig
} from 'ircc-ds-angular-component-library';

export interface IAutoTestComponentConfig {
  id: string;
  formGroup: FormGroup;
  testFields?: IAutoTestConfigObject;
}

export interface IAutoTestConfigObject {
  selects?: ISelectConfig[];
  checkboxes?: ICheckBoxComponentConfig[];
  inputs?: IInputComponentConfig[];
}

@Component({
  selector: 'app-auto-tester',
  templateUrl: './auto-tester.component.html',
  styleUrls: ['./auto-tester.component.scss']
})
export class AutoTesterComponent implements OnInit {
  @Input() config: IAutoTestComponentConfig = {
    id: '',
    formGroup: new FormGroup({})
  };

  constructor() {}

  ngOnInit() {}
}
