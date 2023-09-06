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

    console.log("ERRORS::::", this.formCheckbox.get(this.singleCheckboxConfig.id)?.errors)

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
        if (value === 'None') {
          this.singleCheckboxConfig.errorMessages= []
          this.singleCheckboxConfig.formGroup.removeControl(this.singleCheckboxConfig.id);
          this.singleCheckboxConfig.formGroup.addControl(
            this.singleCheckboxConfig.id,
            new FormControl('')
          );
          console.log('Error Array None', this.singleCheckboxConfig)
        }

        else if (value === 'Single') {
          // this.setValidators(this.singleCheckboxConfig.id, this.formCheckbox);
          // this.singleCheckboxConfig.errorMessages= [{ key: 'required', errorLOV: this.translate.instant('ERROR.singleError') }]
          this.formCheckbox.removeControl(this.singleCheckboxConfig.id);
          this.formCheckbox.addControl(
            this.singleCheckboxConfig.id,
            new FormControl('', [Validators.required])
            );
            this.formCheckbox.get(this.singleCheckboxConfig.id)?.setErrors({'required': false})
            console.log("ERRORS::Single:before:", this.formCheckbox.get(this.singleCheckboxConfig.id)?.errors)
            // this.formCheckbox.get(this.singleCheckboxConfig.id)?.updateValueAndValidity();
            // console.log("ERRORS::Single:after:", this.formCheckbox.get(this.singleCheckboxConfig.id)?.errors)


            if (!this.formCheckbox.get(this.singleCheckboxConfig.id)?.touched){
              this.formCheckbox.get(this.singleCheckboxConfig.id)?.markAsTouched();
            }
            console.log('SingleError', this.singleCheckboxConfig)
          }
          else if (value === 'Multiple') {
            this.formCheckbox.get(this.singleCheckboxConfig.id)?.setErrors({ 'required': true})
            console.log("ERRORS::::", this.formCheckbox.get(this.singleCheckboxConfig.id)?.errors)

            // const currentErrors = this.formCheckbox.get(this.singleCheckboxConfig.id)?.errors;
            // console.log("current errors", currentErrors)
            // if (currentErrors && currentErrors['required']) {
            //   delete currentErrors['required'];
            //   this.formCheckbox.get(this.singleCheckboxConfig.id)?.setErrors(Object.keys(currentErrors).length === 0 ? null : currentErrors);
            // }
            this.formCheckbox.get(this.singleCheckboxConfig.id)?.markAsTouched();
            console.log('MultipleError', this.singleCheckboxConfig)
          }
          break;
        // else if (value === 'Multiple') {
        //   // this.singleCheckboxConfig.errorMessages= [
        //   //   { key: 'required', errorLOV: this.translate.instant('ERROR.singleError') },
        //   //   { key: 'email', errorLOV: this.translate.instant('ERROR.additionalError') },
        //   //   { key: 'email', errorLOV: this.translate.instant('ERROR.additionalError') }
        //   // ];

        //   // this.formCheckbox.removeControl(this.singleCheckboxConfig.id);
        //   // this.formCheckbox.addControl(
        //   //   this.singleCheckboxConfig.id,
        //   //   new FormControl('')
        //   // )

        //   // this.formCheckbox.get(this.singleCheckboxConfig.id)?.setErrors({ required: true, maxLength: 3 })
        //   this.formCheckbox.get(this.singleCheckboxConfig.id)?.setErrors({ required: true})

        //   // Remove the 'required' error
        //   // const currentErrors = this.formCheckbox.get(this.singleCheckboxConfig.id)?.errors;
        //   // console.log("current errors", currentErrors)
        //   // if (currentErrors && currentErrors['required']) {
        //   //   delete currentErrors['required'];
        //   //   this.formCheckbox.get(this.singleCheckboxConfig.id)?.setErrors(Object.keys(currentErrors).length === 0 ? null : currentErrors);
        //   // }
        //   // this.formCheckbox.get(this.singleCheckboxConfig.id)?.setErrors({'required': true})
        //   // this.formCheckbox.get(this.singleCheckboxConfig.id)?.setErrors({'email': null})
        //   console.log("ERRORS::::", this.formCheckbox.get(this.singleCheckboxConfig.id)?.errors)


        //   this.formCheckbox.get(this.singleCheckboxConfig.id)?.markAsTouched();
          
        //   console.log('MultipleError', this.singleCheckboxConfig)
        // }
        // break;
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

  // private setValidators(id : string, formName : FormGroup) {
  //   formName.removeControl(id);
  //   formName.addControl(
  //     id,
  //     new FormControl('', [Validators.required])
  //   );
  // }

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
  // private parseToggleConfigSingleCheckbox(value: any) {
  //   switch (this.errorState) {
  //     case 'Single':
  //       this.checkboxConfigSingleError = {
  //         ...this.checkboxConfigSingleError,
  //         size: value['size'].toLowerCase(),
  //         required: value['required'] === 'True',
  //         label:
  //           value['label'] === 'True' ? 'Label Text' : undefined,
  //         desc:
  //           value['desc'] === 'True' ? 'Description line of text' : undefined,
  //         helpText:
  //           value['hint'] === 'True' ? 'Hint Text' : undefined,
  //       };
  //       break;
  //     case 'Multiple':
  //       console.log('Multiple')
  //       this.checkboxConfigMultiErrors = {
  //         ...this.checkboxConfigMultiErrors,
  //         size: value['size'].toLowerCase(),
  //         required: value['required'] === 'True',
  //         label:
  //           value['label'] === 'True' ? 'Label Text' : undefined,
  //         desc:
  //           value['desc'] === 'True' ? 'Description line of text' : undefined,
  //         helpText:
  //           value['hint'] === 'True' ? 'Hint Text' : undefined,
  //       };
  //       break;
  //     default:
  //       this.singleCheckboxConfig = {
  //         ...this.singleCheckboxConfig,
  //         size: value['size'].toLowerCase(),
  //         required: value['required'] === 'True',
  //         label:
  //           value['label'] === 'True' ? 'Label Text' : undefined,
  //         desc:
  //           value['desc'] === 'True' ? 'Description line of text' : undefined,
  //         helpText:
  //           value['hint'] === 'True' ? 'Hint Text' : undefined,
  //       };
  //       console.log('Single checkbox config', this.singleCheckboxConfig)
  //   }
  // }

  /**
   * Set input field as touched, toggle error states of input
   */
  // private toggleErrors(error: string) {
  //   if (!this.formCheckbox.get(this.currentConfigId)?.touched && error !== 'None')
  //     this.formCheckbox.get(this.currentConfigId)?.markAsTouched();

  //   this.errorState = error;
  //   switch (error) {
  //     case 'None':
  //       this.currentConfigId = this.singleCheckboxConfig.id;
  //       break;
  //     case 'Single':
  //       this.currentConfigId = this.checkboxConfigSingleError.id;
  //       if (!this.formCheckbox.get(this.currentConfigId)?.touched)
  //         this.formCheckbox.get(this.currentConfigId)?.markAsTouched();
  //       break;
  //     case 'Multiple':
  //       this.currentConfigId = this.checkboxConfigMultiErrors.id;
  //       if (!this.formCheckbox.get(this.currentConfigId)?.touched)
  //         this.formCheckbox.get(this.currentConfigId)?.markAsTouched();
  //       break;
  //   }
  // }
}
