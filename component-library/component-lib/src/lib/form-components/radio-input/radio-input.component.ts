import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
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
export class RadioInputComponent implements OnInit, ControlValueAccessor {
  formGroupEmpty = new FormGroup({});
  touched = false;
  errorIds: IErrorIDs[] = [];
  formControl?: AbstractControl;

  @Input() config: IRadioInputComponentConfig = {
    id: '',
    formGroup: this.formGroupEmpty
  };
  @Input() id = '';
  @Input() formGroup = this.formGroupEmpty;

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

  onChange = (formValue: string) => {};
  onTouched = () => {};
  writeValue(formValue: any) {
    // this.form.get('formControl')?.setValue(formValue);
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
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

    if (this.id !== '') this.config.id = this.id;
    if (this.formGroup !== this.formGroupEmpty)
      this.config.formGroup = this.formGroup;
    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(
        this.config.formGroup,
        this.config.id,
        this.config.errorMessages
      );
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

  /**
   * used to disable individual fields (from the config under 'options')
   * @param index of the option field to be disabled
   * @returns null if value is undefined, empty string otherwise. This works with [attr.disabled].
   */
  getDisabled(index: number) {
    if (this.config.options) {
      if (
        this.config.options[index].disabled === undefined &&
        !this.config.disabled
      ) {
        return null;
      }
    }
    return '';
  }
}
