import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IInputComponentConfig } from '../input/input.component';
import { DSSizes } from '../../../public-api';

/*
export interface IInputComponentConfig {
  label?: string;
  hint?: string;
  desc?: string;
  required?: boolean; // This field only adds styling to the label and DOES NOT add any validation to the input field.
  placeholder?: string;
  type?: keyof typeof InputTypes;
  id: string;
  size?: keyof typeof DSSizes;
   
  errorMessages?: IErrorPairs[];
  labelIconConfig?: ILabelIconConfig;
}
*/

export interface IAutocompleteComponent {
  id: string;
  label?: string;
  hint?: string;
  desc?: string;
  size?: keyof typeof DSSizes;
  formGroup: FormGroup;
}

@Component({
  selector: 'ircc-cl-lib-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  @Input() config: IAutocompleteComponent = {
    id: '',
    formGroup: this.form,
    label: 'string',
    hint: 'string',
    desc: 'string',
    size: 'small'
  };

  inputComponent: IInputComponentConfig = {
    id: '',
    formGroup: this.form,
    label: this.config.label,
    hint: this.config.hint,
    desc: 'string',
    type: 'autocomplete',
    size: this.config.size
  };

  constructor() {}

  ngOnInit() {
    this.inputComponent.id = `${this.config.id}-input`;
    this.inputComponent.formGroup = this.config.formGroup;
    this.inputComponent.label = this.config.label;
    this.inputComponent.label = this.config.label;
  }
}
