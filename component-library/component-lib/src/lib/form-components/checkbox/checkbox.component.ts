import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import { IErrorPairs } from '../../../shared/interfaces/component-configs';
import { DSSizes } from '../../../shared/constants/jl-components/jl-components.constants/jl-components.constants';
import { IErrorIDs, StandAloneFunctions } from '../../../shared/functions/stand-alone.functions';
import { ERROR_TEXT_STUB_EN, ERROR_TEXT_STUB_FR, ILabelConfig, ILabelIconConfig } from '../../shared/label/label.component';
import { TranslateService } from '@ngx-translate/core';


export interface ICheckBoxComponentConfig {
  formGroup: FormGroup;
  label?: string;
  required?: boolean;
  size?: keyof typeof DSSizes | DSSizes;
  mixed?: true;
  disableFocus?: boolean; //Default is true
  inlineLabel?: string;
  inlineLabelBold?: boolean;
  id: string; //used for identifying the component everywhere and should NEVER be missing
  helpText?: string;
  customErrorText?: string;
  desc?: string;
  errorMessages?: IErrorPairs[];
  labelIconConfig?: ILabelIconConfig;
}

@Component({
  selector: 'lib-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]

})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  formGroupEmpty: FormGroup = new FormGroup({});

  //TODO: Add output - consider using a formControl as output rather than anything else. Many different approaches are possible
  @Input() config: ICheckBoxComponentConfig = {
    id: '',
    formGroup: this.formGroupEmpty,
    size: DSSizes.large
  };

  @Input() formGroup = this.formGroupEmpty;
  @Input() id = '';

  isDisabled = false;
  errorIds: IErrorIDs[] = [];
  formControl?: AbstractControl;
  labelConfig: ILabelConfig = {
    formGroup: this.config.formGroup,
    parentID: ''
  };
  touched = false;
  errorAria = '';
  errorStubText = '';

  constructor(public standAloneFunctions: StandAloneFunctions,
              private translate: TranslateService) { }

  onTouch = () => {};
  onChange = () => {};

  writeValue(): void {
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  /**
   * This is used automatically by the parent formControl. It is used in the template to set the label to disabled
   * @param isDisabled
   */
  setDisabledState?(isDisabled: boolean) {
    // (this.config !== undefined) ? this.config.disabled = isDisabled : this.disabled = isDisabled;
    this.isDisabled = isDisabled;
  }

  ngOnInit() {
    const retControl = this.config.formGroup.get(this.config.id);
    if(retControl){
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
      this.config.helpText,
      this.config.required,
      this.config.labelIconConfig);

    if (this.id !== '') {
      this.config.id = this.id;
    }
    if (!this.config?.size) this.config.size = DSSizes.large;

    if (this.formGroup !== this.formGroupEmpty) {
      this.config.formGroup = this.formGroup;
    }

    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(this.config.formGroup, this.config.id, this.config.errorMessages)
    }

    //Get the error text when the formControl value changes
    this.config.formGroup.get(this.config.id)?.statusChanges.subscribe(() => {
      this.getAriaErrorText();
    });
  }

  ngOnChanges(){
    this.labelConfig = this.standAloneFunctions.makeLabelConfig(
      this.config.formGroup,
      this.config.id,
      this.config.errorMessages,
      this.config.label,
      this.config.desc,
      this.config.helpText,
      this.config.required,
      this.config.labelIconConfig);
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

  /**
   * Return error state from FormGroup, must be touched & invalid
   */
  getErrorState(): boolean {
    return (this.config.formGroup.get(this.config.id)?.touched &&
      this.config.formGroup.get(this.config.id)?.invalid) ?? false;
  }
}
