import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DSSizes} from "../../shared/constants/jl-components/jl-components.constants/jl-components.constants";
import {IErrorIconConfig} from "../error/error.component";
import {IErrorPairs} from "../../shared/interfaces/component-configs";
import { IErrorIDs, StandAloneFunctions } from '../../shared/functions/stand-alone.functions';

export interface ICheckBoxComponentConfig {
  formGroup: FormGroup;
  label?: string;
  required?: boolean;
  size?: keyof typeof DSSizes | DSSizes;
  mixed?: true;
  disableFocus?: boolean; //Default is true
  inlineLabel?: string;
  id: string; //used for identifying the component everywhere and should NEVER be missing
  helpText?: string;
  customErrorText?: string;
  desc?: string;
  errorMessages?: IErrorPairs[];
  errorIcon?: IErrorIconConfig;
}

@Component({
  selector: 'lib-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]

})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  formGroupEmpty: FormGroup = new FormGroup({});

  //TODO: Add output - consider using a formControl as output rather than anything else. Many different approaches are possible
  @Input() config: ICheckBoxComponentConfig = {
    id: '',
    formGroup: this.formGroupEmpty,
    size: DSSizes.large
  };

  @Input() formGroup = this.formGroupEmpty;
  @Input() id = '';

  isDisabled = false;
  errorIds: IErrorIDs[] = [];

  constructor(public standAloneFunctions: StandAloneFunctions) { }

  onTouch = () => {};
  onChange = () => {};

  writeValue(): void {
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
    if (!this.config?.size) this.config.size = DSSizes.large;

    if (this.formGroup !== this.formGroupEmpty) {
      this.config.formGroup = this.formGroup;
    }

    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(this.config.formGroup, this.config.id, this.config.errorMessages)
    }
  }

  /**
   * Return error state from FormGroup, must be touched & invalid
   */
  getErrorState(): boolean {
    return (this.config.formGroup.get(this.config.id)?.touched &&
      this.config.formGroup.get(this.config.id)?.invalid) ?? false;
  }
}
