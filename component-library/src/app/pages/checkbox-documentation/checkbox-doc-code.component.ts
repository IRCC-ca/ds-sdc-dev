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
    errorMessages:[
      { key: 'required', errorLOV: this.translate.instant('ERROR.singleError') },
      { key: 'email', errorLOV: this.translate.instant('ERROR.additionalError') },
      { key: 'email2', errorLOV: this.translate.instant('ERROR.additionalError') }
    ]
  }
  
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

  // errorState = 'None';
  // currentConfigId = this.singleCheckboxConfig.id;
  listOfConfigItems = ['size', 'required', 'label', 'desc', 'hint', 'error', 'state']

  
  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.formCheckbox.addControl(this.singleCheckboxConfig.id, new FormControl());

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

    // this.formCheckbox.get(this.checkboxesSingle[0].id)
    // ?.valueChanges.subscribe((change) => {
    //   if (change) {
    //     this.bannerConfig.title='General.DisabledBannerTitle'
    //     this.bannerConfig.content="General.DisabledBannerContent"
    //   } else {
    //     this.bannerConfig.title='General.EnabledBannerTitle'
    //     this.bannerConfig.content="General.EnabledBannerContent"
    //   }
    // });


    this.formCheckbox.patchValue({
      size: 'Small',
      label: 'True',
      hint: 'False',
      desc: 'True',
      required: 'True',
      error: 'None'
    });

    // this.formCheckbox.valueChanges.subscribe((value: any) => {
    //   if (value['error'] !== this.errorState) this.toggleErrors(value['error']);
    //   if (value['state'] !== undefined) {
    //     this.toggleDisabled(value['state'], this.checkboxConfig.id, this.formCheckbox);
    //     // this.state = value['state'];
    //   }
    //   this.parseToggleConfigSingleCheckbox(value);
    //   // this.parseCodeViewConfig();
    // });

    this.listOfConfigItems.forEach((configItem) => {
      this.formCheckbox.get(configItem)?.valueChanges.subscribe((value : any) => {
        this.parseConfigSingleCheckbox(configItem, value)
      });
    })
  }

  private parseConfigSingleCheckbox (type : string, value : any) {
    switch (type) {
      case 'size':
        this.singleCheckboxConfig = {
          ...this.singleCheckboxConfig,
          size: value.toLowerCase(),
        };
        break;
      case 'required':
        this.singleCheckboxConfig = {
          ...this.singleCheckboxConfig,
          required: value === 'True',
        };
        break;
      case 'label':
        this.singleCheckboxConfig = {
          ...this.singleCheckboxConfig,
          label: value === 'True' ? 'Label Text' : undefined,

        };
        break;
      case 'desc':
        this.singleCheckboxConfig = {
          ...this.singleCheckboxConfig,
          desc: value === 'True' ? 'Description line of text' : undefined,
        };
        break;
      case 'hint':
        this.singleCheckboxConfig = {
          ...this.singleCheckboxConfig,
          helpText: value === 'True' ? 'Hint Text' : undefined,
        };
        break;
      case 'error':
        this.determineErrorState(value, this.formCheckbox, this.singleCheckboxConfig.id)
        break;
      case 'state':
        console.log("State", value)
        if(value !== undefined) {
          console.log("Disable")
          this.toggleDisabled(value, this.singleCheckboxConfig.id, this.formCheckbox);
        }
        break;
      default: 
        console.log("Hit default case")
    }
  }

  

  determineErrorState(value: string, formGroup: FormGroup, formID: string) {
    let errorArray: string[] = [];
    switch (value) {
      case 'Single':
        errorArray = ['required']
        console.log("single Error")
        this.setErrors(formGroup, formID, errorArray)
        break;
      case 'Multiple':
        console.log("Mulit Error")
        errorArray = ['required', 'email', 'email2']
        this.setErrors(formGroup, formID, errorArray)
        break;
      case 'None':
        console.log("No Error")
        errorArray = []
        this.setErrors(formGroup, formID, errorArray)
        break;
    }
  }

  setErrors(formGroup: FormGroup, formID: string, errorKeys: string[]) {
    console.log("errorKeys--->", errorKeys)
    let errorVals = {};
    if (errorKeys.length === 0) {
      formGroup.get(formID)?.setErrors(null);
    } else {
      errorKeys.forEach(error => {
        errorVals[error] = true
      });
      formGroup.get(formID)?.setErrors(errorVals);
      formGroup.get(formID)?.markAsTouched();
    }
    console.log('for errors:', formGroup.get(formID)?.errors)
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
}
