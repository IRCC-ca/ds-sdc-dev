import { Component, forwardRef, Input, OnChanges, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControlStatus,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidatorFn
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

export interface IRadioInputComponentConfig {
  id: string;
  formGroup: FormGroup;
  label?: string;
  desc?: string;
  hint?: string;
  required?: boolean;
  options?: IRadioInputOption[];
  size?: keyof typeof DSSizes;
  disabled?: boolean;
  error?: true;
  validators?: ValidatorFn[];
  helpText?: string;
  errorMessages?: IErrorPairs[];
  labelIconConfig?: ILabelIconConfig;
}

export interface IRadioInputOption {
  text: string;
  value?: string;
  sizeOverride?: keyof typeof DSSizes;
  disabled?: true;
  error?: true;
}

@Component({
  selector: 'ircc-cl-lib-radio-input',
  templateUrl: './radio-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RadioInputComponent) //This allows the error state to be turned off and on again
    }
  ]
})
export class RadioInputComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  formGroupEmpty = new FormGroup({});
  touched = false;
  errorIds: IErrorIDs[] = [];
  formControl?: AbstractControl;
  currentStatus: FormControlStatus = 'VALID';

  @Input() config: IRadioInputComponentConfig = {
    id: '',
    formGroup: this.formGroupEmpty
  };
  @Input() id = '';
  @Input() formGroup = this.formGroupEmpty;
  @Input() size?: keyof typeof DSSizes;
  @Input() label?: string;
  @Input() desc?: string;
  @Input() hint?: string;
  @Input() required?: boolean;
  @Input() options?: IRadioInputOption[];
  @Input() disabled?: boolean;
  @Input() error?: true;
  @Input() validators?: ValidatorFn[];
  @Input() helpText?: string;
  @Input() errorMessages?: IErrorPairs[];

  labelConfig: ILabelConfig = {
    formGroup: this.config.formGroup,
    parentID: ''
  };
  errorStubText = '';
  errorAria = '';

  constructor(
    public standAloneFunctions: StandAloneFunctions,
    private translate: TranslateService
  ) {}

  onTouch = () => {
    if (this.formGroup?.get(this.config.id)?.touched === false) {
      this.formGroup?.get(this.config.id)?.markAsTouched();
    }
  };

  onChange = (value: string) => {
    this.config.formGroup.get(this.config.id)?.setValue(value);
  };
  
  changeValue(event: any){
    this.writeValue(event.srcElement.value);
    this.onTouch();
  }

  writeValue(value: string): void {
      this.onChange(value);
  }
  
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  
  registerOnTouched(onTouched: any) {
    this.onTouch = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }

  ngOnInit() {
    const retControl = this.config.formGroup.get(this.config.id);
    if (retControl) {
      this.formControl = retControl;
    }

    this.setLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((change) => {
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
      this.config.labelIconConfig
    );

    //set config from individual options, if present
    if (this.id !== '') this.config.id = this.id;
    if (this.formGroup !== this.formGroupEmpty)
      this.config.formGroup = this.formGroup;
    if (this.size) this.config.size = this.size;
    if (this.label) this.config.label = this.label;
    if (this.desc) this.config.desc = this.desc;
    if (this.hint) this.config.hint = this.hint;
    if (this.required) this.config.required = this.required;
    if (this.options) this.config.options = this.options;
    if (this.disabled) this.config.disabled = this.disabled;
    if (this.error) this.config.error = this.error;
    if (this.validators) this.config.validators = this.validators;
    if (this.helpText) this.config.helpText = this.helpText;
    if (this.errorMessages) this.config.errorMessages = this.errorMessages;

    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(
        this.config.formGroup,
        this.config.id,
        this.config.errorMessages
      );
    }

    this.currentStatus = this.config.formGroup.get(this.config.id)?.status || 'DISABLED';
    this.toggleDisabledState();
    this.config.formGroup
    .get(this.config.id)
    ?.statusChanges.subscribe((change) => {
      this.getAriaErrorText();
      if (change !== this.currentStatus) {
        this.currentStatus = change;
        this.toggleDisabledState();
      }
    });
}

    toggleDisabledState() {
    switch (this.currentStatus) {
      case 'DISABLED':
      this.setDisabledState(true);
      break;
    default:
      this.setDisabledState(false);
      break;
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
      this.config.labelIconConfig
    );
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
  }

  setLang(lang: string) {
    this.getAriaErrorText();
    if (lang === 'en' || lang === 'en-US') {
      this.errorStubText = ERROR_TEXT_STUB.en;
    } else {
      this.errorStubText = ERROR_TEXT_STUB.fr;
    }
  }
  
  setDisabledState(isDisabled: boolean) {
    if(isDisabled){
      this.formGroup.get(this.config.id)?.disable();
    }else{
      this.formGroup.get(this.config.id)?.enable();
    }
  }
}
