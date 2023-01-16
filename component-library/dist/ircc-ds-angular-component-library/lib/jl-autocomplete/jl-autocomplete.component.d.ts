/**
 * TODO: This particular component, while functional, is not ideal. Components should not import other components directly in the .ts
 * unless absolutely necessary. Furthermore, the use of DoCheck, while interesting, is not ideal, since it ignores the built-in
 * angular lifecycle hooks and change detection.
 */
import { OnInit, EventEmitter, DoCheck, KeyValueDiffers, KeyValueDiffer } from '@angular/core';
import { JLInputComponent } from '../jl-input/jl-input.component';
import * as i0 from "@angular/core";
interface IOption {
    text: string;
    value: string;
}
export declare class JLAutocompleteComponent implements OnInit, DoCheck {
    private differs;
    inputComponent?: JLInputComponent;
    options: IOption[];
    title: string;
    hintText: string;
    name: string;
    error: boolean;
    limit: number;
    selectValueChange: EventEmitter<any>;
    savedSelectedOptions: IOption[];
    selectedOptions: IOption[];
    originalOptions: IOption[];
    inputValue?: string;
    hideDropdown: boolean;
    isFocusInsideComponent: boolean;
    isComponentClicked: boolean;
    addHover: boolean;
    emptyResults: boolean;
    differ: KeyValueDiffer<string, any>;
    constructor(differs: KeyValueDiffers);
    handleKeyDown(event: KeyboardEvent): void;
    clickInside(event: {
        target: HTMLInputElement;
    }): void;
    clickout(): void;
    onMouseEnter(): void;
    ngDoCheck(): void;
    valueChange(event: any): void;
    filterList(filterValue: any): void;
    checkActive(value: string): boolean;
    returnOptionsToDefault(): void;
    toggleDropDown(): void;
    toggleDropDownKey(event: KeyboardEvent): void;
    removeChipItem(index: number): void;
    removeAllChipItems(): void;
    selectAll(): void;
    selectIndex(index: number): void;
    checkDuplicated(index: number): boolean;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<JLAutocompleteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<JLAutocompleteComponent, "jl-pr-sclp-autocomplete", never, { "options": "options"; "title": "title"; "hintText": "hintText"; "name": "name"; "error": "error"; "limit": "limit"; "savedSelectedOptions": "savedSelectedOptions"; }, { "selectValueChange": "selectValueChange"; }, never, never, false>;
}
export {};
