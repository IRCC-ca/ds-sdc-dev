import { Component, OnInit } from '@angular/core';
import { TranslatedPageComponent } from '@app/pages/translated-page-component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import {
  ICheckBoxComponentConfig,
  IInputComponentConfig,
  IRadioInputComponentConfig,
  ITabNavConfig
} from 'ircc-ds-angular-component-library';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
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

  formInteractiveInput = new FormGroup({});

  inputConfig: IInputComponentConfig = {
    id: 'input',
    formGroup: this.formInteractiveInput,
    size: 'small',
    type: 'text',
    required: false,
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
      formGroup: this.formInteractiveInput,
      size: 'small',
      label: 'General.Size',
      options: [
        {
          text: 'General.Small'
        },
        {
          text: 'General.Large'
        }
      ]
    },
    {
      id: 'hint',
      formGroup: this.formInteractiveInput,
      size: 'small',
      label: 'General.Hint',
      options: [
        {
          text: 'General.Show',
          value: 'True'
        },
        {
          text: 'General.Hide',
          value: 'False'
        }
      ]
    },
    {
      id: 'required',
      formGroup: this.formInteractiveInput,
      size: 'small',
      label: 'General.Required',
      options: [
        {
          text: 'General.True'
        },
        {
          text: 'General.False'
        }
      ]
    },
    {
      id: 'error',
      formGroup: this.formInteractiveInput,
      size: 'small',
      label: 'ERROR.errorMessage',
      options: [
        {
          text: 'General.NoneErr'
        },
        {
          text: 'General.SingleErr'
        },
        {
          text: 'General.MultipleErr'
        }
      ]
    },
    {
      id: 'desc',
      formGroup: this.formInteractiveInput,
      size: 'small',
      label: 'General.Description',
      options: [
        {
          text: 'General.Show',
          value: 'True'
        },
        {
          text: 'General.Hide',
          value: 'False'
        }
      ]
    },
    {
      id: 'placeholder',
      formGroup: this.formInteractiveInput,
      size: 'small',
      label: 'General.Placeholder',
      options: [
        {
          text: 'General.Show',
          value: 'True'
        },
        {
          text: 'General.Hide',
          value: 'False'
        }
      ]
    }
  ];

  checkboxes: ICheckBoxComponentConfig[] = [
    {
      id: 'state',
      formGroup: this.formInteractiveInput,
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
          )}`
      }
    ]
  };

  setInputType(value: any) {
    switch (value) {
      case 'password':
        this.inputConfig = {
          ...this.inputConfig,
          type: 'password',
          label: 'Password'
        };
        break;
      default:
        this.inputConfig = {
          ...this.inputConfig,
          type: 'text',
          label: 'Label text'
        };
        break;
    }
    this.parseCodeViewConfig();
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.formInteractiveInput.addControl(
      this.inputConfig.id,
      new FormControl()
    );

    this.toggles.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.formInteractiveInput.addControl(
          toggle.id,
          new FormControl(toggle.options[1].text)
        );
      }
    });

    this.checkboxes.forEach((checkbox) => {
      this.formInteractiveInput.addControl(checkbox.id, new FormControl());
    });

    this.formInteractiveInput.patchValue({
      size: 'Small',
      hint: 'False',
      desc: 'True',
      placeholder: 'False',
      error: 'None'
    });

    this.formInteractiveInput.valueChanges.subscribe((value: any) => {
      this.inputConfig = this.parseToggleConfig(value);
      this.parseCodeViewConfig();
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
      hint: value['hint'] === 'True' ? 'Hint text' : undefined,
      required: value['required'] === 'True',
      desc: value['desc'] === 'True' ? 'Description line of text' : undefined,
      placeholder:
        value['placeholder'] === 'True' ? 'Placeholder text' : undefined
    };
  }

  /**
   * Set input field as touched, toggle error states of input
   */
  private toggleErrors(error: string) {
    if (
      !this.formInteractiveInput.get(this.inputConfig.id)?.touched &&
      error !== 'None'
    )
      this.formInteractiveInput.get(this.inputConfig.id)?.markAsTouched();

    switch (error) {
      case 'None':
        this.formInteractiveInput
          .get(this.inputConfig.id)
          ?.setErrors({ errors: null });
        this.formInteractiveInput.get(this.inputConfig.id)?.markAsUntouched();
        this.inputConfigCodeView.errorMessages = undefined;
        break;
      case 'Single':
        this.formInteractiveInput.get(this.inputConfig.id)?.setErrors({
          invalid: true
        });
        this.inputConfigCodeView.errorMessages = this.inputConfig.errorMessages;
        break;
      case 'Multiple':
        this.formInteractiveInput.get(this.inputConfig.id)?.setErrors({
          invalid: true,
          testingError: true,
          maxlength: { requiredLength: 3, actualLength: 5 }
        });
        this.inputConfigCodeView.errorMessages = this.inputConfig.errorMessages;
        break;
    }
    this.parseCodeViewConfig();
  }

  /**
   * Toggle disabled state of input
   */
  private toggleDisabled(disabled: boolean) {
    const inputControl: AbstractControl | null = this.formInteractiveInput.get(
      this.inputConfig.id
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
    //New Method - Using Pointer manipulation
    const tab = this.codeViewConfig?.tab?.find((t) => t.id === 'ts');
    if (tab) {
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

      tab.value =
        "import { IInputComponentConfig } from 'ircc-ds-angular-component-library';\r" +
        "import { FormGroup } from '@angular/forms';\n\n" +
        `inputConfig: IInputComponentConfig = ${stringify(
          this.inputConfigCodeView
        )}`;
    }
  }
}
