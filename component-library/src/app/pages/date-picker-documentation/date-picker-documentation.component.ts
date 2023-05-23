import { Component, OnInit } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import { TranslateService } from '@ngx-translate/core';
import {
  ICheckBoxComponentConfig,
  IDatePickerConfig,
  IDatePickerErrorMessages,
  IRadioInputComponentConfig
} from 'ircc-ds-angular-component-library';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';

@Component({
  selector: 'app-date-picker-documentation',
  templateUrl: './date-picker-documentation.component.html',
  styleUrls: ['./date-picker-documentation.component.scss']
})
export class DatePickerDocumentationComponent implements OnInit {
  altLangLink = 'datePickerDocumentation';
  form = new FormGroup({});
  form_interactive_input = new FormGroup({});

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  datePickerTitleSlugConfig: slugTitleURLConfig = {
    title: 'Date picker',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };

  interactiveDemoSlugTitleURLConfig: slugTitleURLConfig = {
    title: 'Interactive Demo',
    anchorType: slugAnchorType.primary
  };

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
    formGroup: this.form,
    label: 'This is Label',
    required: true,
    desc: 'Description line of text',
    errorMessages: this.datePickerErrorMessages,
    unknownDateToggle: {
      dayUnknown: true,
      monthUnknown: true,
      yearUnknown: true
    }
  };

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'size',
      formGroup: this.form_interactive_input,
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
      formGroup: this.form_interactive_input,
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
      formGroup: this.form_interactive_input,
      size: 'small',
      label: 'Description',
      options: [
        {
          text: 'Show',
          value: 'Yes'
        },
        {
          text: 'Hide',
          value: 'No'
        }
      ]
    },
    {
      id: 'hint',
      formGroup: this.form_interactive_input,
      size: 'small',
      label: 'Hint',
      options: [
        {
          text: 'Show',
          value: 'Yes'
        },
        {
          text: 'Hide',
          value: 'No'
        }
      ]
    },
    //Field 2
    //Field 3
    {
      id: 'error',
      formGroup: this.form_interactive_input,
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
    // {
    //   id: 'placeholder',
    //   formGroup: this.form_interactive_input,
    //   size: 'small',
    //   label: 'Placeholder',
    //   options: [
    //     {
    //       text: 'Show',
    //       value: 'True'
    //     },
    //     {
    //       text: 'Hide',
    //       value: 'False'
    //     }
    //   ]
    // }
  ];
  checkboxes: ICheckBoxComponentConfig[] = [
    {
      id: 'state',
      formGroup: this.form_interactive_input,
      size: 'small',
      label: 'State',
      inlineLabel: 'Disabled'
    }
  ];

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.form_interactive_input.addControl(
      this.datePickerConfig.id,
      new FormControl()
    );

    this.toggles.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.form_interactive_input.addControl(
          toggle.id,
          new FormControl(toggle.options[1].text)
        );
      }
    });

    this.checkboxes.forEach((checkbox) => {
      this.form_interactive_input.addControl(checkbox.id, new FormControl());
    });

    this.form_interactive_input.patchValue({
      size: 'Small',
      required: 'Yes',
      desc: 'Yes',
      hint: 'No',
      //Field2
      //Field3
      error: 'Yes'
    });

    this.form_interactive_input.valueChanges.subscribe((value: any) => {
      this.datePickerConfig = this.parseToggleConfig(value);
      this.parseCodeViewConfig();
      if (value['error']) this.toggleErrors(value['error']);
      if (value['state'] !== undefined) this.toggleDisabled(value['state']);
    });
  }

  /**
   * Return mapping of Datepicker config from form values
   */
  private parseToggleConfig(value: any): IDatePickerConfig {
    return {
      ...this.datePickerConfig,
      size: value['size'].toLowerCase(),
      hint: value['hint'] === 'True' ? 'Hint text' : undefined,
      required: value['required'] === 'True',
      desc: value['desc'] === 'True' ? 'Description line of text' : undefined
    };
  }

  /**
   * Set datePicker field as touched, toggle error states
   */
  private toggleErrors(error: string) {
    if (
      !this.form_interactive_input.get(this.datePickerConfig.id)?.touched &&
      error !== 'None'
    ) {
      this.form_interactive_input
        .get(this.datePickerConfig.id)
        ?.markAllAsTouched();
      this.form_interactive_input
        .get(this.datePickerConfig.id)
        ?.setValidators(Validators.required);
    }
  }
  /**
   * Toggle disabled state of input
   */
  private toggleDisabled(disabled: boolean) {
    const datePickerControl: AbstractControl | null =
      this.form_interactive_input.get(this.datePickerConfig.id);
    if (
      (disabled && datePickerControl?.disabled) ||
      (!disabled && datePickerControl?.enabled)
    ) {
      return;
    }
    if (disabled) {
      datePickerControl?.disable();
    } else {
      datePickerControl?.enable();
    }
  }

  private parseCodeViewConfig() {}
}
