import { OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, ValidatorFn } from '@angular/forms';
import * as i0 from "@angular/core";
export interface IJLInputComponentConfig {
    label?: string;
    hintText?: string;
    placeholder?: string;
    type?: InputTypes;
    value?: string;
    name?: string;
    id: string;
    formGroup: FormGroup;
    autocomplete?: string;
    large?: true;
    error?: boolean;
    empty?: boolean;
    validators?: ValidatorFn[];
}
export declare enum InputTypes {
    text = "text",
    password = "password"
}
export declare class JLInputComponent implements ControlValueAccessor, OnInit {
    formGroupEmpty: FormGroup;
    config: IJLInputComponentConfig;
    id: string;
    formGroup: FormGroup<any>;
    disabled: boolean;
    focusState: boolean;
    showPassword: boolean;
    private onTouch?;
    private onChange?;
    ngOnInit(): void;
    focusInput(focusValue: boolean): void;
    /**
     * Toggle the password field
     */
    hideShow(): void;
    clearvalue(): void;
    writeValue(value: string): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<JLInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<JLInputComponent, "jl-pr-sclp-input", never, { "config": "config"; "id": "id"; "formGroup": "formGroup"; }, {}, never, never, false>;
}
