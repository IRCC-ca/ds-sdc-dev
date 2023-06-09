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

export const MAX_CHAR_LIMIT_EN = 'Maximum character limit reached.';
export const MAX_CHAR_LIMIT_FR = 'Limite maximale de caractères atteinte.';

export const WARNING_CHAR_LIMIT_EN = 'Maximum character limit reached in 15 characters.';
export const WARNING_CHAR_LIMIT_FR = 'Limite maximale de caractères atteinte en 15 caractères.';

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
  announceCharStatusChangeAria : boolean = false;
  charLength : number = -1;
  labelConfig: ILabelConfig = {
    formGroup: this.config.formGroup,
    parentID: ''
  };

  constructor(
    public standAloneFunctions: StandAloneFunctions,
    private translate: TranslateService
    ) {}

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

    if (this.config.charLimit != '' && this.config.charLimit) {
      this.charLength = 0;
    }

    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(
        this.config.formGroup,
        this.config.id,
        this.config.errorMessages
      );
    }

    if (this.config.formGroup.controls[this.config.id].value) {
      this.charLength = this.config.formGroup.controls[this.config.id].value.length;
      this.characterCountStatus(this.config.formGroup.controls[this.config.id].value.length);
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
    let currLang = this.translate.currentLang;
    if (this.config?.charLimit) {
      if (this.config?.charLimit == currCharCount) {
        this.charLimitStatus = 'maxLimit';
        (currLang === 'en' || currLang === 'en-US') 
        ? (this.currentCharacterStatusAria = MAX_CHAR_LIMIT_EN) 
        : (this.currentCharacterStatusAria = MAX_CHAR_LIMIT_FR);
        this.announceCharStatusChangeAria = true;
      } else if (Number(this.config?.charLimit) - currCharCount == 15) {
        this.charLimitStatus = 'warningLimit';
        (currLang === 'en' || currLang === 'en-US') 
        ? (this.currentCharacterStatusAria = WARNING_CHAR_LIMIT_EN) 
        : (this.currentCharacterStatusAria = WARNING_CHAR_LIMIT_FR);
        this.announceCharStatusChangeAria = true;
      } else if (Number(this.config?.charLimit) - currCharCount < 15) {
        this.charLimitStatus = 'warningLimit';
        this.currentCharacterStatusAria = '';
      } else {
        this.charLimitStatus = '';
        this.currentCharacterStatusAria = '';
      }
    }
  }

  onBlur() {
    this.announceCharStatusChangeAria = false;
    if (this.config.formGroup.controls[this.config.id].value) {
      this.charLength = this.config.formGroup.controls[this.config.id].value.length;
    }
  }

  formatCharacterUsedString(currentLength :  number) : string {
    var formatedString = ''
    var currentLengthString = currentLength.toString()
    if (currentLengthString === '-1' || this.config.charLimit === '' || !this.config.charLimit) {
      return formatedString;
    }
    formatedString = currentLengthString + "/" + this.config.charLimit
    return formatedString;
  }

  public clearvalue() {}
  writeValue(value: string): void {}
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
