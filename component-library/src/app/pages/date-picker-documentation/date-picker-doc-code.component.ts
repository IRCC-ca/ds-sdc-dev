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
  errorState = 'None';

  datePickerErrorMessages: IDatePickerErrorMessages = {
    general: [
      {
        key: 'required',
        errorLOV: 'ACC_DEMO.ERRORS.DOB_REQUIRED'
      }
    ]
  };

  datePickerConfig: IDatePickerConfig = {
    id: 'datePicker',
    formGroup: this.form_datePicker,
    label: 'This is Label',
    required: true,
    desc: 'Description line of text',
    size: 'small',
    errorMessages: this.datePickerErrorMessages,
    unknownDateToggle: {
      dayUnknown: true,
      monthUnknown: true,
      yearUnknown: true
    },
    disabled: false
  };

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'size',
      formGroup: this.form_datePicker,
      size: 'small',
      label: 'Size',
      options: [
        {
          text: 'Small'
        },
        {
          text: 'Large'
        }
      ]
    },
    {
      id: 'required',
      formGroup: this.form_datePicker,
      size: 'small',
      label: 'Required',
      options: [
        {
          text: 'Yes'
        },
        {
          text: 'No'
        }
      ]
    },
    {
      id: 'desc',
      formGroup: this.form_datePicker,
      size: 'small',
      label: 'Description',
      options: [
        {
          text: 'Yes'
        },
        {
          text: 'No'
        }
      ]
    },
    {
      id: 'hint',
      formGroup: this.form_datePicker,
      size: 'small',
      label: 'Hint',
      options: [
        {
          text: 'Yes'
        },
        {
          text: 'No'
        }
      ]
    },
    //Field 2
    //Field 3
    {
      id: 'error',
      formGroup: this.form_datePicker,
      size: 'small',
      label: 'Error message',
      options: [
        {
          text: 'Yes'
        },
        {
          text: 'No'
        }
      ]
    }
  ];
  checkboxes: ICheckBoxComponentConfig[] = [
    {
      id: 'disabled',
      formGroup: this.form_datePicker,
      size: 'small',
      label: 'State',
      inlineLabel: 'Disabled'
    }
  ];

  datePickerConfigCodeView: any = {
    id: this.datePickerConfig.id,
    formGroup: `new FormGroup({})`,
    size: this.datePickerConfig.size,
    hint: this.datePickerConfig.hint,
    label: this.datePickerConfig.label,
    required: this.datePickerConfig.required,
    desc: this.datePickerConfig.desc,
    disabled: this.datePickerConfig.disabled,
    errorMessages: undefined,
    unknownDateToggle: this.datePickerConfig.unknownDateToggle
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
        value: `
import { IDatePickerConfig } from 'ircc-ds-angular-component-library';
import { FormGroup } from '@angular/forms';
datePickerConfig: IDatePickerConfig = ${stringify(
          this.datePickerConfigCodeView
        )}`
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

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.checkboxes.forEach((checkbox) => {
      this.form_datePicker.addControl(checkbox.id, new FormControl());
    });

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
          new FormControl(toggle.options[1].text)
        );
      }
    });

    this.form_datePicker.patchValue({
      size: 'Small',
      required: 'Yes',
      desc: 'Yes',
      hint: 'No',
      //Field2
      //Field3
      error: 'No'
      // disabled: false
    });

    this.form_datePicker.valueChanges.subscribe((value: any) => {
      this.datePickerConfig = this.parseToggleConfig(value);
      console.log('HERE', this.datePickerConfig);
      console.log('VALUE HERE', value);
      this.parseCodeViewConfig();
      if (value['error']) this.toggleErrors(value['error']);
      // if (value['disabled'] !== undefined) this.toggleDisabled(value['disabled']);
    });
  }

  /**
   * Return mapping of Datepicker config from form values
   */
  private parseToggleConfig(value: any): IDatePickerConfig {
    console.log('Value', value);
    return {
      ...this.datePickerConfig,
      size: value['size'].toLowerCase(),
      hint: value['hint'] === 'Yes' ? 'Hint text' : undefined,
      required: value['required'] === 'Yes',
      desc: value['desc'] === 'Yes' ? 'Description line of text' : undefined,
      disabled:
        value['disabled'] === true
          ? (this.datePickerConfig.disabled = true)
          : (this.datePickerConfig.disabled = false)
    };
  }

  /**
   * Set datePicker field as touched, toggle error states
   */
  private toggleErrors(error: string) {
    if (
      !this.form_datePicker.get(this.datePickerConfig.id)?.touched &&
      error !== 'None'
    ) {
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
    }
    this.parseCodeViewConfig();
  }
  /**
   * Toggle disabled state of input
   */
  private toggleDisabled(disabled: boolean) {
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
    } else {
      datePickerControl?.enable();
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
      disabled: this.datePickerConfig.disabled,
      errorMessages: undefined,
      unknownDateToggle: this.datePickerConfig.unknownDateToggle
    };
    if (this.codeViewConfig?.tab) {
      this.codeViewConfig.tab[index].value = `
      import { IDatePickerConfig } from 'ircc-ds-angular-component-library';
          import { FormGroup } from '@angular/forms';
          datePickerConfig: IDatePickerConfig = ${stringify(
            this.datePickerConfigCodeView
          )}
      `;
    }
  }
}
