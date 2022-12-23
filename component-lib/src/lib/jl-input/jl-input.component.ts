import {
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface IJLInputComponentConfig {
  label?: string;
  hintText?: string;
  placeholder?: string;
  type?: InputTypes;
  value?: string;
  name?: string;
  id: string;
  formGroup: FormGroup;
  autocomplete?: string;
  large?: true;
  error?: boolean;
  empty?: boolean; //Default is TRUE
}

export enum InputTypes {
  text = 'text',
  password = 'password'
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
  @Input() config: IJLInputComponentConfig = {
    id: '',
    formGroup: new FormGroup({})
  };

  disabled = false;
  focusState = false;
  showPassword = false;
  //Removed '!' and added null case in onChange
  private onTouch?: () => void;
  private onChange?: (value: any) => void;


  ngOnInit() {
    //initial null check to ensure that a null value isn't assigned since it can't be set in the html with an enum
    // !!this.type ?? (this.type = InputTypes.text); //TODO: Check if this actually works
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
    this.config.value = ``;
  }

  writeValue(value: string): void {
    this.config.value = value;
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

  /**
 * Used to get the aria-pressed text for the show password button
 * @param fieldID id of the input field the text is for
 * @returns translated text
 */
  //  getShowHideText(fieldID: string) {
  //   let text = ''
  //   if (fieldID === 'password') {
  //     text = this.translate.instant('Password.accessibility.passwordMatch1');
  //   } else {
  //     this.translate.instant('Password.accessibility.passwordMatch2');
  //   }
  //   (this.passwordFieldType === InputType.password) ?
  //     (text += (' ' + this.translate.instant('Password.accessibility.passHidden'))) :
  //     (text += (' ' + this.translate.instant('Password.accessibility.passShown')));
  //   return text;
  // }
}
