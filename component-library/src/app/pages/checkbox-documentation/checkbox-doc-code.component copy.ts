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
  }


  checkboxConfigSingleError: ICheckBoxComponentConfig = {
    ...this.checkboxConfig,
    id: 'checkbox_error_single',
    required: true,
    errorMessages: [{ key: 'required', errorLOV: this.translate.instant('ERROR.singleError') }]
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

    this.togglesSingleCheckbox.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.formCheckbox.addControl(
          toggle.id,
          new FormControl(toggle.options[1].text)
        );
      }
    });

    this.checkboxesSingle.forEach((checkbox) => {
      this.formCheckbox.addControl(checkbox.id, new FormControl());
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


    this.formCheckbox.patchValue({
      size: 'Small',
      label: 'True',
      hint: 'False',
      desc: 'True',
      required: 'True',
      error: 'None'
    });

    this.formCheckbox.valueChanges.subscribe((value: any) => {
      if (value['error'] !== this.errorState) this.toggleErrors(value['error']);
      if (value['state'] !== undefined) {
        this.toggleDisabled(value['state'], this.checkboxConfig.id, this.formCheckbox);
        // this.state = value['state'];
      }
      this.parseToggleConfigSingleCheckbox(value);
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
      // console.log("Abstract:", checkboxControl)
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

  /**
   * Set input field as touched, toggle error states of input
   */
  private toggleErrors(error: string) {
    if (!this.formCheckbox.get(this.currentConfigId)?.touched && error !== 'None')
      this.formCheckbox.get(this.currentConfigId)?.markAsTouched();

    this.errorState = error;
    switch (error) {
      case 'None':
        this.currentConfigId = this.checkboxConfig.id;
        break;
      case 'Single':
        this.currentConfigId = this.checkboxConfigSingleError.id;
        if (!this.formCheckbox.get(this.currentConfigId)?.touched)
          this.formCheckbox.get(this.currentConfigId)?.markAsTouched();
        break;
      case 'Multiple':
        this.currentConfigId = this.checkboxConfigMultiErrors.id;
        if (!this.formCheckbox.get(this.currentConfigId)?.touched)
          this.formCheckbox.get(this.currentConfigId)?.markAsTouched();
        break;
    }
  }
}
