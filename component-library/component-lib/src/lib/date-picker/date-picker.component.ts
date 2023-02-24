import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DSSizes, IErrorPairs, StandAloneFunctions } from '../../public-api';
import { DropdownType, IDropdownInputConfig } from '../dropdown-input/dropdown-input.component';

export const DATE_PICKER_MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

export const DATE_PICKER_MONTHS_FR = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
];

export const DATE_PICKER_DAY_CONTROL_ID_EXTENSION = '_dayControl';
export const DATE_PICKER_MONTH_CONTROL_ID_EXTENSION = '_monthControl';
export const DATE_PICKER_YEAR_CONTROL_ID_EXTENSION = '_yearControl';



export interface IDatePickerConfig {
  id: string;
  formGroup: FormGroup;
  size?: keyof typeof DSSizes;
  label?: string;
  category?: keyof typeof DropdownType
  required?: boolean;
  hint?: string;
  desc?: string;
  errorMessages?: IDatePickerErrorMessages;
}

export interface IDatePickerErrorMessages {
  general?: IErrorPairs[];
  day?: IErrorPairs[];
  month?: IErrorPairs[];
  year?: IErrorPairs[];
}

export interface IDatePickerDropDownConfigs {
  day: IDropdownInputConfig;
  month: IDropdownInputConfig;
  year: IDropdownInputConfig;
}



@Component({
  selector: 'lib-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements OnInit {
  @Input() config: IDatePickerConfig = {
    id: '',
    formGroup: new FormGroup({}),
    category: 'secondary'
  }

  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() id?: string;
  @Input() size?: keyof typeof DSSizes;
  @Input() label?: string;
  @Input() category?: keyof typeof DropdownType
  @Input() required?: boolean;
  @Input() hint?: string;
  @Input() desc?: string;
  @Input() errorMessages?: IDatePickerErrorMessages;


  days: number[] = [];
  months: string[] = [];

  dropDownConfigs: IDatePickerDropDownConfigs = {
    day: {
      id: this.config.id + DATE_PICKER_DAY_CONTROL_ID_EXTENSION,
      formGroup: this.config.formGroup,
      label: ''
    },
    month : {
      id: this.config.id + DATE_PICKER_MONTH_CONTROL_ID_EXTENSION,
      formGroup: this.config.formGroup,
      label: ''
    },
    year : {
      id: this.config.id + DATE_PICKER_YEAR_CONTROL_ID_EXTENSION,
      formGroup: this.config.formGroup,
      label: ''
    },
  }

  //Get the current year for use in the year dropdown
  private currentYear = new Date().getFullYear();

  constructor(private translate: TranslateService,
    public standAloneFunctions: StandAloneFunctions) { }

  ngOnInit() {
    //set config from individual options, if present
    if (this.formGroup) this.config.formGroup = this.formGroup;
    if (this.id) this.config.id = this.id;
    if (this.size) this.config.size = this.size;
    if (this.label) this.config.label = this.label;
    if (this.category) this.config.category = this.category;
    if (this.required) this.config.required = this.required;
    if (this.hint) this.config.hint = this.hint;
    if (this.desc) this.config.desc = this.desc;
    if (this.errorMessages) this.config.errorMessages = this.errorMessages;

    // Populate the months and years arrays
    this.setMonthsLanguage();
    this.translate.onLangChange.subscribe(() => {
      this.setMonthsLanguage();
    });
    for (let i = 1900; i <= this.currentYear; i++) {
      this.dropDownConfigs.year.options.push();
    }

    // Populate the days array based on the selected month and year
    this.config.formGroup.get((this.id + DATE_PICKER_MONTH_CONTROL_ID_EXTENSION))?.valueChanges.subscribe(month => {
      //add if statement here - the value of year can be empty, since it may not have been selected yet.
      const numDays = this.updateDaysArray(month, this.config.formGroup.get((this.id + '_yearControl'))?.value);
      console.log(month, numDays);
      console.log(this.config.formGroup.get((this.id + DATE_PICKER_YEAR_CONTROL_ID_EXTENSION))?.value);
    });
    this.config.formGroup.get((this.id + DATE_PICKER_YEAR_CONTROL_ID_EXTENSION))?.valueChanges.subscribe(year => {
      const numDays = this.updateDaysArray(this.config.formGroup.get((this.id + DATE_PICKER_MONTH_CONTROL_ID_EXTENSION))?.value, year);
    });
    if (this.days.length === 0) {
      for (let i = 1; i <= 31; i++) {
        this.days.push(i);
      }
    }
  }

  setMonthsLanguage() {
    (this.translate.currentLang === 'en') || (this.translate.currentLang === 'en-US') ?
      this.months = DATE_PICKER_MONTHS_EN : this.months = DATE_PICKER_MONTHS_FR;
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
    this.config.formGroup.get((this.id + DATE_PICKER_DAY_CONTROL_ID_EXTENSION))?.setValue('');
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
   * Function that grabs the month number based on the month name/lov
   * @param month string representing the month
   * @returns number representing the month (Jan = 1, etc.)/ or 0, if no match found.
   */
  private getMonthNum(month: string) {
    return (this.months.findIndex(i => i === month) + 1);
  }

  //TODO: Getting errors requires some thought
  getErrorAria(formGroup: FormGroup, id: string, errorMessages: IDatePickerErrorMessages) {
    let returnError = '';
    if (formGroup.get(id + DATE_PICKER_DAY_CONTROL_ID_EXTENSION)?.dirty && formGroup.get(id + DATE_PICKER_DAY_CONTROL_ID_EXTENSION)?.invalid && errorMessages.general) {
      errorMessages?.general?.forEach(error => {
        if (formGroup.get(id)?.errors?.[error.key]) {
          (returnError === '') ? (returnError += this.translate.instant(error.errorLOV)) :
            (returnError += (', ' + this.translate.instant(error.errorLOV)));
        }
      });
    }
    return returnError;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.config.formGroup.setValue(obj, { emitEvent: false });
    }
  }
  registerOnChange(fn: any): void {
    this.config.formGroup.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.config.formGroup.disable() : this.config.formGroup.enable();
  }
  private onTouched: () => void = () => { };
}
