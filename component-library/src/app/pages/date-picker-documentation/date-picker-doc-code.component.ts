import { Component, OnInit } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {
  ICodeViewerConfig,
  stringify
} from '@app/components/code-viewer/code-viewer.component';
import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { TranslateService } from '@ngx-translate/core';
import {
  IBannerConfig,
  ICheckBoxComponentConfig,
  IDatePickerConfig,
  IDatePickerErrorMessages,
  IRadioInputComponentConfig
} from 'ircc-ds-angular-component-library';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';

@Component({
  selector: 'app-date-picker-doc-code',
  templateUrl: './date-picker-doc-code.component.html',
  styleUrls: ['./date-picker-doc-code.component.scss'],
  providers: [SlugifyPipe]
})
export class DatePickerDocCodeComponent implements OnInit {
  currentLanguage: string = '';
  altLangLink = 'datePickerDocCode';
  form_datePicker = new FormGroup({});
  errorState = 'No';
  state: boolean = false;

  datePickerErrorMessages: IDatePickerErrorMessages = {
    general: [
      {
        key: 'required',
        errorLOV: 'ERROR.requiredTextAreaError'
      }
    ]
  };

  datePickerConfig: IDatePickerConfig = {
    id: 'datePicker',
    formGroup: this.form_datePicker,
    label: 'Label text',
    required: true,
    desc: 'Description line of text',
    size: 'small',
    errorMessages: this.datePickerErrorMessages,
    unknownDateToggle: {
      dayUnknown: true,
      monthUnknown: true,
      yearUnknown: true
    },
    monthSelectShow: true,
    daySelectShow: true
  };

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'size',
      formGroup: this.form_datePicker,
      size: 'small',
      label: 'General.Size',
      options: [
        {
          text: 'General.Small',
          value: 'Small'
        },
        {
          text: 'General.Large',
          value: 'Large'
        }
      ]
    },
    {
      id: 'required',
      formGroup: this.form_datePicker,
      size: 'small',
      label: 'General.Required',
      options: [
        {
          text: 'General.Yes',
          value: 'Yes'
        },
        {
          text: 'General.No',
          value: 'No'
        }
      ]
    },
    {
      id: 'desc',
      formGroup: this.form_datePicker,
      size: 'small',
      label: 'General.Description',
      options: [
        {
          text: 'General.Yes',
          value: 'Yes'
        },
        {
          text: 'General.No',
          value: 'No'
        }
      ]
    },
    {
      id: 'hint',
      formGroup: this.form_datePicker,
      size: 'small',
      label: 'General.Hint',
      options: [
        {
          text: 'General.Yes',
          value: 'Yes'
        },
        {
          text: 'General.No',
          value: 'No'
        }
      ]
    },
    {
      id: 'monthSelectShow',
      formGroup: this.form_datePicker,
      size: 'small',
      label: 'General.Month',
      options: [
        {
          text: 'General.Yes',
          value: 'Yes'
        },
        {
          text: 'General.No',
          value: 'No'
        }
      ]
    },
    {
      id: 'daySelectShow',
      formGroup: this.form_datePicker,
      size: 'small',
      label: 'General.Day',
      options: [
        {
          text: 'General.Yes',
          value: 'Yes'
        },
        {
          text: 'General.No',
          value: 'No'
        }
      ]
    },
    {
      id: 'error',
      formGroup: this.form_datePicker,
      size: 'small',
      label: 'ERROR.errorMessage',
      options: [
        {
          text: 'General.Yes',
          value: 'Yes'
        },
        {
          text: 'General.No',
          value: 'No'
        }
      ]
    }
  ];
  checkboxes: ICheckBoxComponentConfig[] = [
    {
      id: 'state',
      formGroup: this.form_datePicker,
      size: 'small',
      label: 'General.StateLabel',
      inlineLabel: 'General.DisabledLabel'
    }
  ];

  bannerConfig: IBannerConfig = {
    id: "banner-disabled-desc",
    type: "info",
    size: "small",
    title:'General.EnabledBannerTitle',
    content: "General.EnabledBannerContent",
    rounded: true
  };

  datePickerConfigCodeView: any = {
    id: this.datePickerConfig.id,
    formGroup: `new FormGroup({})`,
    size: this.datePickerConfig.size,
    hint: this.datePickerConfig.hint,
    label: this.datePickerConfig.label,
    required: this.datePickerConfig.required,
    desc: this.datePickerConfig.desc,
    errorMessages: undefined,
    unknownDateToggle: this.datePickerConfig.unknownDateToggle,
    monthSelectShow: this.datePickerConfig.monthSelectShow,
    daySelectShow: this.datePickerConfig.daySelectShow
  };

  codeViewConfig: ICodeViewerConfig = {
    id: 'date-picker-viewer',
    openAccordion: true,
    selected: 'html',
    tab: [
      {
        id: 'html',
        title: 'HTML',
        value: `<ircc-cl-lib-date-picker [config]="datePickerConfig"></ircc-cl-lib-date-picker>`
      },
      {
        id: 'ts',
        title: 'TypeScript',
        value:
          "import { IDatePickerConfig } from 'ircc-ds-angular-component-library';\r" +
          "import { FormGroup } from '@angular/forms';\n\n" +
          `datePickerConfig: IDatePickerConfig = ${stringify(
            this.datePickerConfigCodeView
          )} \n //Note: Setting formControl state triggers disabled/enabled styling automatically \n ${JSON.stringify(
            this.stateTxt(this.state)
          )}
          `
      }
    ]
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private slugify: SlugifyPipe
  ) {
    this.currentLanguage = translate.currentLang;
  }

  stateTxt(disabled: boolean): string {
    const DISABLE = `this.formGroupName.get('formControlName')?.disable(); //sets the form control to be disabled`;
    const ENABLE = `this.formGroupName.get('formControlName')?.enable(); //sets the form control to be enabled`;
    return disabled ? DISABLE : ENABLE;
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.form_datePicker.addControl(
      this.datePickerConfig.id,
      new FormControl()
    );
    this.form_datePicker.addControl(
      this.datePickerConfig.id + '_dayControl',
      new FormControl('', Validators.required)
    );
    this.form_datePicker.addControl(
      this.datePickerConfig.id + '_monthControl',
      new FormControl('', Validators.required)
    );
    this.form_datePicker.addControl(
      this.datePickerConfig.id + '_yearControl',
      new FormControl('', Validators.required)
    );

    this.toggles.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.form_datePicker.addControl(
          toggle.id,
          new FormControl(toggle.options[1].value)
        );
      }
    });
    this.checkboxes.forEach((checkbox) => {
      this.form_datePicker.addControl(checkbox.id, new FormControl());
    });

    this.form_datePicker.get(this.checkboxes[0].id)
    ?.valueChanges.subscribe((change) => {
      if (change) {
        this.bannerConfig.title='General.DisabledBannerTitle'
        this.bannerConfig.content="General.DisabledBannerContent"
      } else {
        this.bannerConfig.title='General.EnabledBannerTitle'
        this.bannerConfig.content="General.EnabledBannerContent"
      }
    });

    this.form_datePicker.patchValue({
      size: 'Small',
      required: 'Yes',
      desc: 'Yes',
      hint: 'No',
      monthSelectShow: 'Yes',
      daySelectShow: 'Yes',
      error: 'No'
    });

    this.form_datePicker.valueChanges.subscribe((value: any) => {
      if (value['error']) this.toggleErrors(value['error']);
      if (value['state'] !== undefined) {
        this.toggleDisabled(value['state']);
        this.state = value['state'];
      }
      this.datePickerConfig = this.parseToggleConfig(value);
      this.parseCodeViewConfig();
    });
  }

  /**
   * Return mapping of Datepicker config from form values
   */
  private parseToggleConfig(value: any): IDatePickerConfig {
    return {
      ...this.datePickerConfig,
      size: value['size'].toLowerCase(),
      hint: value['hint'] === 'Yes' ? 'Hint text' : undefined,
      monthSelectShow: value['monthSelectShow'] === 'Yes',
      daySelectShow: value['daySelectShow'] === 'Yes',
      required: value['required'] === 'Yes',
      desc: value['desc'] === 'Yes' ? 'Description line of text' : undefined
    };
  }

  /**
   * Set datePicker field as touched, toggle error states
   */
  private toggleErrors(error: string) {
    if (error === 'Yes') {
      this.form_datePicker.get(this.datePickerConfig.id)?.markAsTouched();
      this.form_datePicker
        .get(this.datePickerConfig.id + '_dayControl')
        ?.markAsTouched();
      this.form_datePicker
        .get(this.datePickerConfig.id + '_monthControl')
        ?.markAsTouched();
      this.form_datePicker
        .get(this.datePickerConfig.id + '_yearControl')
        ?.markAsTouched();
      this.errorState = error;
      this.datePickerConfigCodeView.errorMessages =
        this.datePickerConfig.errorMessages;
    } else {
      this.form_datePicker.get(this.datePickerConfig.id)?.markAsUntouched();
      this.form_datePicker
        .get(this.datePickerConfig.id + '_dayControl')
        ?.markAsUntouched();
      this.form_datePicker
        .get(this.datePickerConfig.id + '_monthControl')
        ?.markAsUntouched();
      this.form_datePicker
        .get(this.datePickerConfig.id + '_yearControl')
        ?.markAsUntouched();
      this.datePickerConfigCodeView.errorMessages = undefined;
    }
    this.parseCodeViewConfig();
  }

  /**
   * Toggle disabled state of input
   */
  private toggleDisabled(disabled: boolean) {
    const datePickerYearControl =
      this.form_datePicker.controls['datePicker_yearControl'];
    const datePickerMonthControl =
      this.form_datePicker.controls['datePicker_monthControl'];
    const datePickerDayControl =
      this.form_datePicker.controls['datePicker_dayControl'];

    const datePickerControl: AbstractControl | null = this.form_datePicker.get(
      this.datePickerConfig.id
    );
    if (
      (disabled && datePickerControl?.disabled) ||
      (!disabled && datePickerControl?.enabled)
    )
      return;

    if (disabled) {
      datePickerControl?.disable();
      datePickerYearControl.disable();
      datePickerMonthControl.disable();
      datePickerDayControl.disable();
    } else {
      datePickerControl?.enable();
      datePickerYearControl.enable();
      datePickerMonthControl.enable();
      datePickerDayControl.enable();
    }
  }

  private parseCodeViewConfig() {
    const index = this.codeViewConfig?.tab?.findIndex((t) => t.id === 'ts');
    if (-1 == index || !index) return;
    this.datePickerConfigCodeView = {
      ...this.datePickerConfigCodeView,
      size: this.datePickerConfig.size,
      label: this.datePickerConfig.label,
      hint: this.datePickerConfig.hint,
      required: this.datePickerConfig.required,
      desc: this.datePickerConfig.desc,
      unknownDateToggle: this.datePickerConfig.unknownDateToggle,
      monthSelectShow: this.datePickerConfig.monthSelectShow,
      daySelectShow: this.datePickerConfig.daySelectShow
    };
    if (this.codeViewConfig?.tab) {
      this.codeViewConfig.tab[index].value =
        "import { IDatePickerConfig } from 'ircc-ds-angular-component-library';\r" +
        "import { FormGroup } from '@angular/forms';\n\n" +
        `datePickerConfig: IDatePickerConfig = ${stringify(
          this.datePickerConfigCodeView
        )} \n //Note: Setting formControl state triggers disabled/enabled styling automatically \n ${JSON.stringify(
          this.stateTxt(this.state)
        )}
        `;
    }
  }
}
