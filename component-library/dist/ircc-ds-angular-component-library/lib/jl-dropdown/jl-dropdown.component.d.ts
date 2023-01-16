import { OnInit, KeyValueDiffers } from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { DropdownTypes } from '../../shared/constants/jl-components/jl-components.constants/jl-components.constants';
import * as i0 from "@angular/core";
export interface IJLDropdownComponentConfig {
    type: DropdownTypes;
    options: IJLDropdownOptions[];
    text?: string;
    large?: boolean;
    error?: boolean;
    selectedIndex?: number;
    id: string;
}
export interface IJLDropdownOptions {
    text: string;
    value?: string;
}
export declare class JLDropdownComponent implements OnInit, ControlValueAccessor, Validator {
    private differs;
    config?: IJLDropdownComponentConfig;
    options?: IJLDropdownOptions[];
    id?: string;
    type?: DropdownTypes;
    text?: string;
    large?: true;
    error?: true;
    selectedIndex?: number;
    hideDropdown: boolean;
    isFocusInsideComponent: boolean;
    isComponentClicked: boolean;
    dropdownTypes: typeof DropdownTypes;
    touched: boolean;
    isDisabled: boolean;
    constructor(differs: KeyValueDiffers);
    onChange: (value: string) => void;
    onTouched: () => void;
    validate(control: AbstractControl<any, any>): ValidationErrors | null;
    writeValue(value: any): void;
    registerOnChange(onChange: any): void;
    registerOnTouched(onTouched: any): void;
    setDisabledState?(isDisabled: boolean): void;
    markAsTouched(): void;
    handleKeyDown(event: KeyboardEvent): void;
    clickInside(event: {
        target: HTMLInputElement;
    }): void;
    clickout(): void;
    toggleDropDown(): void;
    toggleDropDownKey(event: KeyboardEvent): void;
    /**
     * TODO: I've band-aided this one so that it works. Can probably remove the entire
     * custom DoCheck by just doing this.
     * @param index
     */
    selectIndex(index: number): void;
    getOptions(index: number): string;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<JLDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<JLDropdownComponent, "jl-pr-sclp-dropdown", never, { "config": "config"; "options": "options"; "id": "id"; "type": "type"; "text": "text"; "large": "large"; "error": "error"; "selectedIndex": "selectedIndex"; }, {}, never, never, false>;
}
