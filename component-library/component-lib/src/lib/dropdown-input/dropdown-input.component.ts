import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface IDropdownInputConfig {
  id: string;
  formGroup: FormGroup;
  small?: boolean;
  label?: string;
  options?: IDropdownInputOptionsConfig[];
  category?: string;
  required?: boolean;
  hint?: string;
  desc?: string;
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

}
