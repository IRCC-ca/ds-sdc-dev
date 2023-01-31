import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICheckBoxComponentConfig, IDropdownInputConfig } from 'ircc-ds-angular-component-library';

export interface IAutoTestComponentConfig {
  id: string;
  formGroup: FormGroup;
  testFields?: IAutoTestConfigObject;
}

export interface IAutoTestConfigObject {
  dropdowns?: IDropdownInputConfig[];
  checkboxes?: ICheckBoxComponentConfig[];
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
  }
  @Output() clickEvent = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
    //Add the auto-test form controls procedurally to FormGroup

  }

}
