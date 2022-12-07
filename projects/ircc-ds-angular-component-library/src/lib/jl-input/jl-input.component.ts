import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface IJLInputComponentConfig {
  label?: string;
  hintText?: string;
  placeholder?: string;
  type?: InputTypes;
  value?: string;
  name?: string;
  id?: string;
  autocomplete?: string;
  large?: boolean;
  error?: boolean;
  empty?: boolean;
}

export enum InputTypes {
  text = 'text',
  password = 'password'
}

export interface IJLInputComponentOutput {
  id?: string;
  value: string;
}

@Component({
  selector: 'jl-pr-sclp-input',
  templateUrl: './jl-input.component.html',
  styleUrls: ['./jl-input.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JLInputComponent),
      multi: true
    }
  ]
})
export class JLInputComponent implements ControlValueAccessor, OnInit {
  //DON'T include default values of '' unless it REALLY makes sense to do so. Instead, make them optional
  @Input() label?: string;
  @Input() hintText?: string; //Made optional instead of a length check. More efficient and cleaner
  @Input() placeholder?: string;;
  @Input() type?: InputTypes;
  @Input() value?: string;
  @Input() name?: string;
  @Input() id?: string;
  @Input() autocomplete = `on`;
  @Input() large = false;
  @Input() error = false;
  @Input() empty = true;

  @Output() valueChange = new EventEmitter();

  selected?: string;
  disabled = false;
  focusState = false;
  showPassword = false;
  //Removed '!' and added null case in onChange
  private onTouched?: () => void;
  private onChanged?: (value: any) => void;

  constructor() { }

  ngOnInit() {
    //initial null check to ensure that a null value isn't assigned since it can't be set in the html with an enum
    !!this.type ?? (this.type = InputTypes.text);
  }

  onChange(value: string) {
    if (this.onChanged && this.onTouched) {
      this.onTouched();
      this.value = value;
      this.onChanged(value);
    } else {
      this.value = value;
    }
  }

  public focusInput(focusValue: boolean): void {
    this.focusState = !focusValue;
  }

  onKeyUp(event: any) {
    if (this.id) {
      let emitVal: IJLInputComponentOutput = {id: this.id, value: (this.value || '') }
      this.valueChange.emit(emitVal);
    } else {
      this.valueChange.emit(this.value);
    }
  }

  /**
   * Toggle the password field
   */
  hideShow() {
    this.showPassword = !this.showPassword;
    this.type === InputTypes.password ? (this.type = InputTypes.text) : (this.type = InputTypes.password);
  }

  public clearvalue() {
    this.value = ``;
  }

  writeValue(value: string): void {
    this.selected = value ?? 'IN';
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
