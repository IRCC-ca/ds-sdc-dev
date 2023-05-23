import { Component, OnInit } from '@angular/core';
import { TranslatedPageComponent } from '@app/pages/translated-page-component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import {
  ICheckBoxComponentConfig,
  IInputComponentConfig,
  IRadioInputComponentConfig,
  ITabNavConfig
} from 'ircc-ds-angular-component-library';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ICodeViewerConfig,
  stringify
} from '@app/components/code-viewer/code-viewer.component';

/**
 * Interactive input demo & code block
 */
@Component({
  selector: 'app-input-doc-code',
  templateUrl: './input-doc-code.component.html',
  styleUrls: ['./input-doc-code.component.scss']
})
export class InputDocCodeComponent implements OnInit, TranslatedPageComponent {
  altLangLink = 'inputDocumentation';

  constructor(private lang: LangSwitchService) {}

  form_interactive_input = new FormGroup({});

  inputConfig: IInputComponentConfig = {
    id: 'input',
    formGroup: this.form_interactive_input,
    size: 'small',
    type: 'text',
    required: false,
    label: 'Label text',
    desc: 'Description line of text',
    errorMessages: []
  };

  inputConfigSingle: IInputComponentConfig = {
    ...this.inputConfig,
    id: 'input_single',
    required: true,
    errorMessages: [{ key: 'required', errorLOV: 'ERROR.fieldIsRequired' }]
  };

