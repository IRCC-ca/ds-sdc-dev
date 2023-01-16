import { ControlValueAccessor, FormGroup, ValidatorFn } from '@angular/forms';
import * as i0 from "@angular/core";
export interface ICheckBoxComponentConfig {
    formGroup: FormGroup;
    error?: true;
    small?: true;
    mixed?: true;
    disableFocus?: boolean;
    checked?: boolean;
    label?: string;
    id: string;
    validators?: ValidatorFn[];
    helpText?: string;
    customErrorText?: string;
}
export declare class JLCheckboxComponent implements ControlValueAccessor {
    formGroupEmpty: FormGroup;
    checkboxIsChecked: boolean;
    touched: boolean;
    config: ICheckBoxComponentConfig;
    formGroup: FormGroup<any>;
    id: string;
    isDisabled: boolean;
    onTouch: () => void;
    onChange: () => void;
    writeValue(checked: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    /**
     * This is used automatically by the parent formControl. It is used in the template to set the label to disabled
     * @param isDisabled
     */
    setDisabledState?(isDisabled: boolean): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<JLCheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<JLCheckboxComponent, "jl-pr-sclp-checkbox", never, { "config": "config"; "formGroup": "formGroup"; "id": "id"; }, {}, never, never, false>;
}
