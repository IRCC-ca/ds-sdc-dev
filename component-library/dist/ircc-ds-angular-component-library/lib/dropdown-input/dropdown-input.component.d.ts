import { OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export interface IDropdownInputConfig {
    id: string;
    formGroup: FormGroup;
    small?: boolean;
    label?: string;
    options?: IDropdownInputOptionsConfig[];
    category?: string;
}
export interface IDropdownInputOptionsConfig {
    text: string;
    value?: string;
}
export declare class DropdownInputComponent implements OnInit, ControlValueAccessor {
    touched: boolean;
    config: IDropdownInputConfig;
    onChange: (formValue: string) => void;
    onTouched: () => void;
    writeValue(formValue: any): void;
    registerOnChange(onChange: any): void;
    registerOnTouched(onTouched: any): void;
    markAsTouched(): void;
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DropdownInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DropdownInputComponent, "lib-dropdown-input", never, { "config": "config"; }, {}, never, never, false>;
}
