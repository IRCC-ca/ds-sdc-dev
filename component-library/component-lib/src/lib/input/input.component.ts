import {
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn } from '@angular/forms';

export interface IInputComponentConfig {
  label?: string;
  hint?: string;
  desc?: string
  required?: boolean
  placeholder?: string;
  type?: InputTypes;
  id: string;
  formGroup: FormGroup;
  validators?: ValidatorFn[];
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
