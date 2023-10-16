import { Component, forwardRef, Input, OnChanges, OnInit } from '@angular/core';
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
import { MultiCheckboxService } from '../multi-checkbox/multi-checkbox.service';
import { Subscription } from 'rxjs';

export interface ICheckBoxComponentConfig {
  formGroup: FormGroup;
  label?: string;
  required?: boolean;
  size?: keyof typeof DSSizes | DSSizes;
  mixed?: boolean;
  disableFocus?: boolean; //Default is true
  inlineLabel?: string;
  inlineLabelBold?: boolean;
  id: string; //used for identifying the component everywhere and should NEVER be missing
  hint?: string;
  customErrorText?: string;
  desc?: string;
  errorMessages?: IErrorPairs[];
  labelIconConfig?: ILabelIconConfig;
}

@Component({
  selector: 'ircc-cl-lib-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent
  implements ControlValueAccessor, OnInit, OnChanges
{
  formGroupEmpty: FormGroup = new FormGroup({});
  configSub?: Subscription;

  //TODO: Add output - consider using a formControl as output rather than anything else. Many different approaches are possible
  @Input() config: ICheckBoxComponentConfig = {
    id: '',
    formGroup: this.formGroupEmpty,
    size: DSSizes.large,
    label: '',
    inlineLabel: ''
  };

  @Input() formGroup = this.formGroupEmpty;
  @Input() id = '';

  @Input() label?: string = '';
  @Input() required?: boolean;
  @Input() size?: keyof typeof DSSizes | DSSizes;
  @Input() mixed?: boolean;
  @Input() disableFocus?: boolean; //Default is true
  @Input() inlineLabel?: string;
  @Input() inlineLabelBold?: boolean;
  @Input() hint?: string;
  @Input() customErrorText?: string;
  @Input() desc?: string;
  @Input() errorMessages?: IErrorPairs[];

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
  currentStatus: FormControlStatus = 'VALID';
  currentTouch: boolean = false;

  constructor(
    public standAloneFunctions: StandAloneFunctions,
    private translate: TranslateService,
    private multicheckboxService: MultiCheckboxService
  ) {}

  onTouch = () => {
    if (this.formGroup?.get(this.config.id)?.touched === false) {
      this.formGroup?.get(this.config.id)?.markAsTouched();
    }
  };

  onChange = (value: string) => {
    this.config.formGroup.get(this.config.id)?.setValue(value);
  };

  changeValue(event: any) {
    this.writeValue(event.srcElement.value);
    this.onTouch();
  }

  writeValue(value: string): void {
    this.onChange(value);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouch = onTouched;
  }

  /**
   * This is used automatically by the parent formControl. It is used in the template to set the label to disabled
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.formGroup.get(this.config.id)?.disable();
    } else {
      this.formGroup.get(this.config.id)?.enable();
    }
  }

  ngOnInit() {
    const retControl = this.config.formGroup.get(this.config.id);
    if (retControl) {
      this.formControl = retControl;
    }

    this.configSub = this.multicheckboxService.multiCheckboxEventObs$.subscribe(
      (response) => {
        if (response.id === this.config.id) {
          this.config.formGroup
            .get(this.config.id)
            ?.patchValue(response.event, { emitEvent: false });
        }
      }
    );

    this.config.formGroup
      .get(this.config.id)
      ?.valueChanges.subscribe((event) => {
        this.multicheckboxService.checkEvent({
          id: this.config.id,
          event: event
        });
      });

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
    if (this.formGroup !== this.formGroupEmpty) {
      this.config.formGroup = this.formGroup;
    }
    if (this.id) this.config.id = this.id;
    if (this.label) this.config.label = this.label;
    if (this.required) this.config.required = this.required;
    if (this.size) this.config.size = this.size;
    if (this.mixed) this.config.mixed = this.mixed;
    if (this.disableFocus) this.config.disableFocus = this.disableFocus;
    if (this.inlineLabel) this.config.inlineLabel = this.inlineLabel;
    if (this.inlineLabelBold)
      this.config.inlineLabelBold = this.inlineLabelBold;
    if (this.hint) this.config.hint = this.hint;
    if (this.customErrorText)
      this.config.customErrorText = this.customErrorText;
    if (this.desc) this.config.desc = this.desc;
    if (this.errorMessages) this.config.errorMessages = this.errorMessages;

    if (!this.config?.size) this.config.size = DSSizes.large;

    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(
        this.config.formGroup,
        this.config.id,
        this.config.errorMessages
      );

      this.errorIds.forEach((errorId) => {
        this.multicheckboxService.errorEvent(this.config.id);
      });
    }
    this.currentStatus =
      this.config.formGroup.get(this.config.id)?.status || 'DISABLED';
    this.toggleDisabledState();
    this.config.formGroup
      .get(this.config.id)
      ?.statusChanges.subscribe((change) => {
        this.getAriaErrorText();
        //Get the error text when the formControl value changes
        if (change === 'VALID') {
          this.multicheckboxService.errorEvent(this.config.id);
        }

        if (change !== this.currentStatus) {
          this.currentStatus = change;
          this.toggleDisabledState();
        }
        this.setStatus();
      });

    console.log(this.labelConfig);
  }

  setStatus() {
    this.currentStatus =
      this.config.formGroup.get(this.config.id)?.status || 'DISABLED';
    this.currentTouch = this.config.formGroup.controls[this.config.id].touched;
  }

  ngAfterViewInit() {
    this.setStatus();
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

  /**
   * Return error state from FormGroup, must be touched & invalid
   */
  get errorState(): boolean {
    this.setStatus()
    return (
      (this.currentTouch &&
        this.currentStatus === 'INVALID') ??
      false
    );
  }

  clickEvent() {
    this.standAloneFunctions.wasTouched(this.config.formGroup, this.config.id);
  }

  ariaAccess(): string {
    let returnVal = '';
    if (this.config.label)
      returnVal += this.translate.instant(this.config.label || '') + ' ';
    if (this.config.desc)
      returnVal += this.translate.instant(this.config.desc || '') + ' ';
    if (this.config.hint)
      returnVal += this.translate.instant(this.config.hint || '') + ' ';
    if (this.config.inlineLabel)
      returnVal += this.translate.instant(this.config.inlineLabel || '') + ' ';

    if (this.config.mixed) {
      returnVal += 'Mixed checkbox';
    }

    if (
      this.config.formGroup.get(this.config.id)?.invalid &&
      this.config.formGroup.get(this.config.id)?.touched
    ) {
      returnVal += this.errorStubText;
      returnVal += this.errorAria;
    }
    return returnVal;
  }
}
