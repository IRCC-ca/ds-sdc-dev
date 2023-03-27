import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DSSizes } from "../../../shared/constants/jl-components/jl-components.constants/jl-components.constants";
import { IErrorPairs } from '../../../shared/interfaces/component-configs';
import { IErrorIDs, StandAloneFunctions } from '../../../shared/functions/stand-alone.functions';
import { ERROR_TEXT_STUB_EN, ERROR_TEXT_STUB_FR, ILabelConfig, ILabelIconConfig } from '../../shared/label/label.component';
import { IIconButtonComponentConfig } from '../../shared/icon-button/icon-button.component';
import { TranslateService } from '@ngx-translate/core';

// export declare enum SelectType {
//   secondary = "secondary",
//   primary = "primary",
//   plain = "plain",
// }
export interface ISelectConfig {
  id: string;
  formGroup: FormGroup;
  label?: string;
  options?: ISelectOptionsConfig[];
  // category?: keyof typeof SelectType;
  required?: boolean;
  hint?: string;
  desc?: string;
  placeholder?: string;
  size?: keyof typeof DSSizes;
  errorMessages?: IErrorPairs[];
  labelIconConfig?: ILabelIconConfig;
  topLabel?: string;
  disableError?: boolean //used to disable the error aria-live (mostly for use when nested, as in date picker)
}
export interface ISelectOptionsConfig {
  text: string;
  value?: string;
}

@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent) //This allows the error state to be turned off and on again
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  touched = false;
  errorIds: IErrorIDs[] = [];
  activiatedSelect: boolean = false

  @Input() config: ISelectConfig = {
    id: '',
    formGroup: new FormGroup({}),
    // category: 'secondary',
  };
  formControl?: AbstractControl;
  errorAria = '';


  labelConfig: ILabelConfig = {
    formGroup: this.config.formGroup,
    parentID: ''
  };
  errorStubText = '';

  constructor(public standAloneFunctions: StandAloneFunctions,
              private translate: TranslateService) { }

  onChange = (formValue: string) => { };
  onTouched = () => { };
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

  valueChange($event: any) {
    this.activiatedSelect = true;
  }

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
      this.config.labelIconConfig,
      this.config.topLabel);

    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(this.config.formGroup, this.config.id, this.config.errorMessages);
    }
  }

  //This is used instead of ngOnChange here because it allows the config to be updated in date-picker.
  //TODO: Replace this with something less blunt
  ngDoCheck() {
    this.labelConfig = this.standAloneFunctions.makeLabelConfig(
      this.config.formGroup,
      this.config.id,
      this.config.errorMessages,
      this.config.label,
      this.config.desc,
      this.config.hint,
      this.config.required,
      this.config.labelIconConfig,
      this.config.topLabel);
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
}
