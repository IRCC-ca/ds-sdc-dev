import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
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

  constructor(
    private lang: LangSwitchService,
    private translate: TranslateService
  ) {}

  singleCheckboxConfig: ICheckBoxComponentConfig = {
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
    errorMessages: [
      {
        key: 'required',
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
    parent: {
      id: 'parent',
      label: 'Label Text',
      desc: 'Description line of text',
      required: true,
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
        key: 'required',
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
    children: [
      {
        id: 'group-child1',
        formGroup: this.formGroupCheckbox,
        label: 'Label Text test',
        desc: 'Description line of text',
        required: true,
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
        key: 'required',
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
    }
  ];

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
    }
  ];

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
    }
  ];

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

  setCheckboxType(value: any) {
    switch (value) {
      case 'single-checkbox':
        this.checkbox_type = CheckboxTypes.single;
        this.resetAndPatchFormValues(this.formCheckbox, CheckboxTypes.single)
        break;
      case 'group-checkbox':
        this.checkbox_type = CheckboxTypes.group;
        this.resetAndPatchFormValues(this.formGroupCheckbox, CheckboxTypes.group)
        break;
      case 'multi-checkbox':
        this.checkbox_type = CheckboxTypes.multi;
        this.resetAndPatchFormValues(this.formMultiCheckbox, CheckboxTypes.multi)
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
      new FormControl('', {nonNullable: true})
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
          this.bannerConfigSingleCheckBox.content = 'General.DisabledBannerContent';
        } else {
          this.bannerConfigSingleCheckBox.title = 'General.EnabledBannerTitle';
          this.bannerConfigSingleCheckBox.content = 'General.EnabledBannerContent';
        }
      });

    this.formMultiCheckbox
      .get(this.checkboxesMulti[0].id)
      ?.valueChanges.subscribe((change) => {
        if (change) {
          this.bannerConfigMultiCheckBox.title = 'General.DisabledBannerTitle';
          this.bannerConfigMultiCheckBox.content = 'General.DisabledBannerContent';
        } else {
          this.bannerConfigMultiCheckBox.title = 'General.EnabledBannerTitle';
          this.bannerConfigMultiCheckBox.content = 'General.EnabledBannerContent';
        }
      });

      this.formGroupCheckbox
      .get(this.checkboxesGroup[0].id)
      ?.valueChanges.subscribe((change) => {
        if (change) {
          this.bannerConfigGroupCheckBox.title = 'General.DisabledBannerTitle';
          this.bannerConfigGroupCheckBox.content = 'General.DisabledBannerContent';
        } else {
          this.bannerConfigGroupCheckBox.title = 'General.EnabledBannerTitle';
          this.bannerConfigGroupCheckBox.content = 'General.EnabledBannerContent';
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
  }

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

  private parseConfigSingleCheckbox(type: string, value: any) {
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
          helpText: value === 'True' ? 'Hint Text' : undefined
        };
        break;
      case 'error':
        this.determineErrorState(
          value,
          this.formCheckbox,
          this.singleCheckboxConfig.id,
          CheckboxTypes.single
        );
        break;
      case 'state':
        if (value !== undefined) {
          this.toggleDisabled(
            value,
            this.singleCheckboxConfig.id,
            this.formCheckbox
          );
        }
        break;
      default:
        console.log('Hit default case');
    }
  }

  private parseConfigMultiCheckbox(type: string, value: any) {
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
        this.multiCheckboxConfig = {
          ...this.multiCheckboxConfig
        };

        if (this.multiCheckboxConfig.parent) {
          this.multiCheckboxConfig.parent = {
            ...this.multiCheckboxConfig?.parent,
            required: value === 'True'
          };
        }

        break;
      case 'label':
        this.multiCheckboxConfig = {
          ...this.multiCheckboxConfig
        };

        if (this.multiCheckboxConfig.parent) {
          this.multiCheckboxConfig.parent = {
            ...this.multiCheckboxConfig?.parent,
            label: value === 'True' ? 'Label Text' : undefined
          };
        }
        break;
      case 'desc':
        this.multiCheckboxConfig = {
          ...this.multiCheckboxConfig
        };
        if (this.multiCheckboxConfig.parent) {
          this.multiCheckboxConfig.parent = {
            ...this.multiCheckboxConfig?.parent,
            desc: value === 'True' ? 'Description line of text' : undefined
          };
        }
        break;
      case 'hint':
        this.multiCheckboxConfig = {
          ...this.multiCheckboxConfig
        };

        if (this.multiCheckboxConfig.parent) {
          this.multiCheckboxConfig.parent = {
            ...this.multiCheckboxConfig?.parent,
            helpText: value === 'True' ? 'Hint Text' : undefined
          };
        }
        break;
      case 'error':
        this.determineErrorState(
          value,
          this.formMultiCheckbox,
          this.multiCheckboxConfig?.parent?.id || '',
          CheckboxTypes.multi
        );
        break;
      case 'state':
        if (value !== undefined) {
          this.toggleDisabled(
            value,
            this.multiCheckboxConfig?.parent?.id || '',
            this.formMultiCheckbox
          );
          this.multiCheckboxConfig.children?.forEach((child) => {
            this.toggleDisabled(value, child.id, this.formMultiCheckbox);
          });
        }
        break;
      default:
        console.log('Hit default case');
    }
  }

  private parseConfigGroupCheckbox(type: string, value: any) {
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
        if(this.groupCheckboxConfig.children) {
          if (this.groupCheckboxConfig.children?.length > 0) {
            this.groupCheckboxConfig.children[0] = {
              ...this.groupCheckboxConfig.children[0],
              required: value === 'True'
            };
          }
        }
        break;
      case 'label':
        if(this.groupCheckboxConfig.children) {
          if (this.groupCheckboxConfig.children?.length > 0) {
            this.groupCheckboxConfig.children[0] = {
              ...this.groupCheckboxConfig.children[0],
              label: value === 'True' ? 'Label Text' : undefined
            };
          }
        }
        break;
      case 'desc':
        if(this.groupCheckboxConfig.children) {
          if (this.groupCheckboxConfig.children?.length > 0) {
            this.groupCheckboxConfig.children[0] = {
              ...this.groupCheckboxConfig.children[0],
              desc: value === 'True' ? 'Description line of text' : undefined
            };
          }
        }
        break;
      case 'hint':
        if(this.groupCheckboxConfig.children) {
          if (this.groupCheckboxConfig.children?.length > 0) {
            this.groupCheckboxConfig.children[0] = {
              ...this.groupCheckboxConfig.children[0],
              helpText: value === 'True' ? 'Hint Text' : undefined
            };
          }
        }
        break;
      case 'error':
        this.determineErrorState(
          value,
          this.formGroupCheckbox,
          this.groupCheckboxConfig?.parent?.id || '',
          CheckboxTypes.group
        );
        break;
      case 'state':
        if (value !== undefined) {
          this.groupCheckboxConfig.children?.forEach((child) => {
            this.toggleDisabled(value, child.id, this.formGroupCheckbox);
          });
        }
        break;
      default:
        console.log('Hit default case');
    }
  }

  private determineErrorState(value: string, formGroup: FormGroup, formID: string, checkbox_type: CheckboxTypes) {
    let errorArray: string[] = [];
    switch (value) {
      case 'Single':
        errorArray = ['required'];
        this.setErrors(formGroup, formID, errorArray, checkbox_type);
        break;
      case 'Multiple':
        errorArray = ['required', 'email', 'maxLength'];
        this.setErrors(formGroup, formID, errorArray, checkbox_type);
        break;
      case 'None':
        errorArray = [];
        this.setErrors(formGroup, formID, errorArray, checkbox_type);
        break;
    }
  }

  private clearErrors(formGroup: FormGroup, formID: string, checkbox_type: CheckboxTypes) {
    if(checkbox_type !== CheckboxTypes.group) {
      formGroup.get(formID)?.setErrors(null);
    }
    if(checkbox_type === CheckboxTypes.multi) {
      this.multiCheckboxConfig.children?.forEach((child) => {
        formGroup.get(child.id)?.setErrors(null);
      });
    } 
    else if (checkbox_type === CheckboxTypes.group) {
      this.groupCheckboxConfig.children?.forEach((child) => {
        formGroup.get(child.id)?.setErrors(null);
      });
    }
  }

  private setErrors(formGroup: FormGroup, formID: string, errorKeys: string[],  checkbox_type: CheckboxTypes) {
    const errorVals = {};
    if (errorKeys.length === 0) {
      this.clearErrors(formGroup, formID, checkbox_type)
    } 
    else {
      this.clearErrors(formGroup, formID, checkbox_type)
      errorKeys.forEach((error) => {
        errorVals[error] = true;
      });
      if (checkbox_type !== CheckboxTypes.group) {
        formGroup.get(formID)?.setErrors(errorVals);
        formGroup.get(formID)?.markAsTouched();
      }

      if(checkbox_type === CheckboxTypes.multi) {
        this.multiCheckboxConfig.children?.forEach((child) => {
          formGroup.get(child.id)?.setErrors(errorVals);
          formGroup.get(child.id)?.markAsTouched();
        });
      }
      else if(checkbox_type === CheckboxTypes.group) {
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