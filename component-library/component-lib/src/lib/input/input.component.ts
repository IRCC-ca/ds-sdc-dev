import {
  Component,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControlDirective, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DSSizes } from '../../shared/constants/jl-components/jl-components.constants/jl-components.constants';
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
  // @ViewChild(FormControlDirective, {static: true})
  // formControlDirective: FormControlDirective;
  
  formGroupEmpty: FormGroup = new FormGroup({});
  //DON'T include default values of '' unless it REALLY makes sense to do so. Instead, make them optional
  @Input() config: IInputComponentConfig = {
    id: '',
    formGroup: new FormGroup({})
  };

  @Input() id = '';
  @Input() formGroup = this.formGroupEmpty;

  disabled = false;
  currentDisabledState : boolean = false;
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

    if (!this.config.type) this.config.type='text';

    // this.currentDisabledState = this.config.formGroup.get(this.config.id)?.disabled;
  }

  // ngOnChanges() {
  //   console.log("---------------------> NGONINIT ------------------------------>")
  //   // if (this.disabledVar) {
  //     console.log( 'latest state', this.config.formGroup.get(this.config.id)?.disabled)
  //     console.log('DISABLED VAR', this.disabledVar)

  //         // } else {

  //   // }
  // }

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
    console.log('--------->type<----------------', this.config.type);
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean) {
    console.log("------------------------------------->disabled function", isDisabled)
    this.disabled = isDisabled;
    if(isDisabled) {
      this.formGroup.controls['id'].disable();
     } else {
        this.formGroup.controls['id'].enable();
      }
    // this.formControlDirective?.valueAccessor?.setDisabledState?.(isDisabled);
    // this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  /**
   * Return error state from FormGroup, must be touched & invalid
   */
  getErrorState(): boolean {
    return (this.config.formGroup.get(this.config.id)?.touched &&
      this.config.formGroup.get(this.config.id)?.invalid) ?? false;
  }
}
