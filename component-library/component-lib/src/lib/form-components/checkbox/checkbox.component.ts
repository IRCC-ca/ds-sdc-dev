import {
  AfterViewInit,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
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
  helpText?: string;
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
  @Input() helpText?: string;
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

  constructor(
    public standAloneFunctions: StandAloneFunctions,
    private translate: TranslateService,
    private multicheckboxService: MultiCheckboxService
  ) {}

  onTouch = () => {};
  onChange = () => {};

  writeValue(): void {}
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
      this.config.helpText,
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
    if (this.helpText) this.config.helpText = this.helpText;
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

      // this.errorIds.forEach((errorId) => {
      //   this.multicheckboxService.errorEvent({
      //     id: this.config.id,
      //     event: errorId
      //   });
      // });
    }

    //Get the error text when the formControl value changes
    // this.config.formGroup
    //   .get(this.config.id)
    //   ?.statusChanges.subscribe((error) => {
    //     this.getAriaErrorText();

    //     if (error === 'VALID') {
    //       this.multicheckboxService.errorEvent({
    //         id: this.config.id,
    //         event: { remove: true }
    //       });
    //     }
    //   });
  }

  ngOnChanges() {
    this.labelConfig = this.standAloneFunctions.makeLabelConfig(
      this.config.formGroup,
      this.config.id,
      this.config.errorMessages,
      this.config.label,
      this.config.desc,
      this.config.helpText,
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
  getErrorState(): boolean {
    return (
      (this.config.formGroup.get(this.config.id)?.touched &&
        this.config.formGroup.get(this.config.id)?.invalid) ??
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
    if (this.config.helpText)
      returnVal += this.translate.instant(this.config.helpText || '') + ' ';
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
