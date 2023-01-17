import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'lib-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements OnInit {
  @Input() title?: string;
  @Input() dateForm: FormGroup = new FormGroup({});
  @Input() id?: string;
  days: number[] = [];
  months: string[] = [];
  years: number[] = [];

  //Get the current year for use in the year dropdown
  private currentYear = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder) { }

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
  private updateDaysArray(month: string, year: number): void {
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
  private getNumDaysInMonth(month: string, year: number): number {
    const monthNum = this.getMonthNum(month);
    if (monthNum === 2) {
      return this.isLeapYear(year) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(monthNum)) {
      return 30;
    } else {
      return 31;
    }
  }

  /**
   * Check if the year is a leap year
   * @param year number representing the year
   * @returns true if a leap year, false otherwise
   */
  private isLeapYear(year: number): boolean {
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
  private getMonthNum(month: string) {
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

  writeValue(obj: any): void {
    if (obj) {
      this.dateForm.setValue(obj, { emitEvent: false });
    }
  }
  registerOnChange(fn: any): void {
    this.dateForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.dateForm.disable() : this.dateForm.enable();
  }
  private onTouched: () => void = () => { };
}