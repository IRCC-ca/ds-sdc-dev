import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControlStatus,
  FormGroup,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { IErrorPairs } from '../../../shared/interfaces/component-configs';
import { DSSizes } from '../../../shared/constants/jl-components.constants';
import {
  IErrorIDs,
  StandAloneFunctions
} from '../../../shared/functions/stand-alone.functions';
import {
  ERROR_TEXT_STUB,
  ILabelConfig,
  ILabelIconConfig
} from '../../shared/label/label.component';
import { TranslateService } from '@ngx-translate/core';
import { IIconButtonComponentConfig } from '../../shared/icon-button/icon-button.component';

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
  password = 'password',
  autocomplete = 'autocomplete'
}

export const ARIA_TEXT = {
  en: {
    btnTypePasswordAriaLabel: 'password eye icon',
    btnTypePasswordShowAriaLabel: 'display password text',
    btnTypePasswordHideAriaLabel: 'mark password text',
    btnTypeAutoCompleteClear: 'clear text'
  },
  fr: {
    btnTypePasswordAriaLabel: "icône d'oeil de mot de passe",
    btnTypePasswordShowAriaLabel: 'afficher le texte du mot de passe',
    btnTypePasswordHideAriaLabel: 'mark password text',
    btnTypeAutoCompleteClear: 'Effacer le texte'
  }
};

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
export class InputComponent
  implements ControlValueAccessor, OnInit, OnChanges, AfterContentChecked
{
  formGroupEmpty: FormGroup = new FormGroup({});
  /**
   * Note: DON'T include default values of '' unless it REALLY makes sense to do so - instead, make them optional.
   * The config input is where you declare the inputs desired properties such as labels, hints, descriptions, etc. where only the id and form group are mandatory properties. Refer to IInputComponentConfig interface.
   */
  @Input() config: IInputComponentConfig = {
    id: '',
    formGroup: new FormGroup({})
  };
  /**
   * The input id is used to identify the component uniquely for subscribing to value changes and errors
   */
  @Input() id = '';

  /**
   * FormGroup aggregates the values of each child FormControl into one object, with each control name as the key. It calculates its status by reducing the status values of its children. For example, if one of the controls in a group is invalid, the entire group becomes invalid.
   */
  @Input() formGroup = this.formGroupEmpty;

  /**
   * Type refers to the 2 different input options: basic text or password as the password type has additional configuration
   */
  @Input() type: keyof typeof InputTypes = InputTypes.password;

  @Input() size?: keyof typeof DSSizes;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() desc?: string;
  @Input() required?: boolean; // This field only adds styling to the label and DOES NOT add any validation to the input field.
  @Input() placeholder?: string;
  @Input() errorMessages?: IErrorPairs[];
  @Output() focusEvent = new EventEmitter();

  disabled = false;
  focusState = false;
  showPassword?: boolean;
  typeControl: keyof typeof InputTypes = InputTypes.text;
  btnAriaLabel = '';
  btnAriaLabelHide = '';
  btnAriaLabelShow = '';
  btnAriaTypeAutoCompleteClear = '';
  errorIds: IErrorIDs[] = [];
  errorAria = '';
  formControl?: AbstractControl;
  labelConfig: ILabelConfig = {
    formGroup: this.config.formGroup,
    parentID: ''
  };
  touched = false;
  errorStubText = '';
  currentStatus: FormControlStatus = 'VALID';

  buttonAutoCompleteClear: IIconButtonComponentConfig = {
    id: `${this.config.id}-button-autocomplete`,
    category: 'custom',
    size: 'extraSmall',
    icon: {
      class: 'fa-solid fa-circle-xmark',
      color: 'var(--neutral-text)'
    }
  };
  buttonAutoCompleteClearClicked: boolean = false;

  constructor(
    public standAloneFunctions: StandAloneFunctions,
    private translate: TranslateService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    //set config from individual options, if present
    if (this.formGroup !== this.formGroupEmpty) {
      this.config.formGroup = this.formGroup;
    }
    if (this.id !== '') {
      this.config.id = this.id;
    }

    if (!this.config.type) {
      this.config.type = InputTypes.text;
    } else if (this.config.type === InputTypes.password) {
      this.showPassword = false;
      this.typeControl = InputTypes.password;
    }

    if (this.size) this.config.size = this.size;
    if (this.label) this.config.label = this.label;
    if (this.hint) this.config.hint = this.hint;
    if (this.desc) this.config.desc = this.desc;
    if (this.required) this.config.required = this.required;
    if (this.placeholder) this.config.placeholder = this.placeholder;
    if (this.errorMessages) this.config.errorMessages = this.errorMessages;
  }

  //Removed '!' and added null case in onChange
  onTouch = () => {
    if (this.formGroup?.get(this.config.id)?.touched === false) {
      this.formGroup?.get(this.config.id)?.markAsTouched();
    }
  };

  onChange = (value: string) => {
    this.config.formGroup.get(this.config.id)?.setValue(value);
  };

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }

  /**
   * When the page loads, we initialize the form with it's controls, labels, and config, and detect value changes and errors. setLang detects changes to the language toggle to serve the correct text
   */
  ngOnInit() {
    const retControl = this.config.formGroup.get(this.config.id);
    if (retControl) {
      this.formControl = retControl;
    }

    this.setLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((change) => {
      this.setLang(change.lang);
    });

    this.type === InputTypes.text
      ? (this.showPassword = false)
      : (this.showPassword = true);

    this.labelConfig = this.standAloneFunctions.makeLabelConfig(
      this.config.formGroup,
      this.config.id,
      this.config.errorMessages,
      this.config.label,
      this.config.desc,
      this.config.hint,
      this.config.required,
      this.config.labelIconConfig
    );

    //set disable to true when form is disabled
    this.config.formGroup.valueChanges.subscribe((change) => {
      this.disabled = this.config.formGroup.get(this.config.id)
        ?.disabled as boolean;
    });

    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(
        this.config.formGroup,
        this.config.id,
        this.config.errorMessages
      );
    }

    this.currentStatus = this.config.formGroup.get(this.config.id)?.status || 'DISABLED';
    switch (this.currentStatus) {
      case 'DISABLED':
        this.setDisabledState(true);
        break;
      default:
        this.setDisabledState(false);
    }    //Get the error text when the formControl value changes
    this.config.formGroup.get(this.config.id)?.statusChanges.subscribe((change) => {
      this.getAriaErrorText();
      if(change !== this.currentStatus){
        this.currentStatus = change;
        switch (this.currentStatus) {
          case 'DISABLED':
            this.setDisabledState(true);
            break;
          default:
            this.setDisabledState(false);
        }}
      });
  }

  /**
   * Get the aria error text for the label
   */
  getAriaErrorText() {
    if (this.config.errorMessages) {
      this.formControl?.markAsDirty();
      this.errorAria = this.standAloneFunctions.getErrorAria(
        this.config.formGroup,
        this.config.id,
        this.config.errorMessages
      );
    }
  }

  /**
   * Set a boolean representing the touched state to true and trigger getAriaErrorText()
   */
  onTouchedLabel() {
    this.touched = true;
    this.getAriaErrorText();
    setTimeout(() => {
      // Do not emit blur event after clicking clear button
      if (!this.buttonAutoCompleteClearClicked) {
        this.focusEvent.emit(false);
      }
      this.buttonAutoCompleteClearClicked = false;
    }, 100);
  }

  onFocus() {
    if (!this.config.formGroup.get(this.config.id)?.disabled) {
      this.focusEvent.emit(true);
    }
  }

  /**
   * setLang detects changes to the language toggle to serve the correct aria error text
   */
  setLang(lang: string) {
    this.getAriaErrorText();
    if (lang === 'en' || lang === 'en-US') {
      this.errorStubText = ERROR_TEXT_STUB.en;
      this.btnAriaLabel = ARIA_TEXT.en.btnTypePasswordAriaLabel;
      this.btnAriaLabelHide = ARIA_TEXT.en.btnTypePasswordHideAriaLabel;
      this.btnAriaLabelShow = ARIA_TEXT.en.btnTypePasswordShowAriaLabel;
      this.btnAriaTypeAutoCompleteClear = ARIA_TEXT.en.btnTypeAutoCompleteClear;
    } else {
      this.errorStubText = ERROR_TEXT_STUB.fr;
      this.btnAriaLabel = ARIA_TEXT.fr.btnTypePasswordAriaLabel;
      this.btnAriaLabelHide = ARIA_TEXT.fr.btnTypePasswordHideAriaLabel;
      this.btnAriaLabelShow = ARIA_TEXT.fr.btnTypePasswordShowAriaLabel;
      this.btnAriaTypeAutoCompleteClear = ARIA_TEXT.en.btnTypeAutoCompleteClear;
    }
  }

  /**
   * A lifecycle hook that is called when any data-bound property of a directive changes.
   */
  ngOnChanges() {
    this.labelConfig = this.standAloneFunctions.makeLabelConfig(
      this.config.formGroup,
      this.config.id,
      this.config.errorMessages,
      this.config.label,
      this.config.desc,
      this.config.hint,
      this.config.required,
      this.config.labelIconConfig
    );

    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(
        this.config.formGroup,
        this.config.id,
        this.config.errorMessages
      );
    } else {
      this.errorIds = [];
    }

    if (this.config.type === InputTypes.text)
      this.typeControl = InputTypes.text;

    this.showPassword =
      this.config.type === InputTypes.password &&
      this.typeControl === InputTypes.text;
  }

  /**
   * Apply focus state
   */
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
    } else {
      this.typeControl = InputTypes.password;
    }
  }

  public clearvalue() {
    this.buttonAutoCompleteClearClicked = true;
    this.config.formGroup.controls[this.config.id].setValue('');
    this.focusEvent.emit(true);
  }

  /**
   * Prevents the info button from being triggered and marks the input as touched.
   * @param event
   */
  enterEvent(event: Event) {
    event.preventDefault();
    this.config.formGroup.get(this.config.id)?.markAsTouched();
    this.focusEvent.emit(false);
  }

  escapeEvent(event: Event) {
    event.preventDefault();
    this.config.formGroup.get(this.config.id)?.markAsTouched();
    this.focusEvent.emit(false);
  }

  changeValue(event: any){
    this.writeValue(event.srcElement.value);
    this.onTouch();
  }

  writeValue(value: string): void {
      this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  /**
   * Apply a disabled state
   */
  setDisabledState(isDisabled: boolean) {
    if(isDisabled){
      this.formGroup.get(this.config.id)?.disable();
    }else{
      this.formGroup.get(this.config.id)?.enable();
    }
  }

  /**
   * Return error state from FormGroup, must be touched & invalid
   */
  get getErrorState(): boolean {
    return (
      (this.config.formGroup.get(this.config.id)?.touched &&
        this.config.formGroup.get(this.config.id)?.invalid) ??
      false
    );
  }

  get getValueLength(): number {
    if (this.config.formGroup.get(this.config.id)?.value) {
      return this.config.formGroup.get(this.config.id)?.value.length;
    } else {
      return 0;
    }
  }
}
