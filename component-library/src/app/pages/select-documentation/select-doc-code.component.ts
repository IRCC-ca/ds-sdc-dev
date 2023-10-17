import { Component, OnInit } from '@angular/core';
import { TranslatedPageComponent } from '@app/pages/translated-page-component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import {
  ICheckBoxComponentConfig,
  ISelectConfig,
  IRadioInputComponentConfig,
  ITabNavConfig,
  IBannerConfig
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
  altLangLink = 'select';
  form = new FormGroup({});
  state: boolean = false;

  constructor(private lang: LangSwitchService) {}

  selectConfig: ISelectConfig = {
    id: 'select',
    formGroup: this.form,
    desc: 'Description line of text',
    required: true,
    label: 'Label text',
    options: [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }],
    size: 'small',
    placeholder: 'Default'
  };

  errorSelectConfig: ISelectConfig = {
    ...this.selectConfig,
    id: 'select_error',
    errorMessages: [{ key: 'required', errorLOV: 'ERROR.fieldIsRequired' }]
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
      id: 'error',
      formGroup: this.form,
      size: 'small',
      label: 'General.Error',
      options: [
        {
          text: 'True'
        },
        {
          text: 'False'
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
    options: this.selectConfig.options,
    placeholder: this.selectConfig.placeholder,
    errorMessages: undefined
  };

  bannerConfig: IBannerConfig = {
    id: 'banner-disabled-desc',
    type: 'info',
    size: 'small',
    title: 'General.EnabledBannerTitle',
    content: 'General.EnabledBannerContent',
    rounded: true
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
          )}`
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

    this.form.addControl(this.selectConfig.id, new FormControl(''));
    // Two more form controls, one for each combination of validators
    this.form.addControl(
      this.errorSelectConfig.id,
      new FormControl('', [Validators.required])
    );
    // Two more form controls, one for each combination of validators
    console.log(this.form);

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

    this.form.get(this.checkboxes[0].id)?.valueChanges.subscribe((change) => {
      if (change) {
        this.bannerConfig.title = 'General.DisabledBannerTitle';
        this.bannerConfig.content = 'General.DisabledBannerContent';
      } else {
        this.bannerConfig.title = 'General.EnabledBannerTitle';
        this.bannerConfig.content = 'General.EnabledBannerContent';
      }
    });

    this.form.patchValue({
      size: 'Small',
      hint: 'False',
      desc: 'True',
      error: 'False',
      required: 'True'
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
    switch (this.errorState) {
      case 'True':
        this.errorSelectConfig = {
          ...this.errorSelectConfig,
          size: value['size'].toLowerCase(),
          hint: value['hint'] === 'True' ? 'Hint text' : undefined,
          required: value['required'] === 'True',
          desc:
            value['desc'] === 'True' ? 'Description line of text' : undefined
        };
        break;
      default:
        this.selectConfig = {
          ...this.selectConfig,
          size: value['size'].toLowerCase(),
          hint: value['hint'] === 'True' ? 'Hint text' : undefined,
          required: value['required'] === 'True',
          desc:
            value['desc'] === 'True' ? 'Description line of text' : undefined
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
      case 'False':
        this.currentConfigId = this.selectConfig.id;
        this.selectConfigCodeView.errorMessages = undefined;
        break;
      case 'True':
        this.currentConfigId = this.errorSelectConfig.id;
        if (!this.form.get(this.currentConfigId)?.touched)
          this.form.get(this.currentConfigId)?.markAsTouched();
        this.selectConfigCodeView.errorMessages =
          this.errorSelectConfig.errorMessages;
        break;
    }
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
      hint: this.selectConfig.hint
    };

    console.log(this.selectConfigCodeView);

    if (tab) {
      tab.value =
        "import { ISelectConfig } from 'ircc-ds-angular-component-library';\r" +
        "import { FormGroup } from '@angular/forms';\n\n" +
        `selectConfig: ISelectConfig = ${stringify(this.selectConfigCodeView)}`;
    }
  }
}
