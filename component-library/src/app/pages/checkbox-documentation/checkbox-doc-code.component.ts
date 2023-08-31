import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { TranslateService } from '@app/share/templates/parent-template.module';
import { IBannerConfig, ICheckBoxComponentConfig, IMultiCheckboxConfig, IRadioInputComponentConfig, ITabNavConfig } from 'ircc-ds-angular-component-library';

const enum CheckboxTypes {
  single = "single",
  group = "group",
  multi = "multi"
}

@Component({
  selector: 'app-checkbox-doc-code',
  templateUrl: './checkbox-doc-code.component.html',
  styleUrls: ['./checkbox-doc-code.component.scss']
})
export class CheckboxDocCodeComponent implements OnInit {
  altLangLink = 'checkbox';

  formCheckbox = new FormGroup({});
  formMultiCheckbox: FormGroup = new FormGroup({});

  checkbox_type = CheckboxTypes.single

  constructor(private lang: LangSwitchService, private translate: TranslateService) {}

  checkboxConfig: ICheckBoxComponentConfig = {
    id: 'checkbox',
    formGroup: this.formCheckbox,
    size: 'small',
    required: true,
    label: 'Label Text',
    desc: 'Description line of text',
    inlineLabel: 'Default',
    mixed: false,
    disableFocus: false,
    inlineLabelBold: false,
    customErrorText: 'custom error text'
    // errorMessages?: IErrorPairs[];
  }

  multiCheckboxConfig: IMultiCheckboxConfig = {
    id: 'multi_checkbox',
    parent: {
      id: 'parent',
      label: 'Label Text',
      desc: 'Description line of text',
      required: true,
      formGroup: this.formMultiCheckbox,
      inlineLabel: 'Parent Item',
      size: 'small',
      // errorMessages: [{ key: 'invalid', errorLOV: 'ERROR.fieldIsInvalid' }]
    },
    children: [
      {
        id: 'child1',
        formGroup: this.formMultiCheckbox,
        inlineLabel: 'Child Item',
        size: 'small'
      },
      {
        id: 'child2',
        formGroup: this.formMultiCheckbox,
        inlineLabel: 'Child Item',
        size: 'small'
      },
      {
        id: 'child3',
        formGroup: this.formMultiCheckbox,
        inlineLabel: 'Child Item',
        size: 'small'
      }
    ],
    errorMessages: []
  };

  checkboxConfigSingleError: ICheckBoxComponentConfig = {
    ...this.checkboxConfig,
    id: 'checkbox_error_single',
    required: true,
    errorMessages: [{ key: 'required', errorLOV: this.translate.instant('ERROR.singleError') }]
  };

  multiCheckboxConfigSingleError: IMultiCheckboxConfig = {
    ...this.multiCheckboxConfig,
    id: 'multi_checkbox_error_single',
    errorMessages: [{id:'singleError', key: 'required', errorLOV: this.translate.instant('ERROR.singleError') }]
  };

  checkboxConfigMultiErrors: ICheckBoxComponentConfig = {
    ...this.checkboxConfig,
    id: 'checkbox_error_multi',
    errorMessages: [
      { key: 'email', errorLOV: this.translate.instant('ERROR.singleError') },
      { key: 'email', errorLOV: this.translate.instant('ERROR.additionalError') },
      { key: 'maxlength', errorLOV: this.translate.instant('ERROR.additionalError') }
    ]
  };
  
  togglesSingleCheckbox: IRadioInputComponentConfig[] = [
    {
      id: 'size',
      formGroup: this.formCheckbox,
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
      formGroup: this.formCheckbox,
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
      id: 'label',
      formGroup: this.formCheckbox,
      size: 'small',
      label: 'General.LabelHeading',
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
      id: 'desc',
      formGroup: this.formCheckbox,
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
      formGroup: this.formCheckbox,
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
      formGroup: this.formCheckbox,
      size: 'small',
      label: 'ERROR.errorMessage',
      options: [
        {
          text: 'General.NoneErr',
          value: 'None'
        },
        {
          text: 'General.SingleErr',
          value: 'Single'
        },
        {
          text: 'General.MultipleErr',
          value: 'Multiple'
        }
      ]
    },
  ];
  
  checkboxesSingle: ICheckBoxComponentConfig[] = [
    {
      id: 'state',
      formGroup: this.formCheckbox,
      size: 'small',
      label: 'General.StateLabel',
      inlineLabel: 'General.DisabledLabel'
    },
  ];

