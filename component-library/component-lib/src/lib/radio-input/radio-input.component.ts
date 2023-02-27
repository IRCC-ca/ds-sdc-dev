import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidatorFn
} from '@angular/forms';
import { IErrorPairs } from '../../shared/interfaces/component-configs';
import { DSSizes } from '../../shared/constants/jl-components/jl-components.constants/jl-components.constants';
import { IErrorIDs, StandAloneFunctions } from '../../shared/functions/stand-alone.functions';

export interface IRadioInputComponentConfig {
  id: string;
  formGroup: FormGroup;
  label?: string;
  desc?: string;
  hint?: string;
  required?: boolean;
  options?: IRadioInputOption[];
  size?: keyof typeof DSSizes;
  disabled?: boolean;
  error?: true;
  validators?: ValidatorFn[];
  helpText?: string;
  errorMessages?: IErrorPairs[];
}

export interface IRadioInputOption {
  text: string;
  value?: string;
  sizeOverride?: keyof typeof DSSizes;
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
  touched = false;
  errorIds: IErrorIDs[] = [];

  @Input() config: IRadioInputComponentConfig = {
    id: '',
    formGroup: this.formGroupEmpty
  };
  @Input() id = '';
  @Input() formGroup = this.formGroupEmpty;

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
    if (this.id !== '') this.config.id = this.id;
    if (this.formGroup !== this.formGroupEmpty) this.config.formGroup = this.formGroup;
    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(this.config.formGroup, this.config.id, this.config.errorMessages)
    }
  }


  /**
   * used to disable individual fields (from the config under 'options')
   * @param index of the option field to be disabled
   * @returns null if value is undefined, empty string otherwise. This works with [attr.disabled].
   */
  getDisabled(index: number) {
    if (this.config.options) {
      if (this.config.options[index].disabled === undefined && !this.config.disabled) {
        return null;
      }
    }
    return '';
  }

}
