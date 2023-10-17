import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { TranslateService } from '@app/share/templates/parent-template.module';
import {
  IBannerConfig,
  ICheckBoxComponentConfig,
  IMultiCheckboxConfig,
  IRadioInputComponentConfig,
  ITabNavConfig
} from 'ircc-ds-angular-component-library';

const enum CheckboxTypes {
  single = 'single',
  group = 'group',
  multi = 'multi'
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
  formGroupCheckbox: FormGroup = new FormGroup({});

  checkbox_type = CheckboxTypes.single;
  errorState = 'None';

  constructor(
    private lang: LangSwitchService,
    private translate: TranslateService
  ) {}

  singleCheckboxConfig: ICheckBoxComponentConfig = {
    id: 'single_checkbox',
    formGroup: this.formCheckbox,
    size: 'small',
    required: true,
    label: 'Label Text',
    desc: 'Description line of text',
    inlineLabel: 'Default',
    mixed: false,
    disableFocus: false,
    inlineLabelBold: false,
    errorMessages: [
      {
        key: 'test',
        errorLOV: this.translate.instant('ERROR.singleError')
      },
      {
        key: 'email',
        errorLOV: this.translate.instant('ERROR.additionalError')
      },
      {
        key: 'maxLength',
        errorLOV: this.translate.instant('ERROR.additionalError')
      }
    ]
  };

  multiCheckboxConfig: IMultiCheckboxConfig = {
    id: 'multi_checkbox',
    label: {
      label: 'Label Text test',
      desc: 'Description line of text',
      required: true,
      formGroup: this.formMultiCheckbox,
      parentID: 'parent'
    },
    parent: {
      id: 'parent',
      formGroup: this.formMultiCheckbox,
      inlineLabel: 'Parent Item',
      size: 'small'
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
    errorMessages: [
      {
        id: 'singleError1',
        key: 'test',
        errorLOV: this.translate.instant('ERROR.singleError')
      },
      {
        id: 'singleError2',
        key: 'email',
        errorLOV: this.translate.instant('ERROR.additionalError')
      },
      {
        id: 'singleError3',
        key: 'maxLength',
        errorLOV: this.translate.instant('ERROR.additionalError')
      }
    ]
  };

  groupCheckboxConfig: IMultiCheckboxConfig = {
    id: 'group_checkbox',
    label: {
      formGroup: this.formGroupCheckbox,
      label: 'Label Text test',
      desc: 'Description line of text',
      required: true,
      parentID: 'group-child1'
    },
    children: [
      {
        id: 'group-child1',
        formGroup: this.formGroupCheckbox,
        inlineLabel: 'Default',
        size: 'small'
      },
      {
        id: 'group-child2',
        formGroup: this.formGroupCheckbox,
        inlineLabel: 'Default',
        size: 'small'
      },
      {
        id: 'group-child3',
        formGroup: this.formGroupCheckbox,
        inlineLabel: 'Default',
        size: 'small'
      }
    ],
    errorMessages: [
      {
        id: 'singleError1',
        key: 'test',
        errorLOV: this.translate.instant('ERROR.singleError')
      },
      {
        id: 'singleError2',
        key: 'email',
        errorLOV: this.translate.instant('ERROR.additionalError')
      },
      {
        id: 'singleError3',
        key: 'maxLength',
        errorLOV: this.translate.instant('ERROR.additionalError')
      }
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
      label: 'General.Error',
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
    }
  ];

  /**
   * Disable enable checkbox config for single checkbox
   */
  checkboxesSingle: ICheckBoxComponentConfig[] = [
    {
      id: 'state',
      formGroup: this.formCheckbox,
      size: 'small',
      label: 'General.StateLabel',
      inlineLabel: 'General.DisabledLabel'
    }
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
      label: 'General.Error',
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
    }
  ];

  /**
   * Disable enable checkbox config for multicheckbox
   */
  checkboxesMulti: ICheckBoxComponentConfig[] = [
    {
      id: 'state',
      formGroup: this.formMultiCheckbox,
      size: 'small',
      label: 'General.StateLabel',
      inlineLabel: 'General.DisabledLabel'
    }
  ];

  togglesGroupCheckbox: IRadioInputComponentConfig[] = [
    {
      id: 'size',
      formGroup: this.formGroupCheckbox,
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
      formGroup: this.formGroupCheckbox,
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
      formGroup: this.formGroupCheckbox,
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
      formGroup: this.formGroupCheckbox,
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
      formGroup: this.formGroupCheckbox,
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
      formGroup: this.formGroupCheckbox,
      size: 'small',
      label: 'General.Error',
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
    }
  ];

  /**
   * Disable enable checkbox config for group checkbox
   */
  checkboxesGroup: ICheckBoxComponentConfig[] = [
    {
      id: 'state',
      formGroup: this.formGroupCheckbox,
      size: 'small',
      label: 'General.StateLabel',
      inlineLabel: 'General.DisabledLabel'
    }
  ];

  demoTabsConfig: ITabNavConfig = {
    id: 'demoTabs',
    size: 'small',
    tab: [
      {
        id: 'single-checkbox',
        title: 'Checkbox.Title'
      },
      {
        id: 'group-checkbox',
        title: 'Checkbox.GroupTitle'
      },
      {
        id: 'multi-checkbox',
        title: 'Checkbox.MultiTitle'
      }
    ]
  };

  bannerConfigSingleCheckBox: IBannerConfig = {
    id: 'banner-disabled-desc',
    type: 'info',
    size: 'small',
    title: 'General.EnabledBannerTitle',
    content: 'General.EnabledBannerContent',
    rounded: true
  };

  bannerConfigMultiCheckBox: IBannerConfig = {
    id: 'banner-disabled-desc',
    type: 'info',
    size: 'small',
    title: 'General.EnabledBannerTitle',
    content: 'General.EnabledBannerContent',
    rounded: true
  };

  bannerConfigGroupCheckBox: IBannerConfig = {
    id: 'banner-disabled-desc',
    type: 'info',
    size: 'small',
    title: 'General.EnabledBannerTitle',
    content: 'General.EnabledBannerContent',
    rounded: true
  };

  /**
   * Set checkbox type based on the tab selected
   */
  setCheckboxType(value: any) {
    switch (value) {
      case 'single-checkbox':
        this.checkbox_type = CheckboxTypes.single;
        this.resetAndPatchFormValues(this.formCheckbox, CheckboxTypes.single);
        break;
      case 'group-checkbox':
        this.checkbox_type = CheckboxTypes.group;
        this.resetAndPatchFormValues(
          this.formGroupCheckbox,
          CheckboxTypes.group
        );
        break;
      case 'multi-checkbox':
        this.checkbox_type = CheckboxTypes.multi;
        this.resetAndPatchFormValues(
          this.formMultiCheckbox,
          CheckboxTypes.multi
        );
        break;
      default:
        console.log('Hit default case');
    }
  }

  listOfConfigItems = [
    'size',
    'required',
    'label',
    'desc',
    'hint',
    'error',
    'state'
  ];

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.formCheckbox.addControl(
      this.singleCheckboxConfig.id,
      new FormControl('')
    );

    this.multiCheckboxConfig?.parent?.formGroup.addControl(
      this.multiCheckboxConfig.parent.id,
      new FormControl('')
    );

    this.multiCheckboxConfig.children?.forEach((res) => {
      res.formGroup.addControl(res.id, new FormControl(''));
    });

    this.groupCheckboxConfig.children?.forEach((res) => {
      res.formGroup.addControl(res.id, new FormControl(''));
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

    this.togglesGroupCheckbox.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.formGroupCheckbox.addControl(
          toggle.id,
          new FormControl(toggle.options[1].text)
        );
      }
    });

    this.checkboxesSingle.forEach((checkbox) => {
      this.formCheckbox.addControl(checkbox.id, new FormControl());
    });

    this.checkboxesMulti.forEach((checkbox) => {
      this.formMultiCheckbox.addControl(checkbox.id, new FormControl());
    });

    this.checkboxesGroup.forEach((checkbox) => {
      this.formGroupCheckbox.addControl(checkbox.id, new FormControl());
    });

    this.formCheckbox
      .get(this.checkboxesSingle[0].id)
      ?.valueChanges.subscribe((change) => {
        if (change) {
          this.bannerConfigSingleCheckBox.title = 'General.DisabledBannerTitle';
          this.bannerConfigSingleCheckBox.content =
            'General.DisabledBannerContent';
        } else {
          this.bannerConfigSingleCheckBox.title = 'General.EnabledBannerTitle';
          this.bannerConfigSingleCheckBox.content =
            'General.EnabledBannerContent';
        }
      });

    this.formMultiCheckbox
      .get(this.checkboxesMulti[0].id)
      ?.valueChanges.subscribe((change) => {
        if (change) {
          this.bannerConfigMultiCheckBox.title = 'General.DisabledBannerTitle';
          this.bannerConfigMultiCheckBox.content =
            'General.DisabledBannerContent';
        } else {
          this.bannerConfigMultiCheckBox.title = 'General.EnabledBannerTitle';
          this.bannerConfigMultiCheckBox.content =
            'General.EnabledBannerContent';
        }
      });

    this.formGroupCheckbox
      .get(this.checkboxesGroup[0].id)
      ?.valueChanges.subscribe((change) => {
        if (change) {
          this.bannerConfigGroupCheckBox.title = 'General.DisabledBannerTitle';
          this.bannerConfigGroupCheckBox.content =
            'General.DisabledBannerContent';
        } else {
          this.bannerConfigGroupCheckBox.title = 'General.EnabledBannerTitle';
          this.bannerConfigGroupCheckBox.content =
            'General.EnabledBannerContent';
        }
      });

    this.listOfConfigItems.forEach((configItem) => {
      this.formCheckbox
        .get(configItem)
        ?.valueChanges.subscribe((value: any) => {
          this.parseConfigSingleCheckbox(configItem, value);
        });
    });

    this.listOfConfigItems.forEach((configItem) => {
      this.formMultiCheckbox
        .get(configItem)
        ?.valueChanges.subscribe((value: any) => {
          this.parseConfigMultiCheckbox(configItem, value);
        });
    });

    this.listOfConfigItems.forEach((configItem) => {
      this.formGroupCheckbox
        .get(configItem)
        ?.valueChanges.subscribe((value: any) => {
          this.parseConfigGroupCheckbox(configItem, value);
        });
    });

    //add error if error is selected even when checkbox is clicked
    this.formCheckbox.get(this.singleCheckboxConfig.id)?.valueChanges.subscribe((val : any) => {
      this.determineErrorState(
        this.errorState,
        this.formCheckbox,
        this.singleCheckboxConfig.id,
        CheckboxTypes.single
      );
    })
  }


  /**
   * Reset form and set default values for toggles
   */
  private resetAndPatchFormValues(formGroup : FormGroup, checkbox_type : CheckboxTypes) {
    formGroup.reset()
    if(checkbox_type === 'single') {

      formGroup.patchValue({
        size: 'Small',
        label: 'False',
        hint: 'False',
        desc: 'False',
        required: 'False',
        error: 'None'
      });
    } else {
      formGroup.patchValue({
        size: 'Small',
        label: 'True',
        hint: 'False',
        desc: 'True',
        required: 'True',
        error: 'None'
      });
    }
  }

  /**
   * Parse single checkbox config and update config based on selection made
   * @param type checkbox type, eg: single, multi, group
   * @param value from value change
   */
  private parseConfigSingleCheckbox(type: string, value: any) {
    if (value !== null) {
      switch (type) {
        case 'size':
          this.singleCheckboxConfig = {
            ...this.singleCheckboxConfig,
            size: value.toLowerCase()
          };
          break;
        case 'required':
          this.singleCheckboxConfig = {
            ...this.singleCheckboxConfig,
            required: value === 'True'
          };
          break;
        case 'label':
          this.singleCheckboxConfig = {
            ...this.singleCheckboxConfig,
            label: value === 'True' ? 'Label Text' : undefined
          };
          break;
        case 'desc':
          this.singleCheckboxConfig = {
            ...this.singleCheckboxConfig,
            desc: value === 'True' ? 'Description line of text' : undefined
          };
          break;
        case 'hint':
          this.singleCheckboxConfig = {
            ...this.singleCheckboxConfig,
            hint: value === 'True' ? 'Hint Text' : undefined
          };
          break;
        case 'error':
          this.errorState = value;
          this.determineErrorState(
            this.errorState,
            this.formCheckbox,
            this.singleCheckboxConfig.id,
            CheckboxTypes.single
          );
          break;
        case 'state':
          this.toggleDisabled(
            value,
            this.singleCheckboxConfig.id,
            this.formCheckbox
          );
          //re-set error if error was set before disabled
          if (value === false && this.errorState !== 'None') {
            this.determineErrorState(
              this.errorState,
              this.formCheckbox,
              this.singleCheckboxConfig.id,
              CheckboxTypes.single
            );
          }
          break;
        default:
          console.log('Hit default case');
      }
    }
  }

  /**
   * Parse multi checkbox config and update config based on selection made
   * @param type checkbox type, eg: single, multi, group
   * @param value from value change
   */
  private parseConfigMultiCheckbox(type: string, value: any) {
    if (value !== null) {
      switch (type) {
        case 'size':
          this.multiCheckboxConfig = {
            ...this.multiCheckboxConfig
          };

          if (this.multiCheckboxConfig.parent) {
            this.multiCheckboxConfig.parent = {
              ...this.multiCheckboxConfig?.parent,
              size: value.toLowerCase()
            };
          }

          this.multiCheckboxConfig.children?.forEach((res) => {
            res.size = value.toLowerCase();
          });
          break;
        case 'required':
          if (this.multiCheckboxConfig.parent) {
            this.multiCheckboxConfig.label = {
              ...this.multiCheckboxConfig?.label,
              required: value === 'True'
            };
          }

          break;
        case 'label':
          this.multiCheckboxConfig.label = {
            ...this.multiCheckboxConfig.label,
            label: value === 'True' ? 'Label Text' : undefined
          }
          break;
        case 'desc':
          this.multiCheckboxConfig.label = {
            ...this.multiCheckboxConfig.label,
            desc: value === 'True' ? 'Description line of text' : undefined
          }
          break;
        case 'hint':
          this.multiCheckboxConfig.label = {
            ...this.multiCheckboxConfig.label,
            hint: value === 'True' ? 'Hint Text test' : undefined
          }
          break;
        case 'error':
          this.errorState = value;
          this.determineErrorState(
            this.errorState,
            this.formMultiCheckbox,
            this.multiCheckboxConfig?.parent?.id || '',
            CheckboxTypes.multi
          );
          break;
        case 'state':
          this.toggleDisabled(
            value,
            this.multiCheckboxConfig?.parent?.id || '',
            this.formMultiCheckbox
          );
          this.multiCheckboxConfig.children?.forEach((child) => {
            this.toggleDisabled(value, child.id, this.formMultiCheckbox);
          });

          //re-set error if error was set before disabled
          if (value === false && this.errorState !== 'None') {
            this.determineErrorState(
              this.errorState,
              this.formMultiCheckbox,
              this.multiCheckboxConfig?.parent?.id || '',
              CheckboxTypes.multi
            );
          }
          break;
        default:
          console.log('Hit default case');
      }
    }
  }

  /**
   * Parse group checkbox config and update config based on selection made
   * @param type checkbox type, eg: single, multi, group
   * @param value from value change
   */
  private parseConfigGroupCheckbox(type: string, value: any) {
    if (value !== null) {
      switch (type) {
        case 'size':
          this.groupCheckboxConfig = {
            ...this.groupCheckboxConfig
          };

          this.groupCheckboxConfig.children?.forEach((res) => {
            res.size = value.toLowerCase();
          });
          break;
        case 'required':
          if (this.groupCheckboxConfig.children) {
            this.groupCheckboxConfig.label = {
              ...this.groupCheckboxConfig?.label,
              required: value === 'True'
            };
          }

          break;
        case 'label':
          if (this.groupCheckboxConfig.children) {
            this.groupCheckboxConfig.label = {
              ...this.groupCheckboxConfig?.label,
              label: value === 'True' ? 'Label Text' : undefined
            };
          }
          break;
        case 'desc':
          if (this.groupCheckboxConfig.children) {
            this.groupCheckboxConfig.label = {
              ...this.groupCheckboxConfig?.label,
              desc: value === 'True' ? 'Description line of text' : undefined
            };
          }
          break;
        case 'hint':
          if (this.groupCheckboxConfig.children) {
            if (this.groupCheckboxConfig.children?.length > 0) {
              this.groupCheckboxConfig.label = {
                ...this.groupCheckboxConfig?.label,
                hint: value === 'True' ? 'Hint Text' : undefined
              };
            }
          }
          break;
        case 'error':
          this.errorState = value;
          this.determineErrorState(
            value,
            this.formGroupCheckbox,
            this.groupCheckboxConfig?.parent?.id || '',
            CheckboxTypes.group
          );
          break;
        case 'state':
          this.groupCheckboxConfig.children?.forEach((child) => {
            this.toggleDisabled(value, child.id, this.formGroupCheckbox);
          });

          //re-set error if error was set before disabled
          if (value === false && this.errorState !== 'None') {
            this.determineErrorState(
              this.errorState,
              this.formGroupCheckbox,
              this.groupCheckboxConfig.id,
              CheckboxTypes.group
            );
          }
          break;
        default:
          console.log('Hit default case');
      }
    }
  }


  /**
   * Check Error type and set errors based on type
   * @param errorState current error state
   * @param formGroup Formgroup to be checked
   * @param formID ID of the control that is being checked for error in the formgroup
   * @param checkbox_type checkbox type, example: single, multi, group
  */
  private determineErrorState(errorState: string, formGroup: FormGroup, formID: string, checkbox_type: CheckboxTypes) {
    let errorArray: string[] = [];
    switch (errorState) {
      case 'Single':
        errorArray = ['test'];
        this.setErrors(formGroup, formID, errorArray, checkbox_type);
        break;
      case 'Multiple':
        errorArray = ['test', 'email', 'maxLength'];
        this.setErrors(formGroup, formID, errorArray, checkbox_type);
        break;
      case 'None':
        errorArray = [];
        this.setErrors(formGroup, formID, errorArray, checkbox_type);
        break;
    }
  }


  /**
   * Clear all errors on the component
   */
  private clearErrors(formGroup: FormGroup, formID: string, checkbox_type: CheckboxTypes) {
    if(checkbox_type !== CheckboxTypes.group) {
      formGroup.get(formID)?.setErrors(null);
    }
    if (checkbox_type === CheckboxTypes.multi) {
      this.multiCheckboxConfig.children?.forEach((child) => {
        formGroup.get(child.id)?.setErrors(null);
      });
    } else if (checkbox_type === CheckboxTypes.group) {
      this.groupCheckboxConfig.children?.forEach((child) => {
        formGroup.get(child.id)?.setErrors(null);
      });
    }
  }


  /**
   * Set errors on the form control
   * @param formGroup Formgroup to be checked
   * @param formID ID of the control that is being checked in the formgroup
   * @param errorKeys errors that are being set on the form control
   * @param checkbox_type checkbox type, example: single, multi, group
   */
  private setErrors(formGroup: FormGroup, formID: string, errorKeys: string[],  checkbox_type: CheckboxTypes) {
    const errorVals = {};
    if (errorKeys.length === 0) {
      this.clearErrors(formGroup, formID, checkbox_type);
    } else {
      this.clearErrors(formGroup, formID, checkbox_type);
      errorKeys.forEach((error) => {
        errorVals[error] = true;
      });
      if (checkbox_type !== CheckboxTypes.group) {
        formGroup.get(formID)?.setErrors(errorVals);
        formGroup.get(formID)?.markAsTouched();
      }

      if (checkbox_type === CheckboxTypes.multi) {
        this.multiCheckboxConfig.children?.forEach((child) => {
          formGroup.get(child.id)?.setErrors(errorVals);
          formGroup.get(child.id)?.markAsTouched();
        });
      } else if (checkbox_type === CheckboxTypes.group) {
        this.groupCheckboxConfig.children?.forEach((child) => {
          formGroup.get(child.id)?.setErrors(errorVals);
          formGroup.get(child.id)?.markAsTouched();
        });
      }
    }
  }

  /**
   * Toggle disabled state of checkbox
   */
  private toggleDisabled(
    disabled: boolean,
    currentConfigId: string,
    formType: FormGroup
  ) {
    const checkboxControl: AbstractControl | null =
      formType.get(currentConfigId);
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
}
