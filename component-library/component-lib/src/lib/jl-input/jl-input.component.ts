import {
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IErrorPairs } from 'component-lib/src/shared/interfaces/component-configs';



export interface IJLInputComponentConfig {
  label?: string;
  hint?: string;
  desc?: string
  required?: boolean
  placeholder?: string;
  type?: InputTypes | keyof InputTypes; //TODO: Finish setting this up!
  id: string;
  formGroup: FormGroup;
  errorMessages?: IErrorPairs[];
}

export enum InputTypes {
  text = 'text',
  password = 'password'
}

@Component({
  selector: 'jl-pr-sclp-input',
  templateUrl: './jl-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JLInputComponent),
      multi: true
    }
  ]
})
export class JLInputComponent implements ControlValueAccessor, OnInit {
  formGroupEmpty: FormGroup = new FormGroup({});
  //DON'T include default values of '' unless it REALLY makes sense to do so. Instead, make them optional
  @Input() config: IJLInputComponentConfig = {
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

    // this.config.formGroup.get(this.config.id)?.valueChanges.subscribe(value => {
    //   console.log(this.config.formGroup.get(this.config.id)?.errors);
    // })
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
