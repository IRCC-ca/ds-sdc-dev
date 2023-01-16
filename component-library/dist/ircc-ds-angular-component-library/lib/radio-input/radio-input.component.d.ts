import { OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, ValidatorFn } from '@angular/forms';
import { DSSizes } from '../../shared/constants/jl-components/jl-components.constants/jl-components.constants';
import * as i0 from "@angular/core";
export interface IRadioInputComponentConfig {
    id: string;
    formGroup: FormGroup;
    label?: string;
    options?: IRadioInputOption[];
    small?: true;
    disabled?: boolean;
    error?: true;
    validators?: ValidatorFn[];
    helpText?: string;
    customErrorText?: string;
}
export interface IRadioInputOption {
    text: string;
    value?: string;
    sizeOverride?: DSSizes;
    disabled?: true;
    error?: true;
}
export declare class RadioInputComponent implements OnInit, ControlValueAccessor {
    formGroupEmpty: FormGroup<{}>;
    size: DSSizes;
    sizes: typeof DSSizes;
    touched: boolean;
    config: IRadioInputComponentConfig;
    id: string;
    formGroup: FormGroup<{}>;
    onChange: (formValue: string) => void;
    onTouched: () => void;
    writeValue(formValue: any): void;
    registerOnChange(onChange: any): void;
    registerOnTouched(onTouched: any): void;
    markAsTouched(): void;
    ngOnInit(): void;
    /**
     *
     * @param override
     * @returns
     */
    getSize(override: DSSizes | undefined): DSSizes;
    /**
     * used to disable individual fields (from the config under 'options')
     * @param index of the option field to be disabled
     * @returns null if value is undefined, empty string otherwise. This works with [attr.disabled].
     */
    getDisabled(index: number): "" | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<RadioInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RadioInputComponent, "lib-radio-input", never, { "config": "config"; "id": "id"; "formGroup": "formGroup"; }, {}, never, never, false>;
}
