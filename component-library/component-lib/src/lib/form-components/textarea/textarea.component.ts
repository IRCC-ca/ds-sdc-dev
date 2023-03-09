import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DSSizes } from '../../../shared/constants/jl-components/jl-components.constants/jl-components.constants';
import { IErrorIDs, StandAloneFunctions } from '../../../shared/functions/stand-alone.functions';
import { IErrorPairs } from '../../../shared/interfaces/component-configs';
import { IErrorIconConfig } from '../error/error.component';


export interface ITextareaComponentConfig {
  formGroup: FormGroup;
  id: string;
  label?: string;
  desc?: string;
  hint?: string;
  required?: boolean; // This field only adds styling to the label and DOES NOT add any validation to the input field.
  placeholder?: string;
  charLimit? : number;
  resizable?: keyof typeof ResizableTypes;
  size?: keyof typeof DSSizes;
  errorMessages?: IErrorPairs[];
  errorIcon?: IErrorIconConfig;
}

export enum ResizableTypes {
  vertical = 'vertical',
  horizontal = 'password',
  both = 'both',
  none = 'none'
}

@Component({
  selector: 'lib-textarea',
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
    formGroup: new FormGroup({}),
  };
  disabled = false;
  focusState = false;
  errorIds: IErrorIDs[] = []
  

  constructor(public standAloneFunctions: StandAloneFunctions) { }

  //Removed '!' and added null case in onChange
  private onTouch?: () => void;
  private onChange?: (value: any) => void;

  ngOnInit(): void {

    // if (!this.config.resizable) this.config.resizable = ResizableTypes.both;

    if (this.config.errorMessages) {
      this.errorIds = this.standAloneFunctions.getErrorIds(this.config.formGroup, this.config.id, this.config.errorMessages)
    }
  }

  public focusInput(focusValue: boolean): void {
    this.focusState = !focusValue;
  }


  public clearvalue() {
  }
  writeValue(value: string): void {
  }
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