  inputConfigMulti: IInputComponentConfig = {
    ...this.inputConfig,
    id: 'input_multi',
    errorMessages: [
      { key: 'email', errorLOV: 'ERROR.testErrorMessage' },
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

  inputConfigCodeView: any = {
    id: this.inputConfig.id,
    formGroup: `new FormGroup({})`,
    type: this.inputConfig.type,
    required: this.inputConfig.required,
    size: this.inputConfig.size,
    label: this.inputConfig.label,
    desc: this.inputConfig.desc,
    hint: this.inputConfig.hint,
    placeholder: this.inputConfig.placeholder,
    errorMessages: undefined
  };

  codeViewConfig: ICodeViewerConfig = {
    id: 'input-code-viewer',
    openAccordion: true,
    selected: 'html',
    tab: [
      {
        id: 'html',
        title: 'HTML',
        value: `<ircc-cl-lib-input [config]="inputConfig"></ircc-cl-lib-input>`
      },
      {
        id: 'ts',
        title: 'TypeScript',
        value: `
import { IInputComponentConfig } from 'ircc-ds-angular-component-library';
import { FormGroup } from '@angular/forms';

inputConfig: IInputComponentConfig = ${stringify(this.inputConfigCodeView)}`
      }
    ]
  };

  errorState = 'None';
  currentConfigId = this.inputConfig.id;

  setInputType(value: any) {
    this.inputConfig = {
      ...this.inputConfig,
      type: value == 'password' ? 'password' : 'text',
      label: value == 'password' ? 'Password' : 'Label text'
    };
    this.inputConfigSingle = {
      ...this.inputConfigSingle,
      type: value == 'password' ? 'password' : 'text',
      label: value == 'password' ? 'Password' : 'Label text'
    };
    this.inputConfigMulti = {
      ...this.inputConfigMulti,
      type: value == 'password' ? 'password' : 'text',
      label: value == 'password' ? 'Password' : 'Label text'
    };

    this.parseCodeViewConfig();
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.form_interactive_input.addControl(
      this.inputConfig.id,
      new FormControl()
    );
    // Two more form controls, one for each combination of validators
    this.form_interactive_input.addControl(
      this.inputConfig.id + '_single',
      new FormControl('', [Validators.required])
    );
    this.form_interactive_input.addControl(
      this.inputConfig.id + '_multi',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(3),
        Validators.email
      ])
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
      this.parseToggleConfig(value);
      this.parseCodeViewConfig();
      if (value['error'] !== this.errorState) this.toggleErrors(value['error']);
      if (value['state'] !== undefined) this.toggleDisabled(value['state']);
    });
  }

  /**
   * Return mapping of input config from form values
   */
  private parseToggleConfig(value: any) {
    switch (this.errorState) {
      case 'Single':
        this.inputConfigSingle = {
          ...this.inputConfigSingle,
          size: value['size'].toLowerCase(),
          hint: value['hint'] === 'True' ? 'Hint text' : undefined,
          required: value['required'] === 'True',
          desc:
            value['desc'] === 'True' ? 'Description line of text' : undefined,
          placeholder:
            value['placeholder'] === 'True' ? 'Placeholder text' : undefined
        };
        break;
      case 'Multiple':
        this.inputConfigMulti = {
          ...this.inputConfigMulti,
          size: value['size'].toLowerCase(),
          hint: value['hint'] === 'True' ? 'Hint text' : undefined,
          required: value['required'] === 'True',
          desc:
            value['desc'] === 'True' ? 'Description line of text' : undefined,
          placeholder:
            value['placeholder'] === 'True' ? 'Placeholder text' : undefined
        };
        break;
      default:
        this.inputConfig = {
          ...this.inputConfig,
          size: value['size'].toLowerCase(),
          hint: value['hint'] === 'True' ? 'Hint text' : undefined,
          required: value['required'] === 'True',
          desc:
            value['desc'] === 'True' ? 'Description line of text' : undefined,
          placeholder:
            value['placeholder'] === 'True' ? 'Placeholder text' : undefined
        };
    }
  }

  /**
   * Set input field as touched, toggle error states of input
   */
  private toggleErrors(error: string) {
    if (
      !this.form_interactive_input.get(this.currentConfigId)?.touched &&
      error !== 'None'
    )
      this.form_interactive_input.get(this.currentConfigId)?.markAsTouched();

    this.errorState = error;
    switch (error) {
      case 'None':
        this.currentConfigId = this.inputConfig.id;
        this.inputConfigCodeView.errorMessages = undefined;
        break;
      case 'Single':
        this.currentConfigId = this.inputConfigSingle.id;
        if (!this.form_interactive_input.get(this.currentConfigId)?.touched)
          this.form_interactive_input
            .get(this.currentConfigId)
            ?.markAsTouched();
        this.inputConfigCodeView.errorMessages =
          this.inputConfigSingle.errorMessages;
        break;
      case 'Multiple':
        this.currentConfigId = this.inputConfigMulti.id;
        this.form_interactive_input
          .get(this.inputConfigMulti.id)
          ?.setValue('test');
        if (!this.form_interactive_input.get(this.currentConfigId)?.touched)
          this.form_interactive_input
            .get(this.currentConfigId)
            ?.markAsTouched();
        this.inputConfigCodeView.errorMessages =
          this.inputConfigMulti.errorMessages;
        break;
    }
    this.parseCodeViewConfig();
  }

  /**
   * Toggle disabled state of input
   */
  private toggleDisabled(disabled: boolean) {
    const inputControl: AbstractControl | null =
      this.form_interactive_input.get(this.currentConfigId);
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

  private parseCodeViewConfig() {
    const index = this.codeViewConfig?.tab?.findIndex((t) => t.id === 'ts');
    if (-1 == index || !index) return;
    switch (this.errorState) {
      case 'Single':
        this.inputConfigCodeView = {
          ...this.inputConfigCodeView,
          size: this.inputConfigSingle.size,
          type: this.inputConfigSingle.type,
          required: this.inputConfigSingle.required,
          label: this.inputConfigSingle.label,
          desc: this.inputConfigSingle.desc,
          hint: this.inputConfigSingle.hint,
          placeholder: this.inputConfigSingle.placeholder
        };
        break;
      case 'Multiple':
        this.inputConfigCodeView = {
          ...this.inputConfigCodeView,
          size: this.inputConfigMulti.size,
          type: this.inputConfigMulti.type,
          required: this.inputConfigMulti.required,
          label: this.inputConfigMulti.label,
          desc: this.inputConfigMulti.desc,
          hint: this.inputConfigMulti.hint,
          placeholder: this.inputConfigMulti.placeholder
        };
        break;
      default:
        this.inputConfigCodeView = {
          ...this.inputConfigCodeView,
          size: this.inputConfig.size,
          type: this.inputConfig.type,
          required: this.inputConfig.required,
          label: this.inputConfig.label,
          desc: this.inputConfig.desc,
          hint: this.inputConfig.hint,
          placeholder: this.inputConfig.placeholder
        };
        break;
    }

    if (this.codeViewConfig?.tab) {
      this.codeViewConfig.tab[index].value = `
import { IInputComponentConfig } from 'ircc-ds-angular-component-library';
import { FormGroup } from '@angular/forms';

inputConfig: IInputComponentConfig = ${stringify(this.inputConfigCodeView)}`;
    }
  }
}
