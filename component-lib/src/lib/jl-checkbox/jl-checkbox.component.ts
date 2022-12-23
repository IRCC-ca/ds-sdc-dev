import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IComponentOutputEvent } from '../../shared/interfaces/component-configs';

export interface ICheckBoxComponentConfig {
  formGroup: FormGroup;
  error?: true;
  small?: true; //DS Default is Large, hence this being changed for consistency 
  mixed?: true;
  disableFocus?: boolean; //Default is true
  checked?: boolean; //Controls the actual checked state of the component
  label?: string;
  id: string; //used for identifying the component everywhere and should NEVER be missing
}

@Component({
  selector: 'jl-pr-sclp-checkbox',
  templateUrl: './jl-checkbox.component.html',
  styleUrls: ['./jl-checkbox.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JLCheckboxComponent),
      multi: true
    }
  ]

})
export class JLCheckboxComponent implements ControlValueAccessor {
  isDisabled = false;

  onTouch = () => {};
  onChange = () => {};

  writeValue(checked: boolean): void {
    this.config.checked = checked;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  /**
   * This is used automatically by the parent formControl. It is used in the template to set the label to disabled
   * @param isDisabled 
   */
  setDisabledState?(isDisabled: boolean) {
    // (this.config !== undefined) ? this.config.disabled = isDisabled : this.disabled = isDisabled;
    this.isDisabled = isDisabled;
  }


  formGroupEmpty: FormGroup = new FormGroup({});
  checkboxIsChecked = false;
  touched = false;

  //TODO: Add output - consider using a formControl as output rather than anything else. Many different approaches are possible
  @Input() config: ICheckBoxComponentConfig = {
    id: '',
    formGroup: this.formGroupEmpty
  };

}