  togglesMultiCheckbox: IRadioInputComponentConfig[] = [
    {
      id: 'size',
      formGroup: this.formMultiCheckbox,
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
      formGroup: this.formMultiCheckbox,
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
      id: 'label',
      formGroup: this.formMultiCheckbox,
      size: 'small',
      label: 'General.LabelHeading',
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
      id: 'desc',
      formGroup: this.formMultiCheckbox,
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
      formGroup: this.formMultiCheckbox,
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
      formGroup: this.formMultiCheckbox,
      size: 'small',
      label: 'ERROR.errorMessage',
      options: [
        {
          text: 'General.NoneErr',
          value: 'None'
        },
        {
          text: 'General.SingleErr',
          value: 'Single'
        },
        {
          text: 'General.MultipleErr',
          value: 'Multiple'
        }
      ]
    },
  ];

  checkboxesMulti: ICheckBoxComponentConfig[] = [
    {
      id: 'state',
      formGroup: this.formMultiCheckbox,
      size: 'small',
      label: 'General.StateLabel',
      inlineLabel: 'General.DisabledLabel'
    },
  ];
  
  demoTabsConfig: ITabNavConfig = {
    id: 'demoTabs',
    size: 'small',
    tab: [
      {
        id: 'single-checkbox',
        title: ' Checkbox '
      },
      {
        id: 'group-checkbox',
        title: 'Checkbox Group'
      },
      {
        id: 'multi-checkbox',
        title: 'Checkbox Parent/Child'
      }
    ]
  };
  
  bannerConfig: IBannerConfig = {
    id: "banner-disabled-desc",
    type: "info",
    size: "small",
    title:'General.EnabledBannerTitle',
    content: "General.EnabledBannerContent",
    rounded: true
  };

  setCheckboxType(value: any) {
    console.log("Tab name:", value)
    switch(value) {
      case 'single-checkbox':
        console.log("single checkbox  ----");
        this.checkbox_type = CheckboxTypes.single
        break;
      case 'group-checkbox':
        console.log("group checkbox  ----");
        this.checkbox_type = CheckboxTypes.group
        break;
      case 'multi-checkbox':
        console.log("multi checkbox  ----");
        this.checkbox_type = CheckboxTypes.multi
        break
      default:
        console.log("default checkbox  ----");
    }
  }

