import { Component, OnInit } from '@angular/core';
import { TranslatedPageComponent } from '@app/pages/translated-page-component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import {
  ICheckBoxComponentConfig,
  ISelectConfig,
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
  selector: 'app-select-doc-code',
  templateUrl: './select-doc-code.component.html',
  styleUrls: ['./select-doc-code.component.scss']
})
export class SelectDocCodeComponent implements OnInit, TranslatedPageComponent {
  altLangLink = 'selectDocumentation';
  form = new FormGroup({});
  state: boolean = false;

  constructor(private lang: LangSwitchService) {}

  selectConfig: ISelectConfig = {
    id: 'select',
    formGroup: this.form
  };

  inputConfigSingle: ISelectConfig = {
    ...this.selectConfig,
    id: 'select_single',
    required: true,
    errorMessages: [{ key: 'required', errorLOV: 'ERROR.fieldIsRequired' }]
  };

  inputConfigMulti: ISelectConfig = {
    ...this.selectConfig,
    id: 'select_multi',
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

  selectConfigCodeView: any = {
    id: this.selectConfig.id,
    formGroup: `new FormGroup({})`,
    required: this.selectConfig.required,
    size: this.selectConfig.size,
    label: this.selectConfig.label,
    desc: this.selectConfig.desc,
    hint: this.selectConfig.hint,
    placeholder: this.selectConfig.placeholder,
    errorMessages: undefined
  };

  codeViewConfig: ICodeViewerConfig = {
    id: 'select-code-viewer',
    openAccordion: true,
    selected: 'html',
    tab: [
      {
        id: 'html',
        title: 'HTML',
        value: `<ircc-cl-lib-select [config]="selectConfig"></ircc-cl-lib-select>`
      },
      {
        id: 'ts',
        title: 'TypeScript',
        value:
          "import { ISelectConfig } from 'ircc-ds-angular-component-library';\r" +
          "import { FormGroup } from '@angular/forms';\n\n" +
          `selectConfig: ISelectConfig = ${stringify(
            this.selectConfigCodeView
          )} \n //Note: Setting formControl state triggers disabled/enabled styling automatically \n ${JSON.stringify(
            this.stateTxt(this.state)
          )}
          `
      }
    ]
  };

  errorState = 'None';
  currentConfigId = this.selectConfig.id;

  stateTxt(disabled: boolean): string {
    const DISABLE = `this.formGroupName.get('formControlName')?.disable(); //sets the form control to be disabled`;
    const ENABLE = `this.formGroupName.get('formControlName')?.enable(); //sets the form control to be enabled`;
    return disabled ? DISABLE : ENABLE;
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.form.addControl(this.selectConfig.id, new FormControl());
    // Two more form controls, one for each combination of validators
    this.form.addControl(
      this.selectConfig.id + '_single',
      new FormControl('', [Validators.required])
    );
    this.form.addControl(
      this.selectConfig.id + '_multi',
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
      if (value['error'] !== this.errorState) this.toggleErrors(value['error']);
      if (value['state'] !== undefined) {
        this.toggleDisabled(value['state']);
        this.state = value['state'];
      }
      this.parseToggleConfig(value);
      this.parseCodeViewConfig();
    });
  }

  /**
   * Return mapping of input config from form values
   */
  private parseToggleConfig(value: any) {
    this.selectConfig = {
      ...this.selectConfig,
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
    if (!this.form.get(this.currentConfigId)?.touched && error !== 'None')
      this.form.get(this.currentConfigId)?.markAsTouched();

    this.errorState = error;

    this.currentConfigId = this.selectConfig.id;
    this.selectConfigCodeView.errorMessages = undefined;

    this.parseCodeViewConfig();
  }

  /**
   * Toggle disabled state of input
   */
  private toggleDisabled(disabled: boolean) {
    const selectControl: AbstractControl | null = this.form.get(
      this.currentConfigId
    );
    if (
      (disabled && selectControl?.disabled) ||
      (!disabled && selectControl?.enabled)
    )
      return;

    if (disabled) {
      selectControl?.disable();
    } else {
      selectControl?.enable();
    }
  }

  private parseCodeViewConfig() {
    const index = this.codeViewConfig?.tab?.findIndex((t) => t.id === 'ts');
    if (-1 == index || !index) return;
    // New Method - Using Pointer manipulation
    const tab = this.codeViewConfig?.tab?.find((t) => t.id === 'ts');

    this.selectConfigCodeView = {
      ...this.selectConfigCodeView,
      size: this.selectConfig.size,
      required: this.selectConfig.required,
      label: this.selectConfig.label,
      desc: this.selectConfig.desc,
      hint: this.selectConfig.hint,
      placeholder: this.selectConfig.placeholder
    };

    if (tab) {
      tab.value =
        "import { ISelectConfig } from 'ircc-ds-angular-component-library';\r" +
        "import { FormGroup } from '@angular/forms';\n\n" +
        `selectConfig: ISelectConfig = ${stringify(
          this.selectConfigCodeView
        )} \n //Note: Setting formControl state triggers disabled/enabled styling automatically \n ${JSON.stringify(
          this.stateTxt(this.state)
        )}
        `;
    }
  }
}
