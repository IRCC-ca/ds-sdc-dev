import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { DSSizes } from '../../../shared/constants/jl-components.constants';
import {
  IErrorIDs,
  StandAloneFunctions
} from '../../../shared/functions/stand-alone.functions';
import { IErrorPairs } from '../../../shared/interfaces/component-configs';
import {
  ILabelConfig,
  ILabelIconConfig
} from '../../shared/label/label.component';
import { IErrorIconConfig } from '../error/error.component';
import { TranslateService } from '@ngx-translate/core';

export interface ITextareaComponentConfig {
  formGroup: FormGroup;
  id: string;
  label?: string;
  desc?: string;
  hint?: string;
  required?: boolean; // This field only adds styling to the label and DOES NOT add any validation to the input field.
  placeholder?: string;
  charLimit?: string;
  resizable?: keyof typeof ResizableTypes;
  size?: keyof typeof DSSizes;
  errorMessages?: IErrorPairs[];
  errorIcon?: IErrorIconConfig;
  labelIconConfig?: ILabelIconConfig;
}

export enum ResizableTypes {
  vertical = 'vertical',
  horizontal = 'password',
  both = 'both',
  none = 'none'
}

export const TEXT_AREA_ARIA_TEXT_EN = {
  charsUsedAriaLabel: `{{currentCharacterCount}} of {{characterLimit}}`,
}

export const TEXT_AREA_ARIA_TEXT_FR = {
  charsUsedAriaLabel: `{{currentCharacterCount}} of {{characterLimit}}`,
}

@Component({
  selector: 'ircc-cl-lib-textarea',
  templateUrl: './textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements ControlValueAccessor, OnInit {
  formGroupEmpty: FormGroup = new FormGroup({});
  //DON'T include default values of '' unless it REALLY makes sense to do so. Instead, make them optional
  @Input() config: ITextareaComponentConfig = {
    id: '',
    formGroup: new FormGroup({})
  };

  @Input() id = '';
  @Input() formGroup = this.formGroupEmpty;
  @Input() charLimit = '';

  disabled = false;
  focusState = false;
  errorIds: IErrorIDs[] = [];
  charLimitStatus = '';
  currentCharacterStatusAria = '';
  labelConfig: ILabelConfig = {
    formGroup: this.config.formGroup,
    parentID: ''
  };
  textAreaAriaLabel = '';

  constructor(public standAloneFunctions: StandAloneFunctions,
    private translate: TranslateService) { }

  //Removed '!' and added null case in onChange
  private onTouch?: () => void;
  private onChange?: (value: any) => void;

  ngOnInit(): void {
    if (this.id !== '') {
      this.config.id = this.id;
    }

    if (this.formGroup !== this.formGroupEmpty) {
      this.config.formGroup = this.formGroup;
    }

    if (this.charLimit !== '') {
      this.config.charLimit = this.charLimit;
    }

    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(
        this.config.formGroup,
        this.config.id,
        this.config.errorMessages
      );
    }

    if (this.config.formGroup.controls[this.config.id].value) {
      this.characterCountStatus(
        this.config.formGroup.controls[this.config.id].value.length
      );
    }

    this.config.formGroup.valueChanges.subscribe((change) => {
      this.characterCountStatus(change[this.config.id]?.length);
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
    this.setLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((change) => {
      this.setLang(change.lang);
    });
  }

/**
* setLang detects changes to the language toggle to serve the correct aria error text
*/
setLang(lang: string) {
  if (lang === 'en' || lang === 'en-US') {
    this.textAreaAriaLabel = this.translate.instant(TEXT_AREA_ARIA_TEXT_EN.charsUsedAriaLabel, {
      currentCharacterCount: this.formGroup.value.length,
      characterLimit: this.config.charLimit
    });

  } else {
    this.textAreaAriaLabel = this.translate.instant(TEXT_AREA_ARIA_TEXT_FR.charsUsedAriaLabel, {
      currentCharacterCount: this.formGroup.value.length,
      characterLimit: this.config.charLimit
    });
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

  public focusInput(focusValue: boolean): void {
    this.focusState = !focusValue;
  }

  characterCountStatus(currCharCount: any) {
    if (this.config?.charLimit) {
      if (this.config?.charLimit == currCharCount) {
        this.charLimitStatus = 'maxLimit';
        this.currentCharacterStatusAria = 'TEXTAREA_COMPONENT.maxLimit';
      } else if (Number(this.config?.charLimit) - currCharCount == 15) {
        this.charLimitStatus = 'warningLimit';
        this.currentCharacterStatusAria = 'TEXTAREA_COMPONENT.warningLimit';
      } else if (Number(this.config?.charLimit) - currCharCount < 15) {
        this.charLimitStatus = 'warningLimit';
        this.currentCharacterStatusAria = '';
      } else {
        this.charLimitStatus = '';
        this.currentCharacterStatusAria = '';
      }
    }
  }

  public clearvalue() { }
  writeValue(value: string): void { }
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