  errorState = 'None';
  currentConfigId = this.checkboxConfig.id;
  
  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.formCheckbox.addControl(this.checkboxConfig.id, new FormControl());
    // Two more form controls, one for each combination of validators
    this.formCheckbox.addControl(
      this.checkboxConfig.id + '_error_single',
      new FormControl('', [Validators.required])
    );
    this.formCheckbox.addControl(
      this.checkboxConfig.id + '_error_multi',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(3),
        Validators.email
      ])
    );

    this.multiCheckboxConfig.parent.formGroup.addControl(
      this.multiCheckboxConfig.parent.id,
      new FormControl('')
    );

    this.formMultiCheckbox.addControl(
      this.multiCheckboxConfig.id + '_error_single',
      new FormControl('', [Validators.required])
    );

    this.formMultiCheckbox.addControl(
      this.multiCheckboxConfig.id + '_error_multi',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(3),
        Validators.email
      ])
    );

    this.multiCheckboxConfig.children?.forEach((res) => {
      res.formGroup.addControl(
        res.id,
        new FormControl('')
      );
    });

    this.togglesSingleCheckbox.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.formCheckbox.addControl(
          toggle.id,
          new FormControl(toggle.options[1].text)
        );
      }
    });

    this.togglesMultiCheckbox.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.formMultiCheckbox.addControl(
          toggle.id,
          new FormControl(toggle.options[1].text)
        );
      }
    });

    this.checkboxesSingle.forEach((checkbox) => {
      this.formCheckbox.addControl(checkbox.id, new FormControl());
    });

    this.checkboxesMulti.forEach((checkbox) => {
      console.log("**********************************************************",checkbox.id)
      this.formMultiCheckbox.addControl(checkbox.id, new FormControl());
    });

    this.formCheckbox.get(this.checkboxesSingle[0].id)
    ?.valueChanges.subscribe((change) => {
      if (change) {
        this.bannerConfig.title='General.DisabledBannerTitle'
        this.bannerConfig.content="General.DisabledBannerContent"
      } else {
        this.bannerConfig.title='General.EnabledBannerTitle'
        this.bannerConfig.content="General.EnabledBannerContent"
      }
    });

    this.formMultiCheckbox.get(this.checkboxesMulti[0].id)
    ?.valueChanges.subscribe((change) => {
      if (change) {
        this.bannerConfig.title='General.DisabledBannerTitle'
        this.bannerConfig.content="General.DisabledBannerContent"
      } else {
        this.bannerConfig.title='General.EnabledBannerTitle'
        this.bannerConfig.content="General.EnabledBannerContent"
      }
    });

    this.formCheckbox.patchValue({
      size: 'Small',
      label: 'True',
      hint: 'False',
      desc: 'True',
      required: 'True',
      error: 'None'
    });

    this.formMultiCheckbox.patchValue({
      size: 'Small',
      label: 'True',
      hint: 'False',
      desc: 'True',
      required: 'True',
      error: 'None'
    });

    this.formCheckbox.valueChanges.subscribe((value: any) => {
      console.log("------formCheckbo Value---------------", value)
      if (value['error'] !== this.errorState) this.toggleErrors(value['error']);
      if (value['state'] !== undefined) {
        this.toggleDisabled(value['state'], this.checkboxConfig.id, this.formCheckbox);
        // this.state = value['state'];
      }
      this.parseToggleConfigSingleCheckbox(value);
      // this.parseCodeViewConfig();
    });

    this.formMultiCheckbox.valueChanges.subscribe((value: any) => {
      console.log("---------------------<valueChanges-MultiCheckbox>", value)
      // if (value['error'] !== this.errorState) this.toggleErrors(value['error']);
      if (value['state'] !== undefined) {
        this.toggleDisabled(value['state'], this.multiCheckboxConfig.parent.id, this.formMultiCheckbox);
        this.multiCheckboxConfig.children?.forEach((child) => {
          this.toggleDisabled(value['state'], child.id, this.formMultiCheckbox);
        });
        // this.state = value['state'];
      }
      this.parseToggleConfigMultiCheckbox(value);
      // this.parseCodeViewConfig();
    });
  }

    /**
   * Toggle disabled state of input
   */
    private toggleDisabled(disabled: boolean, currentConfigId : string, formType : FormGroup) {
      const checkboxControl: AbstractControl | null = formType.get(
        currentConfigId
      );
      console.log("Abstract:", checkboxControl)
      if (
        (disabled && checkboxControl?.disabled) ||
        (!disabled && checkboxControl?.enabled)
      )
        return;
  
      if (disabled) {
        checkboxControl?.disable();
      } else {
        checkboxControl?.enable();
      }
    }

    /**
   * Return mapping of input config from form values
   */
  private parseToggleConfigSingleCheckbox(value: any) {
    switch (this.errorState) {
      case 'Single':
        this.checkboxConfigSingleError = {
          ...this.checkboxConfigSingleError,
          size: value['size'].toLowerCase(),
          required: value['required'] === 'True',
          label:
            value['label'] === 'True' ? 'Label Text' : undefined,
          desc:
            value['desc'] === 'True' ? 'Description line of text' : undefined,
          helpText:
            value['hint'] === 'True' ? 'Hint Text' : undefined,
        };
        break;
      case 'Multiple':
        console.log('Multiple')
        this.checkboxConfigMultiErrors = {
          ...this.checkboxConfigMultiErrors,
          size: value['size'].toLowerCase(),
          required: value['required'] === 'True',
          label:
            value['label'] === 'True' ? 'Label Text' : undefined,
          desc:
            value['desc'] === 'True' ? 'Description line of text' : undefined,
          helpText:
            value['hint'] === 'True' ? 'Hint Text' : undefined,
        };
        break;
      default:
        this.checkboxConfig = {
          ...this.checkboxConfig,
          size: value['size'].toLowerCase(),
          required: value['required'] === 'True',
          label:
            value['label'] === 'True' ? 'Label Text' : undefined,
          desc:
            value['desc'] === 'True' ? 'Description line of text' : undefined,
          helpText:
            value['hint'] === 'True' ? 'Hint Text' : undefined,
        };
        console.log('Single checkbox config', this.checkboxConfig)
    }
  }

  private parseToggleConfigMultiCheckbox(value: any) {
    switch (this.errorState) {
      case 'Single':
        this.multiCheckboxConfigSingleError = {
          ...this.multiCheckboxConfigSingleError,
          parent : {
            ...this.multiCheckboxConfigSingleError.parent,
            size: value['size'].toLowerCase(),
            required: value['required'] === 'True',
            label: value['label'] === 'True' ? 'Label Text' : undefined,
            desc: value['desc'] === 'True' ? 'Description line of text' : undefined,
            helpText: value['hint'] === 'True' ? 'Hint Text' : undefined,
          },
        };
        this.multiCheckboxConfigSingleError.children?.forEach((res) => {
          res.size = value['size'].toLowerCase()
        })
        break;
      // case 'Multiple':
      //   console.log('Multiple')
      //   this.checkboxConfigMultiErrors = {
      //     ...this.checkboxConfigMultiErrors,
      //     size: value['size'].toLowerCase(),
      //     required: value['required'] === 'True',
      //     label:
      //       value['label'] === 'True' ? 'Label Text' : undefined,
      //     desc:
      //       value['desc'] === 'True' ? 'Description line of text' : undefined,
      //     helpText:
      //       value['hint'] === 'True' ? 'Hint Text' : undefined,
      //   };
      //   break;
      default:
        console.log("Default Swiitch", this.multiCheckboxConfig)
        this.multiCheckboxConfig = {
          ...this.multiCheckboxConfig,
          // parent['size']
          parent : {
            ...this.multiCheckboxConfig.parent,
            size: value['size'].toLowerCase(),
            required: value['required'] === 'True',
            label: value['label'] === 'True' ? 'Label Text' : undefined,
            desc: value['desc'] === 'True' ? 'Description line of text' : undefined,
            helpText: value['hint'] === 'True' ? 'Hint Text' : undefined,
          },
        };
        this.multiCheckboxConfig.children?.forEach((res) => {
          res.size = value['size'].toLowerCase()
        })
    }
  }

  /**
   * Set input field as touched, toggle error states of input
   */
  private toggleErrors(error: string) {
    console.log("------------------ERROR------------------", error)
    if (!this.formCheckbox.get(this.currentConfigId)?.touched && error !== 'None')
      this.formCheckbox.get(this.currentConfigId)?.markAsTouched();

    this.errorState = error;
    switch (error) {
      case 'None':
        this.currentConfigId = this.checkboxConfig.id;
        // this.inputConfigCodeView.errorMessages = undefined;
        break;
      case 'Single':
        this.currentConfigId = this.checkboxConfigSingleError.id;
        if (!this.formCheckbox.get(this.currentConfigId)?.touched)
          this.formCheckbox.get(this.currentConfigId)?.markAsTouched();
        // this.inputConfigCodeView.errorMessages =
        //   this.inputConfigSingle.errorMessages;
        break;
      case 'Multiple':
        this.currentConfigId = this.checkboxConfigMultiErrors.id;
        this.formCheckbox.get(this.checkboxConfigMultiErrors.id)?.setValue('test');
        if (!this.formCheckbox.get(this.currentConfigId)?.touched)
          this.formCheckbox.get(this.currentConfigId)?.markAsTouched();
        // this.inputConfigCodeView.errorMessages =
        //   this.inputConfigMulti.errorMessages;
        break;
    }
    // this.parseCodeViewConfig();
  }

  /**
   * Set input field as touched, toggle error states of input
   */
  private toggleErrorsMulti(error: string, configId : string) {
    console.log("------------------ERROR------------------", error)
    if (!this.formCheckbox.get(configId)?.touched && error !== 'None')
      this.formCheckbox.get(configId)?.markAsTouched();

    this.errorState = error;
    switch (error) {
      case 'None':
        this.checkboxConfig.errorMessages = []
        break;
      case 'Single':
        // this.currentConfigId = this.checkboxConfigSingleError.id;
        if (!this.formCheckbox.get(configId)?.touched)
          this.formCheckbox.get(configId)?.markAsTouched();
        // this.inputConfigCodeView.errorMessages =
        //   this.inputConfigSingle.errorMessages;
        break;
      case 'Multiple':
        // this.currentConfigId = this.checkboxConfigMultiErrors.id;
        this.formCheckbox.get(configId)?.setValue('test');
        if (!this.formCheckbox.get(configId)?.touched)
          this.formCheckbox.get(configId)?.markAsTouched();
        // this.inputConfigCodeView.errorMessages =
        //   this.inputConfigMulti.errorMessages;
        break;
    }
    // this.parseCodeViewConfig();
  }
}
