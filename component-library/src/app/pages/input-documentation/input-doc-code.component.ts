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
  form = new FormGroup({});
  state: boolean = false;

  constructor(private lang: LangSwitchService) {}


  inputConfig: IInputComponentConfig = {
    id: 'input',
    formGroup: this.form,
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
      formGroup: this.form,
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
      id: 'hint',
      formGroup: this.form,
      size: 'small',
      label: 'General.Hint',
      options: [
        {
          text: 'General.TrueLabel',
          value: 'True'
        },
        {
          text: 'General.FalseLabel',
          value: 'False'
        }
      ]
    },
    {
      id: 'required',
      formGroup: this.form,
      size: 'small',
      label: 'General.Required',
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
      formGroup: this.form,
      size: 'small',
      label: 'ERROR.errorMessage',
      options: [
        {
          text: 'General.FalseLabel',
          value: 'None'
        },
        {
          text: 'General.MultipleErrors',
          value: 'Multiple'
        },
        {
          text: 'General.TrueLabel',
          value: 'Single'
        }
      ]
    },
    {
      id: 'desc',
      formGroup: this.form,
      size: 'small',
      label: 'General.Description',
      options: [
        {
          text: 'General.TrueLabel',
          value: 'True'
        },
        {
          text: 'General.FalseLabel',
          value: 'False'
        }
      ]
    },
    {
      id: 'placeholder',
      formGroup: this.form,
      size: 'small',
      label: 'General.Placeholder',
      options: [
        {
          text: 'General.TrueLabel',
          value: 'True'
        },
        {
          text: 'General.FalseLabel',
          value: 'False'
        }
      ]
    }
  ];

  checkboxes: ICheckBoxComponentConfig[] = [
    {
      id: 'state',
      formGroup: this.form,
      size: 'small',
      label: 'General.StateLabel',
      inlineLabel: 'Disabled'
    }
  ];

  demoTabsConfig: ITabNavConfig = {
    id: 'demoTabs',
    size: 'small',
    tab: [
      {
        id: 'basic',
        title: 'General.Basic'
      },
      {
        id: 'password',
        title: 'General.Password'
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
        value:
          "import { IInputComponentConfig } from 'ircc-ds-angular-component-library';\r" +
          "import { FormGroup } from '@angular/forms';\n\n" +
          `inputConfig: IInputComponentConfig = ${stringify(
            this.inputConfigCodeView
          )} \n //Note: Setting formControl to disabled/enabled triggers disabled/enabled state styling automatically \n ${JSON.stringify(this.stateTxt(this.state))}
          `
      }
    ]
  };

  errorState = 'None';
  currentConfigId = this.inputConfig.id;

  setInputType(value: any) {
    this.inputConfig = {
      ...this.inputConfig,
      type: value == 'password' ? 'password' : 'text'
    };
    this.inputConfigSingle = {
      ...this.inputConfigSingle,
      type: value == 'password' ? 'password' : 'text'
    };
    this.inputConfigMulti = {
      ...this.inputConfigMulti,
      type: value == 'password' ? 'password' : 'text'
    };

    this.parseCodeViewConfig();
  }

  stateTxt(disabled: boolean): string {
    disabled = this.state
    const DISABLE = `this.formGroupName.get('formControlName')?.disable(); //sets the form control to be disabled`;
    const ENABLE = `this.formGroupName.get('formControlName')?.enable(); //sets the form control to be enabled`;
    return disabled ? DISABLE  : ENABLE;
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.form.addControl(this.inputConfig.id, new FormControl());
    // Two more form controls, one for each combination of validators
    this.form.addControl(
      this.inputConfig.id + '_single',
      new FormControl('', [Validators.required])
    );
    this.form.addControl(
      this.inputConfig.id + '_multi',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(3),
        Validators.email
      ])
    );

    this.toggles.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.form.addControl(
          toggle.id,
          new FormControl(toggle.options[1].text)
        );
      }
    });

    this.checkboxes.forEach((checkbox) => {
      this.form.addControl(checkbox.id, new FormControl());
    });

    this.form.patchValue({
      size: 'Small',
      hint: 'False',
      desc: 'True',
      placeholder: 'False',
      error: 'None'
    });

    this.form.valueChanges.subscribe((value: any) => {
      this.parseToggleConfig(value);
      this.parseCodeViewConfig();
      if (value['error'] !== this.errorState) this.toggleErrors(value['error']);
      if (value['state'] !== undefined) {
        this.toggleDisabled(value['state']);
        this.state = value['state'];
      }
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
    if (!this.form.get(this.currentConfigId)?.touched && error !== 'None')
      this.form.get(this.currentConfigId)?.markAsTouched();

    this.errorState = error;
    switch (error) {
      case 'None':
        this.currentConfigId = this.inputConfig.id;
        this.inputConfigCodeView.errorMessages = undefined;
        break;
      case 'Single':
        this.currentConfigId = this.inputConfigSingle.id;
        if (!this.form.get(this.currentConfigId)?.touched)
          this.form.get(this.currentConfigId)?.markAsTouched();
        this.inputConfigCodeView.errorMessages =
          this.inputConfigSingle.errorMessages;
        break;
      case 'Multiple':
        this.currentConfigId = this.inputConfigMulti.id;
        this.form.get(this.inputConfigMulti.id)?.setValue('test');
        if (!this.form.get(this.currentConfigId)?.touched)
          this.form.get(this.currentConfigId)?.markAsTouched();
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
    const inputControl: AbstractControl | null = this.form.get(
      this.currentConfigId
    );
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
    // New Method - Using Pointer manipulation
    const tab = this.codeViewConfig?.tab?.find((t) => t.id === 'ts');
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

    if (tab) {
      tab.value =
        "import { IInputComponentConfig } from 'ircc-ds-angular-component-library';\r" +
        "import { FormGroup } from '@angular/forms';\n\n" +
        `inputConfig: IInputComponentConfig = ${stringify(
          this.inputConfigCodeView
        )} \n //Note: Setting formControl to disabled/enabled triggers disabled/enabled state styling automatically \n ${JSON.stringify(this.stateTxt(this.state))}
        `;
    }
  }
}
