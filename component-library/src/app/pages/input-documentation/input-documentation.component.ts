import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslatedPageComponent } from '@app/pages/translated-page-component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { TranslateService } from '@ngx-translate/core';
import {
  slugTitleURLConfig,
  slugTitleURLType
} from '@app/components/title-slug-url/title-slug-url.component';
import {
  ICheckBoxComponentConfig,
  IInputComponentConfig,
  IRadioInputComponentConfig,
  ITabNavConfig
} from 'ircc-ds-angular-component-library';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-documentation',
  templateUrl: './input-documentation.component.html',
  styleUrls: ['./input-documentation.component.scss']
})
export class InputDocumentationComponent
  implements OnInit, TranslatedPageComponent
{
  altLangLink = 'inputDocumentation';

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  @ViewChild('input', { static: false }) banner!: ElementRef;

  form_interactive_input = new FormGroup({});

  interactiveDemoSlugTitleURLConfig: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Interactive Demo'
  };

  inputConfig: IInputComponentConfig = {
    id: 'input',
    formGroup: this.form_interactive_input,
    size: 'small',
    label: 'Label text',
    desc: 'Description line of text',
    errorMessages: [
      { key: 'invalid', errorLOV: 'ERROR.fieldIsInvalid' },
      { key: 'testingError', errorLOV: 'ERROR.testErrorMessage' },
      { key: 'maxlength', errorLOV: 'ERROR.fieldExceededMaxLength' }
    ]
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
      id: 'hint',
      formGroup: this.form_interactive_input,
      size: 'small',
      label: 'Hint',
      options: [
        {
          text: 'Show',
          value: 'True'
        },
        {
          text: 'Hide',
          value: 'False'
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
          text: 'True'
        },
        {
          text: 'False'
        }
      ]
    },
    {
      id: 'error',
      formGroup: this.form_interactive_input,
      size: 'small',
      label: 'Error',
      options: [
        {
          text: 'None'
        },
        {
          text: 'Single'
        },
        {
          text: 'Multiple'
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
          value: 'True'
        },
        {
          text: 'Hide',
          value: 'False'
        }
      ]
    },
    {
      id: 'placeholder',
      formGroup: this.form_interactive_input,
      size: 'small',
      label: 'Placeholder',
      options: [
        {
          text: 'Show',
          value: 'True'
        },
        {
          text: 'Hide',
          value: 'False'
        }
      ]
    }
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

  demoTabsConfig: ITabNavConfig = {
    id: 'demoTabs',
    size: 'small',
    tab: [
      {
        id: 'basic',
        title: 'Basic'
      },
      {
        id: 'password',
        title: 'Password'
      }
    ]
  };

  setBannerType(value: any) {
    switch (value) {
      case 'password':
        this.inputConfig.type = 'password';
        break;
      default:
        this.inputConfig.type = 'text';
        break;
    }
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.form_interactive_input.addControl(
      this.inputConfig.id,
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
      hint: 'False',
      desc: 'True',
      placeholder: 'False',
      error: 'None'
    });

    this.form_interactive_input.valueChanges.subscribe((value: any) => {
      this.inputConfig = this.parseToggleConfig(value);
      if (value['error']) this.toggleErrors(value['error']);
      if (value['state'] !== undefined) this.toggleDisabled(value['state']);
    });
  }

  /**
   * Return mapping of input config from form values
   */
  private parseToggleConfig(value: any): IInputComponentConfig {
    return {
      ...this.inputConfig,
      size: value['size'].toLowerCase(),
      hint: value['hint'] === 'True' ? 'Hint text' : '',
      required: value['required'] === 'True',
      desc: value['desc'] === 'True' ? 'Description line of text' : '',
      placeholder: value['placeholder'] === 'True' ? 'Placeholder text' : ''
    };
  }

  private toggleErrors(error: string) {
    if (
      !this.form_interactive_input.get(this.inputConfig.id)?.touched &&
      error !== 'None'
    )
      this.form_interactive_input.get(this.inputConfig.id)?.markAsTouched();

    switch (error) {
      case 'None':
        this.form_interactive_input
          .get(this.inputConfig.id)
          ?.setErrors({ errors: null });
        break;
      case 'Single':
        this.form_interactive_input.get(this.inputConfig.id)?.setErrors({
          invalid: true
        });
        break;
      case 'Multiple':
        this.form_interactive_input.get(this.inputConfig.id)?.setErrors({
          invalid: true,
          testingError: true,
          maxlength: { requiredLength: 3, actualLength: 5 }
        });
        break;
    }
  }

  private toggleDisabled(disabled: boolean) {
    const inputControl: AbstractControl | null =
      this.form_interactive_input.get(this.inputConfig.id);
    if (
      (disabled && inputControl?.disabled) ||
      (!disabled && inputControl?.enabled)
    )
      return;

    if (disabled) {
      inputControl?.disable();
    } else {
      inputControl?.enable();
    }
  }
}
