import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DSSizes } from 'component-lib/src/shared/constants/jl-components/jl-components.constants/jl-components.constants';

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
  errorMsg?: string;
  size?: keyof typeof DSSizes;
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
export class DropdownInputComponent implements OnInit, ControlValueAccessor {
  touched = false;

  @Input() config: IDropdownInputConfig = {
    id: '',
    formGroup: new FormGroup({}),
    category: 'secondary',
  }

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

  constructor() { }

  ngOnInit(): void {
  }

  getErrorState(): boolean {
    return (this.config.formGroup.get(this.config.id)?.touched &&
      this.config.formGroup.get(this.config.id)?.invalid) ?? false;
  };

}
