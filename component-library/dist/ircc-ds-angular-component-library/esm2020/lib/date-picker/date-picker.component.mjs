import { Component, forwardRef, Input } from '@angular/core';
import { FormGroup, Validators, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
export class DatePickerComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.dateForm = new FormGroup({});
        this.days = [];
        this.months = [];
        this.years = [];
        //Get the current year for use in the year dropdown
        this.currentYear = new Date().getFullYear();
        this.onTouched = () => { };
    }
    ngOnInit() {
        // Populate the months and years arrays
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        for (let i = 1900; i <= this.currentYear; i++) {
            this.years.push(i);
        }
        // Set up a form control for the month and year
        this.dateForm.addControl((this.id + '_monthControl'), new FormControl('', Validators.required));
        this.dateForm.addControl((this.id + '_yearControl'), new FormControl('', Validators.required));
        this.dateForm.addControl((this.id + '_dayControl'), new FormControl('', Validators.required));
        // Populate the days array based on the selected month and year
        this.dateForm.get((this.id + '_monthControl'))?.valueChanges.subscribe(month => {
            //add if statement here - the value of year can be empty, since it may not have been selected yet.
            const numDays = this.updateDaysArray(month, this.dateForm.get((this.id + '_yearControl'))?.value);
            console.log(month, numDays);
            console.log(this.dateForm.get((this.id + '_yearControl'))?.value);
        });
        this.dateForm.get((this.id + '_yearControl'))?.valueChanges.subscribe(year => {
            const numDays = this.updateDaysArray(this.dateForm.get((this.id + '_monthControl'))?.value, year);
        });
        if (this.days.length === 0) {
            for (let i = 1; i <= 31; i++) {
                this.days.push(i);
            }
        }
    }
    /**
     * update the days array with the correct number of days based on the year and the month
     * @param month string of the month (TODO: Change this to be an LOV)
     * @param year year selected
     */
    updateDaysArray(month, year) {
        this.days = [];
        const numDays = this.getNumDaysInMonth(month, year);
        for (let i = 1; i <= numDays; i++) {
            this.days.push(i);
        }
        this.dateForm.get((this.id + '_dayControl'))?.setValue('');
    }
    /**
     * Get the number of days in the month based on the month and year
     * @param month string of the month selected
     * @param year number selected
     * @returns number representing the number of days in the month
     */
    getNumDaysInMonth(month, year) {
        const monthNum = this.getMonthNum(month);
        if (monthNum === 2) {
            return this.isLeapYear(year) ? 29 : 28;
        }
        else if ([4, 6, 9, 11].includes(monthNum)) {
            return 30;
        }
        else {
            return 31;
        }
    }
    /**
     * Check if the year is a leap year
     * @param year number representing the year
     * @returns true if a leap year, false otherwise
     */
    isLeapYear(year) {
        if (year % 4 === 0) {
            if (year % 100 === 0) {
                return year % 400 === 0;
            }
            return true;
        }
        return false;
    }
    /**
     * Switch function that grabs the month number based on the month name/lov
     * @param month string representing the month
     * @returns number representing the month (Jan = 1, etc.)/ or 0, if no match found.
     */
    getMonthNum(month) {
        switch (month) {
            case 'January':
                return 1;
            case 'February':
                return 2;
            case 'March':
                return 3;
            case 'April':
                return 4;
            case 'May':
                return 5;
            case 'June':
                return 6;
            case 'July':
                return 7;
            case 'August':
                return 8;
            case 'September':
                return 9;
            case 'October':
                return 10;
            case 'November':
                return 11;
            case 'December':
                return 12;
            default:
                return 0;
        }
    }
    writeValue(obj) {
        if (obj) {
            this.dateForm.setValue(obj, { emitEvent: false });
        }
    }
    registerOnChange(fn) {
        this.dateForm.valueChanges.subscribe(fn);
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        isDisabled ? this.dateForm.disable() : this.dateForm.enable();
    }
}
DatePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: DatePickerComponent, deps: [{ token: i1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
DatePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: DatePickerComponent, selector: "lib-date-picker", inputs: { title: "title", dateForm: "dateForm", id: "id" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div class=\"date-title\" [attr.aria-label]=\"title\">{{ title }}</div>\n<div class=\"date-form\">\n    <form [formGroup]=\"dateForm\">\n        <div class=\"select-container\">\n            <div class=\"label-year\">Year YYYY</div>\n            <label for=\"year\" class=\"sr-only\">Year:</label>\n            <select id=\"year\" aria-label=\"Select a year\" [formControlName]=\"id + '_yearControl'\" class=\"date-input\">\n                <option *ngFor=\"let year of years\" [value]=\"year\">{{ year }}</option>\n            </select>\n        </div>\n        <div class=\"select-container\">\n            <div class=\"label-month\">Month MM</div>\n            <label for=\"month\" class=\"sr-only\">Month:</label>\n            <select id=\"month\" aria-label=\"Select a month\" [formControlName]=\"id + '_monthControl'\" class=\"date-input\">\n                <option *ngFor=\"let month of months\" [value]=\"month\">{{ month }}</option>\n            </select>\n        </div>\n        <div class=\"select-container\">\n            <div class=\"label-day\">Day DD</div>\n            <label for=\"day\" class=\"sr-only\">Day:</label>\n            <select id=\"day\" aria-label=\"Select a day\" [formControlName]=\"id + '_dayControl'\" class=\"date-input\">\n                <option *ngFor=\"let day of days\" [value]=\"day\">{{ day }}</option>\n            </select>\n        </div>\n    </form>\n</div>", styles: [".date-title{margin-top:4px}.date-form{display:flex;flex-wrap:nowrap;align-items:center;justify-content:space-between}.date-form .label{text-align:left}.date-form .date-input{height:40px;border-radius:4px;flex:1;min-width:120px}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }], preserveWhitespaces: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: DatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-date-picker', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => DatePickerComponent),
                            multi: true
                        }
                    ], template: "<div class=\"date-title\" [attr.aria-label]=\"title\">{{ title }}</div>\n<div class=\"date-form\">\n    <form [formGroup]=\"dateForm\">\n        <div class=\"select-container\">\n            <div class=\"label-year\">Year YYYY</div>\n            <label for=\"year\" class=\"sr-only\">Year:</label>\n            <select id=\"year\" aria-label=\"Select a year\" [formControlName]=\"id + '_yearControl'\" class=\"date-input\">\n                <option *ngFor=\"let year of years\" [value]=\"year\">{{ year }}</option>\n            </select>\n        </div>\n        <div class=\"select-container\">\n            <div class=\"label-month\">Month MM</div>\n            <label for=\"month\" class=\"sr-only\">Month:</label>\n            <select id=\"month\" aria-label=\"Select a month\" [formControlName]=\"id + '_monthControl'\" class=\"date-input\">\n                <option *ngFor=\"let month of months\" [value]=\"month\">{{ month }}</option>\n            </select>\n        </div>\n        <div class=\"select-container\">\n            <div class=\"label-day\">Day DD</div>\n            <label for=\"day\" class=\"sr-only\">Day:</label>\n            <select id=\"day\" aria-label=\"Select a day\" [formControlName]=\"id + '_dayControl'\" class=\"date-input\">\n                <option *ngFor=\"let day of days\" [value]=\"day\">{{ day }}</option>\n            </select>\n        </div>\n    </form>\n</div>", styles: [".date-title{margin-top:4px}.date-form{display:flex;flex-wrap:nowrap;align-items:center;justify-content:space-between}.date-form .label{text-align:left}.date-form .date-input{height:40px;border-radius:4px;flex:1;min-width:120px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }]; }, propDecorators: { title: [{
                type: Input
            }], dateForm: [{
                type: Input
            }], id: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50LWxpYi9zcmMvbGliL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudC1saWIvc3JjL2xpYi9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLFNBQVMsRUFBZSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFjcEcsTUFBTSxPQUFPLG1CQUFtQjtJQVc5QixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVRuQyxhQUFRLEdBQWMsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFakQsU0FBSSxHQUFhLEVBQUUsQ0FBQztRQUNwQixXQUFNLEdBQWEsRUFBRSxDQUFDO1FBQ3RCLFVBQUssR0FBYSxFQUFFLENBQUM7UUFFckIsbURBQW1EO1FBQzNDLGdCQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQWlJdkMsY0FBUyxHQUFlLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQS9ITSxDQUFDO0lBRWpELFFBQVE7UUFDTix1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDekksS0FBSyxJQUFJLENBQUMs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OytCQUNFLGlCQUFpQixhQUdoQjt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQzs0QkFDbEQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7a0dBR1EsS0FBSztzQkFBYixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzLCBOR19WQUxVRV9BQ0NFU1NPUiwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1kYXRlLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RhdGUtcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZVBpY2tlckNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgdGl0bGU/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRhdGVGb3JtOiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgQElucHV0KCkgaWQ/OiBzdHJpbmc7XG4gIGRheXM6IG51bWJlcltdID0gW107XG4gIG1vbnRoczogc3RyaW5nW10gPSBbXTtcbiAgeWVhcnM6IG51bWJlcltdID0gW107XG5cbiAgLy9HZXQgdGhlIGN1cnJlbnQgeWVhciBmb3IgdXNlIGluIHRoZSB5ZWFyIGRyb3Bkb3duXG4gIHByaXZhdGUgY3VycmVudFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIFBvcHVsYXRlIHRoZSBtb250aHMgYW5kIHllYXJzIGFycmF5c1xuICAgIHRoaXMubW9udGhzID0gWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ107XG4gICAgZm9yIChsZXQgaSA9IDE5MDA7IGkgPD0gdGhpcy5jdXJyZW50WWVhcjsgaSsrKSB7XG4gICAgICB0aGlzLnllYXJzLnB1c2goaSk7XG4gICAgfVxuXG4gICAgLy8gU2V0IHVwIGEgZm9ybSBjb250cm9sIGZvciB0aGUgbW9udGggYW5kIHllYXJcbiAgICB0aGlzLmRhdGVGb3JtLmFkZENvbnRyb2woKHRoaXMuaWQgKyAnX21vbnRoQ29udHJvbCcpLCBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpKTtcbiAgICB0aGlzLmRhdGVGb3JtLmFkZENvbnRyb2woKHRoaXMuaWQgKyAnX3llYXJDb250cm9sJyksIG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZCkpO1xuICAgIHRoaXMuZGF0ZUZvcm0uYWRkQ29udHJvbCgodGhpcy5pZCArICdfZGF5Q29udHJvbCcpLCBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpKTtcblxuICAgIC8vIFBvcHVsYXRlIHRoZSBkYXlzIGFycmF5IGJhc2VkIG9uIHRoZSBzZWxlY3RlZCBtb250aCBhbmQgeWVhclxuICAgIHRoaXMuZGF0ZUZvcm0uZ2V0KCh0aGlzLmlkICsgJ19tb250aENvbnRyb2wnKSk/LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUobW9udGggPT4ge1xuICAgICAgLy9hZGQgaWYgc3RhdGVtZW50IGhlcmUgLSB0aGUgdmFsdWUgb2YgeWVhciBjYW4gYmUgZW1wdHksIHNpbmNlIGl0IG1heSBub3QgaGF2ZSBiZWVuIHNlbGVjdGVkIHlldC5cbiAgICAgIGNvbnN0IG51bURheXMgPSB0aGlzLnVwZGF0ZURheXNBcnJheShtb250aCwgdGhpcy5kYXRlRm9ybS5nZXQoKHRoaXMuaWQgKyAnX3llYXJDb250cm9sJykpPy52YWx1ZSk7XG4gICAgICBjb25zb2xlLmxvZyhtb250aCwgbnVtRGF5cyk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGVGb3JtLmdldCgodGhpcy5pZCArICdfeWVhckNvbnRyb2wnKSk/LnZhbHVlKTtcbiAgICB9KTtcbiAgICB0aGlzLmRhdGVGb3JtLmdldCgodGhpcy5pZCArICdfeWVhckNvbnRyb2wnKSk/LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoeWVhciA9PiB7XG4gICAgICBjb25zdCBudW1EYXlzID0gdGhpcy51cGRhdGVEYXlzQXJyYXkodGhpcy5kYXRlRm9ybS5nZXQoKHRoaXMuaWQgKyAnX21vbnRoQ29udHJvbCcpKT8udmFsdWUsIHllYXIpO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLmRheXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAzMTsgaSsrKSB7XG4gICAgICAgIHRoaXMuZGF5cy5wdXNoKGkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgdGhlIGRheXMgYXJyYXkgd2l0aCB0aGUgY29ycmVjdCBudW1iZXIgb2YgZGF5cyBiYXNlZCBvbiB0aGUgeWVhciBhbmQgdGhlIG1vbnRoXG4gICAqIEBwYXJhbSBtb250aCBzdHJpbmcgb2YgdGhlIG1vbnRoIChUT0RPOiBDaGFuZ2UgdGhpcyB0byBiZSBhbiBMT1YpXG4gICAqIEBwYXJhbSB5ZWFyIHllYXIgc2VsZWN0ZWRcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlRGF5c0FycmF5KG1vbnRoOiBzdHJpbmcsIHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZGF5cyA9IFtdO1xuICAgIGNvbnN0IG51bURheXMgPSB0aGlzLmdldE51bURheXNJbk1vbnRoKG1vbnRoLCB5ZWFyKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBudW1EYXlzOyBpKyspIHtcbiAgICAgIHRoaXMuZGF5cy5wdXNoKGkpO1xuICAgIH1cbiAgICB0aGlzLmRhdGVGb3JtLmdldCgodGhpcy5pZCArICdfZGF5Q29udHJvbCcpKT8uc2V0VmFsdWUoJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbnVtYmVyIG9mIGRheXMgaW4gdGhlIG1vbnRoIGJhc2VkIG9uIHRoZSBtb250aCBhbmQgeWVhclxuICAgKiBAcGFyYW0gbW9udGggc3RyaW5nIG9mIHRoZSBtb250aCBzZWxlY3RlZFxuICAgKiBAcGFyYW0geWVhciBudW1iZXIgc2VsZWN0ZWQgXG4gICAqIEByZXR1cm5zIG51bWJlciByZXByZXNlbnRpbmcgdGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aFxuICAgKi9cbiAgcHJpdmF0ZSBnZXROdW1EYXlzSW5Nb250aChtb250aDogc3RyaW5nLCB5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IG1vbnRoTnVtID0gdGhpcy5nZXRNb250aE51bShtb250aCk7XG4gICAgaWYgKG1vbnRoTnVtID09PSAyKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyODtcbiAgICB9IGVsc2UgaWYgKFs0LCA2LCA5LCAxMV0uaW5jbHVkZXMobW9udGhOdW0pKSB7XG4gICAgICByZXR1cm4gMzA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAzMTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIHllYXIgaXMgYSBsZWFwIHllYXJcbiAgICogQHBhcmFtIHllYXIgbnVtYmVyIHJlcHJlc2VudGluZyB0aGUgeWVhclxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGEgbGVhcCB5ZWFyLCBmYWxzZSBvdGhlcndpc2VcbiAgICovXG4gIHByaXZhdGUgaXNMZWFwWWVhcih5ZWFyOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoeWVhciAlIDQgPT09IDApIHtcbiAgICAgIGlmICh5ZWFyICUgMTAwID09PSAwKSB7XG4gICAgICAgIHJldHVybiB5ZWFyICUgNDAwID09PSAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTd2l0Y2ggZnVuY3Rpb24gdGhhdCBncmFicyB0aGUgbW9udGggbnVtYmVyIGJhc2VkIG9uIHRoZSBtb250aCBuYW1lL2xvdlxuICAgKiBAcGFyYW0gbW9udGggc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbW9udGhcbiAgICogQHJldHVybnMgbnVtYmVyIHJlcHJlc2VudGluZyB0aGUgbW9udGggKEphbiA9IDEsIGV0Yy4pLyBvciAwLCBpZiBubyBtYXRjaCBmb3VuZC5cbiAgICovXG4gIHByaXZhdGUgZ2V0TW9udGhOdW0obW9udGg6IHN0cmluZykge1xuICAgICAgc3dpdGNoIChtb250aCkge1xuICAgICAgICBjYXNlICdKYW51YXJ5JzpcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgY2FzZSAnRmVicnVhcnknOlxuICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICBjYXNlICdNYXJjaCc6XG4gICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgIGNhc2UgJ0FwcmlsJzpcbiAgICAgICAgICByZXR1cm4gNDtcbiAgICAgICAgY2FzZSAnTWF5JzpcbiAgICAgICAgICByZXR1cm4gNTtcbiAgICAgICAgY2FzZSAnSnVuZSc6XG4gICAgICAgICAgcmV0dXJuIDY7XG4gICAgICAgIGNhc2UgJ0p1bHknOlxuICAgICAgICAgIHJldHVybiA3O1xuICAgICAgICBjYXNlICdBdWd1c3QnOlxuICAgICAgICAgIHJldHVybiA4O1xuICAgICAgICBjYXNlICdTZXB0ZW1iZXInOlxuICAgICAgICAgIHJldHVybiA5O1xuICAgICAgICBjYXNlICdPY3RvYmVyJzpcbiAgICAgICAgICByZXR1cm4gMTA7XG4gICAgICAgIGNhc2UgJ05vdmVtYmVyJzpcbiAgICAgICAgICByZXR1cm4gMTE7XG4gICAgICAgIGNhc2UgJ0RlY2VtYmVyJzpcbiAgICAgICAgICByZXR1cm4gMTI7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgfSAgIFxuICB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xuICAgIGlmIChvYmopIHtcbiAgICAgIHRoaXMuZGF0ZUZvcm0uc2V0VmFsdWUob2JqLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgfVxuICB9XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZGF0ZUZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZShmbik7XG4gIH1cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cbiAgc2V0RGlzYWJsZWRTdGF0ZT8oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlzRGlzYWJsZWQgPyB0aGlzLmRhdGVGb3JtLmRpc2FibGUoKSA6IHRoaXMuZGF0ZUZvcm0uZW5hYmxlKCk7XG4gIH1cbiAgcHJpdmF0ZSBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7IH07XG59IiwiPGRpdiBjbGFzcz1cImRhdGUtdGl0bGVcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInRpdGxlXCI+e3sgdGl0bGUgfX08L2Rpdj5cbjxkaXYgY2xhc3M9XCJkYXRlLWZvcm1cIj5cbiAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cImRhdGVGb3JtXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWwteWVhclwiPlllYXIgWVlZWTwvZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInllYXJcIiBjbGFzcz1cInNyLW9ubHlcIj5ZZWFyOjwvbGFiZWw+XG4gICAgICAgICAgICA8c2VsZWN0IGlkPVwieWVhclwiIGFyaWEtbGFiZWw9XCJTZWxlY3QgYSB5ZWFyXCIgW2Zvcm1Db250cm9sTmFtZV09XCJpZCArICdfeWVhckNvbnRyb2wnXCIgY2xhc3M9XCJkYXRlLWlucHV0XCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgeWVhciBvZiB5ZWFyc1wiIFt2YWx1ZV09XCJ5ZWFyXCI+e3sgeWVhciB9fTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsLW1vbnRoXCI+TW9udGggTU08L2Rpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJtb250aFwiIGNsYXNzPVwic3Itb25seVwiPk1vbnRoOjwvbGFiZWw+XG4gICAgICAgICAgICA8c2VsZWN0IGlkPVwibW9udGhcIiBhcmlhLWxhYmVsPVwiU2VsZWN0IGEgbW9udGhcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImlkICsgJ19tb250aENvbnRyb2wnXCIgY2xhc3M9XCJkYXRlLWlucHV0XCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgbW9udGggb2YgbW9udGhzXCIgW3ZhbHVlXT1cIm1vbnRoXCI+e3sgbW9udGggfX08L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdC1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbC1kYXlcIj5EYXkgREQ8L2Rpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkYXlcIiBjbGFzcz1cInNyLW9ubHlcIj5EYXk6PC9sYWJlbD5cbiAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJkYXlcIiBhcmlhLWxhYmVsPVwiU2VsZWN0IGEgZGF5XCIgW2Zvcm1Db250cm9sTmFtZV09XCJpZCArICdfZGF5Q29udHJvbCdcIiBjbGFzcz1cImRhdGUtaW5wdXRcIj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5c1wiIFt2YWx1ZV09XCJkYXlcIj57eyBkYXkgfX08L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+XG48L2Rpdj4iXX0=