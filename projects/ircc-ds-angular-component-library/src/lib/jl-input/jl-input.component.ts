import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface IJLInputComponent {
  label?: string;
  hintText?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  name?: string;
  autocomplete?: string;
  large?: boolean;
  error?: boolean;
  empty?: boolean;
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
export class JLInputComponent implements ControlValueAccessor {
  //DON'T include default values of '' unless it REALLY makes sense to do so. Instead, make them optional
  @Input() label?: string;
  @Input() hintText?: string; //Made optional instead of a length check. More efficient and cleaner
  @Input() placeholder?: string;;
  @Input() type = `text`;
  @Input() value?: string;
  @Input() name?: string;
  @Input() autocomplete = `on`;
  @Input() large = false;
  @Input() error = false;
  @Input() empty = true;

  @Output() valueChange = new EventEmitter();

  selected?: string;
  disabled = false;
  focusState = false;
  //Removed '!' and added null case in onChange
  private onTouched?: () => void;
  private onChanged?: (value: any) => void;

  constructor() { }

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
    this.valueChange.emit(this.value);
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
