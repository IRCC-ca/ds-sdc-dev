import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class DatePickerComponent implements OnInit {
    private formBuilder;
    title?: string;
    dateForm: FormGroup;
    id?: string;
    days: number[];
    months: string[];
    years: number[];
    private currentYear;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
    /**
     * update the days array with the correct number of days based on the year and the month
     * @param month string of the month (TODO: Change this to be an LOV)
     * @param year year selected
     */
    private updateDaysArray;
    /**
     * Get the number of days in the month based on the month and year
     * @param month string of the month selected
     * @param year number selected
     * @returns number representing the number of days in the month
     */
    private getNumDaysInMonth;
    /**
     * Check if the year is a leap year
     * @param year number representing the year
     * @returns true if a leap year, false otherwise
     */
    private isLeapYear;
    /**
     * Switch function that grabs the month number based on the month name/lov
     * @param month string representing the month
     * @returns number representing the month (Jan = 1, etc.)/ or 0, if no match found.
     */
    private getMonthNum;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    private onTouched;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DatePickerComponent, "lib-date-picker", never, { "title": "title"; "dateForm": "dateForm"; "id": "id"; }, {}, never, never, false>;
}
