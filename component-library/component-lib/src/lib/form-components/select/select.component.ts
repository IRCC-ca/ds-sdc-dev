import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DSSizes } from "../../../shared/constants/jl-components/jl-components.constants/jl-components.constants";
import { IErrorPairs } from '../../../shared/interfaces/component-configs';
import { IErrorIDs, StandAloneFunctions } from '../../../shared/functions/stand-alone.functions';
import { ILabelConfig } from '../../shared/label/label.component';
import { IIconButtonComponentConfig } from '../../shared/icon-button/icon-button.component';

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
  labelIconConfig?: IIconButtonComponentConfig;
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
  activiatedSelect : boolean = false

  @Input() config: ISelectConfig = {
    id: '',
    formGroup: new FormGroup({}),
    // category: 'secondary',
  };

  labelConfig: ILabelConfig = {
    formGroup: this.config.formGroup,
    parentID: ''
  }

  constructor(public standAloneFunctions: StandAloneFunctions) { }

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

  valueChange($event : any) {
    this.activiatedSelect = true;
  }

  ngOnInit() {
    this.labelConfig = this.standAloneFunctions.makeLabelConfig(
      this.config.formGroup,
      this.config.id,
      this.config.errorMessages,
      this.config.label,
      this.config.desc,
      this.config.hint,
      this.config.required,
      this.config.labelIconConfig);

    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(this.config.formGroup, this.config.id, this.config.errorMessages);
    }
  }

  ngOnChanges(){
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
}
