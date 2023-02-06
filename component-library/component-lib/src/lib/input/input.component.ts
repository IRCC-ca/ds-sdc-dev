import {
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DSSizes } from 'component-lib/src/shared/constants/jl-components/jl-components.constants/jl-components.constants';
import {IErrorPairs} from "../../shared/interfaces/component-configs";
import {IErrorIconConfig} from "../error/error.component";

export interface IInputComponentConfig {
  label?: string;
  hint?: string;
  desc?: string;
  required?: boolean; // This field only adds styling to the label and DOES NOT add any validation to the input field.
  placeholder?: string;
  type?: keyof typeof InputTypes;
  id: string;
  size?: keyof typeof DSSizes;
  formGroup: FormGroup;
  errorMessages?: IErrorPairs[];
  errorIcon?: IErrorIconConfig;
}

export enum InputTypes {
  text = 'text',
  password = 'password'
}

@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnInit {
  formGroupEmpty: FormGroup = new FormGroup({});
  //DON'T include default values of '' unless it REALLY makes sense to do so. Instead, make them optional
  @Input() config: IInputComponentConfig = {
    id: '',
    formGroup: new FormGroup({})
  };

  @Input() id = '';
  @Input() formGroup = this.formGroupEmpty;

  disabled = false;
  focusState = false;
  showPassword = false;
  //Removed '!' and added null case in onChange
  private onTouch?: () => void;
  private onChange?: (value: any) => void;


  ngOnInit() {
    if (this.id !== '') {
      this.config.id = this.id;
    }

    if (this.formGroup !== this.formGroupEmpty) {
      this.config.formGroup = this.formGroup;
    }
  }

  public focusInput(focusValue: boolean): void {
    this.focusState = !focusValue;
  }

  /**
   * Toggle the password field
   */
  hideShow() {
    this.showPassword = !this.showPassword;
    this.config.type === InputTypes.password ? (this.config.type = InputTypes.text) : (this.config.type = InputTypes.password);
  }

  public clearvalue() {
  }
  writeValue(value: string): void {
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
