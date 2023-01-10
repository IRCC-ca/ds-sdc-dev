import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { DSSizes } from '../../shared/constants/jl-components/jl-components.constants/jl-components.constants';

export interface IRadioInputComponentConfig {
  id: string;
  formGroup: FormGroup;
  label?: string;
  options?: IRadioInputOption[];
  small?: true; //Default is large in the DS, so this is to keep things consistent.
  disabled?: boolean;
  error?: true;
}

export interface IRadioInputOption {
  text: string;
  value?: string;
  sizeOverride?: DSSizes;
  disabled?: true;
  error?: true;
}

@Component({
  selector: 'lib-radio-input',
  templateUrl: './radio-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RadioInputComponent) //This allows the error state to be turned off and on again
    }
  ]
})
export class RadioInputComponent implements OnInit, ControlValueAccessor {
  formGroupEmpty = new FormGroup({});
  size = DSSizes.large;
  sizes = DSSizes;
  touched = false;

  @Input() config: IRadioInputComponentConfig = {
    id: '',
    formGroup: this.formGroupEmpty
  };

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
    console.log(this.size);
    if (this.config?.small) {
      this.size = DSSizes.small;
    }
  }

  /**
   * 
   * @param override 
   * @returns 
   */
  getSize(override: DSSizes | undefined) {
    if (override) {
      return override;
    }
    if (this.config?.small) {
      return DSSizes.small;
    }
    return DSSizes.large;
  }

  /**
   * used to disable individual fields (from the config under 'options')
   * @param index of the option field to be disabled
   * @returns null if value is undefined, empty string otherwise. This works with [attr.disabled].
   */
  getDisabled(index: number) {
    if (this.config.options) {
      if (this.config.options[index].disabled === undefined) {
        return null;
      }
    }
    return '';
  }
}
