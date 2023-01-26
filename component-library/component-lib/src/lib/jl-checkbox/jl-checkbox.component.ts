import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn} from '@angular/forms';
import {DSSizes} from "../../shared/constants/jl-components/jl-components.constants/jl-components.constants";

export interface ICheckBoxComponentConfig {
  formGroup: FormGroup;
  size?: keyof typeof DSSizes | DSSizes;
  error?: true;
  small?: true; //DS Default is Large, hence this being changed for consistency
  mixed?: true;
  disableFocus?: boolean; //Default is true
  checked?: boolean; //Controls the actual checked state of the component
  label?: string;
  id: string; //used for identifying the component everywhere and should NEVER be missing
  validators?: ValidatorFn[];
  helpText?: string;
  customErrorText?: string;
}

@Component({
  selector: 'jl-pr-sclp-checkbox',
  templateUrl: './jl-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JLCheckboxComponent),
      multi: true
    }
  ]

})
export class JLCheckboxComponent implements ControlValueAccessor, OnInit {
  formGroupEmpty: FormGroup = new FormGroup({});
  checkboxIsChecked = false;
  touched = false;

  //TODO: Add output - consider using a formControl as output rather than anything else. Many different approaches are possible
  @Input() config: ICheckBoxComponentConfig = {
    id: '',
    formGroup: this.formGroupEmpty,
    size: DSSizes.large
  };

  @Input() formGroup = this.formGroupEmpty;
  @Input() id = '';

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

  ngOnInit() {
    if (this.id !== '') {
      this.config.id = this.id;
    }
    if (!this.config?.size) this.config.size = this.config?.small ? DSSizes.small : DSSizes.large;

    if (this.formGroup !== this.formGroupEmpty) {
      this.config.formGroup = this.formGroup;
    }
    this.config.formGroup.addControl(this.config.id, new FormControl('', this.config.validators));
  }

}
