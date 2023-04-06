import {
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IErrorPairs } from '../../../shared/interfaces/component-configs';
import { DSSizes } from '../../../shared/constants/jl-components.constants';
import { IErrorIDs, StandAloneFunctions } from '../../../shared/functions/stand-alone.functions';
import { ERROR_TEXT_STUB_EN, ERROR_TEXT_STUB_FR, ILabelConfig, ILabelIconConfig } from '../../shared/label/label.component';
import { TranslateService } from '@ngx-translate/core';

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
  labelIconConfig?: ILabelIconConfig;
}

export enum InputTypes {
  text = 'text',
  password = 'password'
}
@Component({
  selector: 'ircc-cl-lib-input',
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
    formGroup: new FormGroup({}),
  };

  @Input() id = '';
  @Input() formGroup = this.formGroupEmpty;
  @Input() type: keyof typeof InputTypes = InputTypes.password;

  disabled = false;
  focusState = false;
  showPassword?: boolean;
  typeControl: keyof typeof InputTypes = InputTypes.text;
  ariaText = 'Text Input';
  errorIds: IErrorIDs[] = [];
  errorAria = '';
  formControl?: AbstractControl;
  labelConfig: ILabelConfig = {
    formGroup: this.config.formGroup,
    parentID: ''
  }
  touched = false;
  errorStubText = '';

  constructor(public standAloneFunctions: StandAloneFunctions,
    private translate: TranslateService,) { }

  //Removed '!' and added null case in onChange
  private onTouch?: () => void;
  private onChange?: (value: any) => void;

  ngOnInit() {
    const retControl = this.config.formGroup.get(this.config.id);
    if (retControl) {
      this.formControl = retControl;
    }

    this.setLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe(change => {
      this.setLang(change.lang);
    });


    this.labelConfig = this.standAloneFunctions.makeLabelConfig(
      this.config.formGroup,
      this.config.id,
      this.config.errorMessages,
      this.config.label,
      this.config.desc,
      this.config.hint,
      this.config.required,
      this.config.labelIconConfig);

    if (this.id !== '') {
      this.config.id = this.id;
    }

    if (this.formGroup !== this.formGroupEmpty) {
      this.config.formGroup = this.formGroup;
    }

    if (!this.config.type) {
      this.config.type = InputTypes.text;
    }

    else if (this.config.type === InputTypes.password) {
      this.showPassword = false;
      this.typeControl = InputTypes.password;
      this.ariaText = "Password Input";
    }

    (this.type === InputTypes.text) ? (this.showPassword = false) : (this.showPassword = true);

    //set disable to true when form is disabled
    this.config.formGroup.valueChanges.subscribe(change => {
      if (change[this.config.id] === undefined) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    });
    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(this.config.formGroup, this.config.id, this.config.errorMessages);
    }

    //Get the error text when the formControl value changes
    this.config.formGroup.get(this.config.id)?.statusChanges.subscribe(() => {
      this.getAriaErrorText();
    });
  }

  /**
   * Get the aria error text for the label
   */
  getAriaErrorText() {
    if (this.config.errorMessages) {
      this.formControl?.markAsDirty();
      this.errorAria = this.standAloneFunctions.getErrorAria(this.config.formGroup, this.config.id, this.config.errorMessages);
    }
  }

  /**
   * Set a boolean representing the touched state to true and trigger getAriaErrorText()
   */
  onTouchedLabel() {
    this.touched = true;
    this.getAriaErrorText();
  }

  setLang(lang: string) {
    this.getAriaErrorText();
    if ((lang === 'en') || (lang === 'en-US')) {
      this.errorStubText = ERROR_TEXT_STUB_EN;

    } else {
      this.errorStubText = ERROR_TEXT_STUB_FR;
    }
  }

  ngOnChanges() {
    this.labelConfig = this.standAloneFunctions.makeLabelConfig(
      this.config.formGroup,
      this.config.id,
      this.config.errorMessages,
      this.config.label,
      this.config.desc,
      this.config.hint,
      this.config.required,
      this.config.labelIconConfig);
  }

  public focusInput(focusValue: boolean): void {
    this.focusState = !focusValue;
  }

  /**
   * Toggle the password field
   */
  hideShow() {
    this.showPassword = !this.showPassword;

    if (this.showPassword) {
      this.typeControl = InputTypes.text;
      this.ariaText = 'Text Input';
    }
    else {
      this.typeControl = InputTypes.password;
      this.ariaText = 'Password Input';
    }
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

  /**
   * Return error state from FormGroup, must be touched & invalid
   */
  get getErrorState(): boolean {
    return (this.config.formGroup.get(this.config.id)?.touched &&
      this.config.formGroup.get(this.config.id)?.invalid) ?? false;
  }

}
