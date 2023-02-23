import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DSSizes } from '../../shared/constants/jl-components/jl-components.constants/jl-components.constants';
import { IErrorPairs } from '../../shared/interfaces/component-configs';
import { IErrorIDs, StandAloneFunctions } from '../../shared/functions/stand-alone.functions';

export declare enum DropdownType {
  secondary = "secondary",
  primary = "primary",
  plain = "plain",
}
export interface IDropdownInputConfig {
  id: string;
  formGroup: FormGroup;
  small?: boolean;
  label?: string;
  options?: IDropdownInputOptionsConfig[];
  category?: keyof typeof DropdownType;
  required?: boolean;
  hint?: string;
  desc?: string;
  size?: keyof typeof DSSizes;
  errorMessages?: IErrorPairs[]; 
};
export interface IDropdownInputOptionsConfig {
  text: string;
  value?: string;
};

@Component({
  selector: 'lib-dropdown-input',
  templateUrl: './dropdown-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DropdownInputComponent) //This allows the error state to be turned off and on again
    }
  ]
})
export class DropdownInputComponent implements ControlValueAccessor, OnInit {
  touched = false;
  errorIds: IErrorIDs[] = [];

  @Input() config: IDropdownInputConfig = {
    id: '',
    formGroup: new FormGroup({}),
    category: 'secondary',
  }

  constructor(public standAloneFunctions: StandAloneFunctions) { }

  onChange = (formValue: string) => { };
  onTouched = () => { };
  writeValue(formValue: any) {
    // this.form.get('formControl')?.setValue(formValue);
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  ngOnInit() {
    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(this.config.formGroup, this.config.id, this.config.errorMessages)
    }
  }
}
