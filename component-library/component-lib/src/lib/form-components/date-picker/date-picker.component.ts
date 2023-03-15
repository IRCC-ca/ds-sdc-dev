import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ISelectConfig } from '../select/select.component';
import { ERROR_TEXT_STUB_EN, ERROR_TEXT_STUB_FR, ILabelConfig, ILabelIconConfig } from '../../shared/label/label.component';
import { IIconButtonComponentConfig } from '../../shared/icon-button/icon-button.component';
import { IErrorPairs } from '../../../shared/interfaces/component-configs';
import { DSSizes } from '../../../shared/constants/jl-components/jl-components.constants/jl-components.constants';
import { IErrorIDs, StandAloneFunctions } from '../../../shared/functions/stand-alone.functions';

export const DATE_PICKER_MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DATE_PICKER_MONTHS_FR = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];

export const DATE_PICKER_DAY_CONTROL_ID_EXTENSION = '_dayControl';
export const DATE_PICKER_MONTH_CONTROL_ID_EXTENSION = '_monthControl';
export const DATE_PICKER_YEAR_CONTROL_ID_EXTENSION = '_yearControl';

export const DATE_PICKER_LABELS_EN = ['Day', 'Month', 'Year'];
export const DATE_PICKER_LABELS_FR = ['Jour', 'Mois', 'Année'];

export const DATE_PICKER_PLACEHOLDER_YEAR_EN = 'YYYY';
export const DATE_PICKER_PLACEHOLDER_YEAR_FR = 'AAAA';

export const DATE_PICKER_PLACEHOLDER_MONTH_EN = 'Month';
export const DATE_PICKER_PLACEHOLDER_MONTH_FR = 'Mois';

export const DATE_PICKER_PLACEHOLDER_DAY_EN = 'DD';
export const DATE_PICKER_PLACEHOLDER_DAY_FR = 'JJ';

export const DATE_PICKER_UNKOWN_EN = "Unknown";
export const DATE_PICKER_UNKOWN_FR = "Inconnu"

export interface IDatePickerConfig {
  id: string;
  formGroup: FormGroup;
  size?: keyof typeof DSSizes;
  label?: string;
  required?: boolean;
  hint?: string;
  desc?: string;
  errorMessages?: IDatePickerErrorMessages;
  labelIconConfig?: ILabelIconConfig;
  //TODO: Add max and min year for date picker
  //TODO: Add toggle for unknowns (boolean array?)
}

export interface IDatePickerErrorMessages {
  general?: IErrorPairs[];
  day?: IErrorPairs[];
  month?: IErrorPairs[];
  year?: IErrorPairs[];
}

export interface IDatePickerDropDownConfigs {
  day: ISelectConfig;
  month: ISelectConfig;
  year: ISelectConfig;
}

@Component({
  selector: 'lib-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements OnInit {
  @Input() config: IDatePickerConfig = {
    id: '',
    formGroup: new FormGroup({}),
  };

  @Input() formGroup?: FormGroup;
  @Input() id?: string;
  @Input() size?: keyof typeof DSSizes;
  @Input() label?: string;
  @Input() required?: boolean;
  @Input() hint?: string;
  @Input() desc?: string;
  @Input() errorMessages?: IDatePickerErrorMessages;

  errorIds: IErrorIDs[] = [];
  days: number[] = [];
  months: string[] = [];
  labelConfig: ILabelConfig = {
    formGroup: this.config.formGroup,
    parentID: '',
  };
  touched = false;
  errorStubText = '';

  dropDownConfigs: IDatePickerDropDownConfigs = {
    day: {
      id: '',
      formGroup: this.config.formGroup,
      label: '',
      options: [],
      size: 'large',
    },
    month: {
      id: '',
      formGroup: this.config.formGroup,
      label: '',
      options: [],
      size: 'large',
    },
    year: {
      id: '',
      formGroup: this.config.formGroup,
      label: '',
      options: [],
      size: 'large',
    },
  };

  //Get the current year for use in the year dropdown
  private currentYear = new Date().getFullYear();

  constructor(private translate: TranslateService, public standAloneFunctions: StandAloneFunctions) {}

  ngOnInit() {
    this.labelConfig = this.standAloneFunctions.makeLabelConfig(
      this.config.formGroup,
      this.config.id,
      this.config.errorMessages?.general,
      this.config.label,
      this.config.desc,
      this.config.hint,
      this.config.required,
      this.config.labelIconConfig
    );

    //set config from individual options, if present
    if (this.formGroup) this.config.formGroup = this.formGroup;
    if (this.id) this.config.id = this.id;
    if (this.size) this.config.size = this.size;
    if (this.label) this.config.label = this.label;
    // if (this.category) this.config.category = this.category;
    if (this.required) this.config.required = this.required;
    if (this.hint) this.config.hint = this.hint;
    if (this.desc) this.config.desc = this.desc;
    if (this.errorMessages) this.config.errorMessages = this.errorMessages;

    //Set the ids for the dropdowns
    this.dropDownConfigs.day.id = this.config.id + DATE_PICKER_DAY_CONTROL_ID_EXTENSION;
    this.dropDownConfigs.month.id = this.config.id + DATE_PICKER_MONTH_CONTROL_ID_EXTENSION;
    this.dropDownConfigs.year.id = this.config.id + DATE_PICKER_YEAR_CONTROL_ID_EXTENSION;

    this.dropDownConfigs.day.formGroup = this.config.formGroup;
    this.dropDownConfigs.month.formGroup = this.config.formGroup;
    this.dropDownConfigs.year.formGroup = this.config.formGroup;

    this.dropDownConfigs.day.size = this.config.size;
    this.dropDownConfigs.month.size = this.config.size;
    this.dropDownConfigs.year.size = this.config.size;

    this.dropDownConfigs.day.topLabel = this.config.label;
    this.dropDownConfigs.month.topLabel = this.config.label;
    this.dropDownConfigs.year.topLabel = this.config.label;

    if (this.config.errorMessages?.general) {
      this.errorIds = this.standAloneFunctions.getErrorIds(
        this.config.formGroup,
        this.config.id + DATE_PICKER_YEAR_CONTROL_ID_EXTENSION,
        this.config.errorMessages.general
      );
    }

    // Populate the months and years arrays
    this.setMonthsLanguage();
    this.setLabelLanguage();
    this.translate.onLangChange.subscribe(() => {
      this.setMonthsLanguage();
      this.setYearDayLanguage();
      this.setLabelLanguage();
    });
    if (this.translate.currentLang === 'en' || this.translate.currentLang === 'en-US') {
      this.dropDownConfigs.year.options?.push({ text: DATE_PICKER_UNKOWN_EN, value:"**" }); 
    }
    else
    {
      this.dropDownConfigs.year.options?.push({ text: DATE_PICKER_UNKOWN_FR, value:"**" }); 
    }
  
    for (let i = 1900; i <= this.currentYear; i++) {
      this.dropDownConfigs.year.options?.push({ text: i.toString() });
    }
    

    // Populate the days array based on the selected month and year
    this.config.formGroup
      .get(this.config.id + DATE_PICKER_MONTH_CONTROL_ID_EXTENSION)
      ?.valueChanges.subscribe((month) => {
        //add if statement here - the value of year can be empty, since it may not have been selected yet.
        const numDays = this.updateDaysArray(month, this.config.formGroup.get(this.config.id + '_yearControl')?.value);
      });
    this.config.formGroup
      .get(this.config.id + DATE_PICKER_YEAR_CONTROL_ID_EXTENSION)
      ?.valueChanges.subscribe((year) => {
        const numDays = this.updateDaysArray(
          this.config.formGroup.get(this.config.id + DATE_PICKER_MONTH_CONTROL_ID_EXTENSION)?.value,
          year
        );
      });

    if (this.translate.currentLang === 'en' || this.translate.currentLang === 'en-US') {
      this.dropDownConfigs.day.options?.push({ text: DATE_PICKER_UNKOWN_EN , value:"**" }); 
    }
    else{
      this.dropDownConfigs.day.options?.push({ text: DATE_PICKER_UNKOWN_FR , value:"**" }); 
    }

    if (this.dropDownConfigs.day.options?.length === 1) {
      for (let i = 1; i <= 31; i++) {
        this.dropDownConfigs.day.options?.push({ text: i.toString() });
      }
    }
  }

  ngOnChanges() {
    this.labelConfig = this.standAloneFunctions.makeLabelConfig(
      this.config.formGroup,
      this.config.id,
      [],
      // this.config.errorMessages,
      this.config.label,
      this.config.desc,
      this.config.hint,
      this.config.required,
      this.config.labelIconConfig
    );
  }

  /**
   * Set the language for dropdown options
   * TODO: Set value of each month to be the lov and not the text
   */
  setMonthsLanguage() {
    this.dropDownConfigs.month.options = [];
    if(this.translate.currentLang === 'en' || this.translate.currentLang === 'en-US')
      {
        this.months = DATE_PICKER_MONTHS_EN;
        this.dropDownConfigs.month.options?.push({ text: DATE_PICKER_UNKOWN_EN, value:"**" }); 
      }
      else
      { 
        this.months = DATE_PICKER_MONTHS_FR;
        this.dropDownConfigs.month.options?.push({ text: DATE_PICKER_UNKOWN_FR, value:"**" }); 
      }
    this.months.forEach((month: string, index: number) => {
      this.dropDownConfigs.month.options?.push({ text: month, value: DATE_PICKER_MONTHS_EN[index] });
    });
  }

  /**
   * Used to set the language of year/day 'unknown' field when langauge changes
   */
  setYearDayLanguage() {
    this.dropDownConfigs.day.options?.shift();
    this.dropDownConfigs.year.options?.shift();
    if(this.translate.currentLang === 'en' || this.translate.currentLang === 'en-US')
    {
      this.months = DATE_PICKER_MONTHS_EN;
      this.dropDownConfigs.day.options?.unshift({ text: DATE_PICKER_UNKOWN_EN, value:'**' });
      this.dropDownConfigs.year.options?.unshift({ text: DATE_PICKER_UNKOWN_EN, value:'**' });
    }
    else
    { 
      this.months = DATE_PICKER_MONTHS_FR;
      this.dropDownConfigs.day.options?.unshift({ text: DATE_PICKER_UNKOWN_FR, value:"**" });
      this.dropDownConfigs.year.options?.unshift({ text: DATE_PICKER_UNKOWN_FR, value:'**' });
    }
  }

  /**
   * Set the language for the labels of each dropdown
   */
  setLabelLanguage() {
    if (this.translate.currentLang === 'en' || this.translate.currentLang === 'en-US') {
      this.dropDownConfigs.day.label = DATE_PICKER_LABELS_EN[0];
      this.dropDownConfigs.month.label = DATE_PICKER_LABELS_EN[1];
      this.dropDownConfigs.year.label = DATE_PICKER_LABELS_EN[2];

      this.dropDownConfigs.day.placeholder = DATE_PICKER_PLACEHOLDER_DAY_EN;
      this.dropDownConfigs.month.placeholder = DATE_PICKER_PLACEHOLDER_MONTH_EN;
      this.dropDownConfigs.year.placeholder = DATE_PICKER_PLACEHOLDER_YEAR_EN;

      this.errorStubText = ERROR_TEXT_STUB_EN;
    } else {
      this.dropDownConfigs.day.label = DATE_PICKER_LABELS_FR[0];
      this.dropDownConfigs.month.label = DATE_PICKER_LABELS_FR[1];
      this.dropDownConfigs.year.label = DATE_PICKER_LABELS_FR[2];

      this.dropDownConfigs.day.placeholder = DATE_PICKER_PLACEHOLDER_DAY_FR;
      this.dropDownConfigs.month.placeholder = DATE_PICKER_PLACEHOLDER_MONTH_FR;
      this.dropDownConfigs.year.placeholder = DATE_PICKER_PLACEHOLDER_YEAR_FR;

      this.errorStubText = ERROR_TEXT_STUB_FR;
    }
  }

  /**
   * update the days array with the correct number of days based on the year and the month
   * @param month string of the month (TODO: Change this to be an LOV)
   * @param year year selected
   */
  private updateDaysArray(month: string, year: number): void {
    this.days = [];
    this.dropDownConfigs.day.options = [];
    const numDays = this.getNumDaysInMonth(month, year);
    for (let i = 1; i <= numDays; i++) {
      this.days.push(i);
    }
    this.config.formGroup.get(this.config.id + DATE_PICKER_DAY_CONTROL_ID_EXTENSION)?.setValue('');
    if (this.translate.currentLang === 'en' || this.translate.currentLang === 'en-US') {
      this.dropDownConfigs.day.options?.push({ text: DATE_PICKER_UNKOWN_EN , value:"**" }); 
    }
    else{
      this.dropDownConfigs.day.options?.push({ text: DATE_PICKER_UNKOWN_FR , value:"**" }); 
    }
    this.days.forEach((day) => {
      this.dropDownConfigs.day.options?.push({ text: day.toString() });
    });
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
    return this.months.findIndex((i) => i === month) + 1;
  }

  datePickerTouchedOrInvalid(): boolean {
    let datePickerState: boolean | undefined = false;

    datePickerState =
      (this.config.formGroup.get(this.dropDownConfigs.year.id)?.touched &&
        this.config.formGroup.get(this.dropDownConfigs.year.id)?.invalid) ||
      (this.config.formGroup.get(this.dropDownConfigs.month.id)?.touched &&
        this.config.formGroup.get(this.dropDownConfigs.month.id)?.invalid) ||
      (this.config.formGroup.get(this.dropDownConfigs.day.id)?.touched &&
        this.config.formGroup.get(this.dropDownConfigs.day.id)?.invalid);
      
      this.touched = datePickerState || false;

    return datePickerState ?? false;
    //  return this.config.formGroup?.touched && this.config.formGroup?.invalid;
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
  private onTouched: () => void = () => {};
}
