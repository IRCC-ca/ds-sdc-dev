import { LanguageSwitchService } from '../@shared/language-switch/language-switch.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ButtonColor,
  ButtonIconDirection,

  IBannerConfig,

  IButtonConfig,

  ICTAConfig,

  IDatePickerConfig,
  IDropdownConfig,
  IIconButtonComponentConfig,
  IIconButtonIconConfig,
  IInputComponentConfig,
  IRadioInputComponentConfig,
  ITabNavConfig,
  ITextareaComponentConfig
} from 'ircc-ds-angular-component-library';
import {
  IAutoTestComponentConfig,
  IAutoTestConfigObject
} from '../auto-tester/auto-tester.component';

export enum InputFieldType {
  INPUTFIELD = 'qaInput',
  TEXTAREA = 'qaTextareaInput',
  DATEPICKER = 'qaDatePicker'
}

@Component({
  selector: 'app-naseer',
  templateUrl: './naseer.component.html',
  styleUrls: ['./naseer.component.scss']
})
export class NaseerComponent implements OnInit {
  showInputComponent: boolean = false;
  showTextareaComponent: boolean = false;
  showDropDownComponent: boolean = false;
  showIconButtonComponent: boolean = false;
  showDatePickerComponent: boolean = false;
  showInteractiveBannerComponent: boolean = false;

  INPUT_ID = 'qa_test_input';
  form_input = new FormGroup({});
  form_textarea = new FormGroup({});
  form_date_picker = new FormGroup({});

  qaInput: IInputComponentConfig = {
    id: this.INPUT_ID,
    formGroup: this.form_input
  };

  qaTextareaInput: ITextareaComponentConfig = {
    id: this.INPUT_ID,
    formGroup: this.form_textarea,
    errorMessages: [
      { key: 'invalid', errorLOV: 'ERROR.fieldIsInvalid' },
      { key: 'testingError', errorLOV: 'ERROR.testErrorMessage' },
      { key: 'maxlength', errorLOV: 'ERROR.fieldExceededMaxLength' }
    ]
  };

  qaDateOfBirthDatePickerConfig: IDatePickerConfig = {
    id: this.INPUT_ID,
    formGroup: this.form_date_picker,
    label: 'label text',
    desc: 'description text',
    hint: 'hint text',
    required: true,
    maxYear: 2040,
    minYear: 2010,
    size: 'small',
    unknownDateToggle: {
      dayUnknown: true,
      monthUnknown: true,
      yearUnknown: true
    },
    errorMessages: {
      general: [
        {
          key: 'required',
          errorLOV: 'ACC_DEMO.ERRORS.DOB_REQUIRED'
        },
        {
          key: 'required',
          errorLOV: 'ERROR.testErrorMessage'
        },
        {
          key: 'required',
          errorLOV: 'ERROR.testErrorMessage'
        }
      ]
    }
  };

  qaDateOfBirthDatePickerConfig2: IDatePickerConfig = {
    id: this.INPUT_ID,
    formGroup: this.form_date_picker,
    label: 'label text',
    desc: 'description text',
    hint: 'hint text',
    size: 'large',
    required: true,
    unknownDateToggle: {
      dayUnknown: true,
      monthUnknown: true,
      yearUnknown: true
    },
    errorMessages: {
      general: [
        {
          key: 'required',
          errorLOV: 'ACC_DEMO.ERRORS.DOB_REQUIRED'
        },
        {
          key: 'required',
          errorLOV: 'ERROR.testErrorMessage'
        },
        {
          key: 'required',
          errorLOV: 'ERROR.testErrorMessage'
        }
      ]
    }
  };

  qaButton: IIconButtonComponentConfig = {
    id: 'qa_test_button',
    size: 'large',
    category: 'custom',
    icon: {
      class: 'fa-solid fa-mustache',
      color: 'var(--primary-text)'
    }
  };

  testButtonConfig: IButtonConfig = {
    id: 'qa_button',
    icon: 'fa-solid fa-mustache',
    iconDirection: 'right'
  };

  customIconConfigTest: IIconButtonIconConfig = {
    class: 'fa-regular fa-igloo',
    color: 'var(--critical-text)'
  };

  testDropdownConfig: IDropdownConfig = {
    id: 'qaDropdown',
    category: 'secondary',
    label: 'Secondary',
    size: 'large',
    icon: {
      class: 'fa-light fa-heart'
    }
  };

  testerConfigInput: IAutoTestConfigObject = {
    inputs: [
      {
        id: 'label',
        formGroup: this.form_input,
        label: 'label/Title'
      },
      {
        id: 'desc',
        formGroup: this.form_input,
        label: 'description'
      },
      {
        id: 'hint',
        formGroup: this.form_input,
        label: 'hint'
      },
      {
        id: 'placeholder',
        formGroup: this.form_input,
        label: 'Placeholder text'
      }
    ],
    checkboxes: [
      {
        id: 'required',
        formGroup: this.form_input,
        inlineLabel: 'required'
      }
    ],
    selects: [
      {
        id: 'type',
        label: 'Type',
        formGroup: this.form_input,
        options: [
          {
            text: 'text'
          },
          {
            text: 'password'
          }
        ]
      },
      {
        id: 'size',
        label: 'Size',
        formGroup: this.form_input,
        options: [
          {
            text: 'small'
          },
          {
            text: 'large'
          }
        ]
      }
    ]
  };

  testerConfigTextarea: IAutoTestConfigObject = {
    inputs: [
      {
        id: 'label',
        formGroup: this.form_textarea,
        label: 'label/Title'
      },
      {
        id: 'desc',
        formGroup: this.form_textarea,
        label: 'description'
      },
      {
        id: 'hint',
        formGroup: this.form_textarea,
        label: 'hint'
      },
      {
        id: 'placeholder',
        formGroup: this.form_textarea,
        label: 'Placeholder text'
      },
      {
        id: 'charLimit',
        formGroup: this.form_textarea,
        label: 'Character Limit'
      }
    ],
    checkboxes: [
      {
        id: 'required',
        formGroup: this.form_textarea,
        inlineLabel: 'required'
      }
    ],
    selects: [
      {
        id: 'size',
        label: 'Size',
        formGroup: this.form_textarea,
        options: [
          {
            text: 'small'
          },
          {
            text: 'large'
          }
        ]
      },
      {
        id: 'resizable',
        label: 'Resizable',
        formGroup: this.form_textarea,
        options: [
          {
            text: 'vertical'
          },
          {
            text: 'horizontal'
          },
          {
            text: 'both'
          },
          {
            text: 'none'
          }
        ]
      }
    ]
  };

  testInputComponentConfig: IAutoTestComponentConfig = {
    id: 'naseer_input_tester',
    formGroup: this.form_input,
    testFields: this.testerConfigInput
  };

  testTextareaComponentConfig: IAutoTestComponentConfig = {
    id: 'naseer_textarea_tester',
    formGroup: this.form_textarea,
    testFields: this.testerConfigTextarea
  };

  constructor(private altLang: LanguageSwitchService) { }


  form_interactive_banner = new FormGroup({});

  demoTabsConfig: ITabNavConfig = {
    id: 'demoTabs',
    tab: [
      {
        id: 'info',
        title: 'Info',
      },
      {
        id: 'warning',
        title: 'Warning'
      },
      {
        id: 'critical',
        title: 'Critical'
      },
      {
        id: 'success',
        title: 'Success'
      },
      {
        id: 'generic',
        title: 'Generic',
      }
    ]
  };

  bannerConfig: IBannerConfig = {
    id: 'banner',
    title: 'Title text',
    type: 'warning',
    dismissible: true,
    content: 'Description text lorem ipsum dolor sit amet consecteteur adipiscing elit.',
    cta: [
      {
        text: 'Primary',
        type: 'button',
        btnConfig: {
          id: 'cta1',
          category: 'primary'
        }
      },
      {
        text: 'Secondary',
        type: 'button',
        btnConfig: {
          id: 'cta1',
          category: 'secondary'
        }
      },
      {
        text: 'Plain',
        type: 'button',
        btnConfig: {
          id: 'ctaPlain',
          category: 'plain'
        }
      },
      {
        text: 'Link',
        type: 'link',
        // btnConfig: {
        //   id: 'cta1',
        //   category: 'plain'
        // }
      }
    ]
  };

  addItemtoCTAList(text : string){

    const plainExample : ICTAConfig = {
      text: 'Plain',
      type: 'button',
      btnConfig: {
        id: 'ctaPlain',
        category: 'plain'
      }
    }

    const secondaryExample : ICTAConfig = {
      text: 'Secondary',
      type: 'button',
      btnConfig: {
        id: 'ctaSecondary',
        category: 'secondary'
      }
    }

    const primaryExample  : ICTAConfig = {
      text: 'Primary',
      type: 'button',
      btnConfig: {
        id: 'ctaPrimary',
        category: 'primary'
      }
    }

    const linkExample : ICTAConfig = {
      text: 'Link',
      type: 'link',
    }

    const indexOfObject : any = this.bannerConfig?.cta?.findIndex((object) => {
      return object.text === text;
    });
    
    if (indexOfObject == -1) {
      if(text === "Primary") this.bannerConfig?.cta?.push(primaryExample);
      else if(text === "Secondary") this.bannerConfig?.cta?.push(secondaryExample);
      else if(text === "Plain") this.bannerConfig?.cta?.push(plainExample);
      else if(text === "Link") this.bannerConfig?.cta?.push(linkExample);
    }
  }

  removeItemFromCTAList(text : string){
    const indexOfObject : any = this.bannerConfig?.cta?.findIndex((object) => {
      return object.text === text;
    });
    
    if (indexOfObject !== -1) {
      this.bannerConfig?.cta?.splice(indexOfObject, 1);
    }
  }

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'sizeToggle',
      formGroup: this.form_interactive_banner,
      label: 'Size',
      options: [
        {
          text: 'Small'
        },
        {
          text: 'Large'
        }
      ]
    },
    {
      id: 'showDescToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show description',
      options: [
        {
          text: 'True',
        },
        {
          text: 'False'
        }
      ]
    },
    {
      id: 'showPrimaryToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show primary button',
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
      id: 'showPlainToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show plain button',
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
      id: 'showSecondaryToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show secondary button',
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
      id: 'showTitleToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show title',
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
      id: 'showCloseToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show close',
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
      id: 'showLinkToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show link',
      options: [
        {
          text: 'True'
        },
        {
          text: 'False'
        }
      ]
    },

  ]

  ngOnInit() {
    this.altLang.setAltLangLink('naseer-alt');

    this.toggles.forEach(toggle => {
      console.log("toggle:=", toggle)
      if (toggle.options && toggle.options[0].text){
        this.form_interactive_banner.addControl(toggle.id, new FormControl(toggle.options[0].text))
      }
    });



    this.form_interactive_banner.valueChanges.subscribe((value) => {
      console.log("X->", value)
      for (const param in value) {
        switch(param){
          case 'sizeToggle':
            this.bannerConfig.size =  (value['sizeToggle']).toLowerCase()
            break
            case 'showDescToggle':
              console.log("showDescToggle ->", value['showDescToggle'])
              if(value['showDescToggle'] === 'True') {
                this.bannerConfig.content='Description text lorem ipsum dolor sit amet consecteteur adipiscing elit.';
              }
              else {
                this.bannerConfig.content = '';
              }
              break
            case 'showPrimaryToggle':
              if(value['showPrimaryToggle'] === 'True') {
                this.addItemtoCTAList("Primary")
              }
              else {
                this.removeItemFromCTAList("Primary")
              }
              break
            case 'showPlainToggle':
              if(value['showPlainToggle'] === 'True') {
                this.addItemtoCTAList("Plain")
              }
              else {
                this.removeItemFromCTAList("Plain")
              }
              break
            case 'showSecondaryToggle':
              if(value['showSecondaryToggle'] === 'True') {
                this.addItemtoCTAList("Secondary")
              }
              else {
                this.removeItemFromCTAList('Secondary')
              }
              break
            case 'showTitleToggle':
              if(value['showTitleToggle'] === 'True') {
                this.bannerConfig.title='Title text';
              }
              else {
                this.bannerConfig.title = ''
              }
              break
            case 'showCloseToggle':
              if(value['showCloseToggle'] === 'True') {
                this.bannerConfig.dismissible = true;
              }
              else {
                this.bannerConfig.dismissible = false;
              }
              break
            case 'showLinkToggle':
              if(value['showLinkToggle'] === 'True') {
                this.addItemtoCTAList("Link")
              }
              else {
                this.removeItemFromCTAList("Link")
              }
              break
          default:{
            console.log("default")
          }
        }
      }
    });

    //******************************************************************************************************** */
    //********************************* Input Component Tester *********************************************** */
    //******************************************************************************************************** */

    this.testerConfigInput.selects?.forEach((i) => {
      this.form_input.addControl(i.id, new FormControl());
    });
    this.testerConfigInput.checkboxes?.forEach((i) => {
      this.form_input.addControl(i.id, new FormControl());
    });
    this.testerConfigInput.inputs?.forEach((i) => {
      this.form_input.addControl(i.id, new FormControl());
    });

    this.form_input.addControl(this.qaInput.id, new FormControl());
    this.form_input.valueChanges.subscribe((x) => {
      let updatedConfig: IInputComponentConfig = {
        id: this.INPUT_ID,
        formGroup: this.form_input
      };
      if (!x['type']) x['type'] = 'text';
      for (const param in x) {
        updatedConfig = { ...updatedConfig, [param]: x[param] };
        this.qaInput = updatedConfig;
      }
    });

    //*********************************************************************************************************** */
    //********************************* Textarea Component Tester *********************************************** */
    //*********************************************************************************************************** */

    this.testerConfigTextarea.selects?.forEach((i) => {
      this.form_textarea.addControl(i.id, new FormControl());
    });
    this.testerConfigTextarea.checkboxes?.forEach((i) => {
      this.form_textarea.addControl(i.id, new FormControl());
    });
    this.testerConfigTextarea.inputs?.forEach((i) => {
      this.form_textarea.addControl(i.id, new FormControl());
    });

    this.form_textarea.addControl(this.qaTextareaInput.id, new FormControl());
    this.form_textarea.valueChanges.subscribe((x) => {
      let updatedConfig: IInputComponentConfig = {
        id: this.INPUT_ID,
        formGroup: this.form_textarea,
        errorMessages: this.qaTextareaInput.errorMessages
      };
      if (!x['type']) x['type'] = 'text';
      for (const param in x) {
        updatedConfig = { ...updatedConfig, [param]: x[param] };
        this.qaTextareaInput = updatedConfig;
      }
    });

    //******************************************************************************************************** */
    //********************************* DatePicker Component Tester *********************************************** */
    //******************************************************************************************************** */
    this.form_date_picker.addControl(
      this.qaDateOfBirthDatePickerConfig.id + '_dayControl',
      new FormControl('', Validators.required)
    );
    this.form_date_picker.addControl(
      this.qaDateOfBirthDatePickerConfig.id + '_monthControl',
      new FormControl('', Validators.required)
    );
    this.form_date_picker.addControl(
      this.qaDateOfBirthDatePickerConfig.id + '_yearControl',
      new FormControl('', Validators.required)
    );
  }

  buttonActions(actionType: string) {
    switch (actionType) {
      case 'inputComponent':
        this.showInputComponent = true;
        this.showTextareaComponent = false;
        this.showDropDownComponent = false;
        this.showIconButtonComponent = false;
        this.showDatePickerComponent = false;
        this.showInteractiveBannerComponent = false;
        break;
      case 'textareaComponent':
        this.showInputComponent = false;
        this.showTextareaComponent = true;
        this.showDropDownComponent = false;
        this.showIconButtonComponent = false;
        this.showDatePickerComponent = false;
        this.showInteractiveBannerComponent = false;
        break;
      case 'datepickerComponent':
        this.showInputComponent = false;
        this.showTextareaComponent = false;
        this.showDropDownComponent = false;
        this.showIconButtonComponent = false;
        this.showDatePickerComponent = true;
        this.showInteractiveBannerComponent = false;
        break;
      case 'dropDownComponent':
        this.showInputComponent = false;
        this.showTextareaComponent = false;
        this.showDropDownComponent = true;
        this.showIconButtonComponent = false;
        this.showDatePickerComponent = false;
        this.showInteractiveBannerComponent = false;
        break;
      case 'iconButtonComponent':
        this.showInputComponent = false;
        this.showTextareaComponent = false;
        this.showDropDownComponent = false;
        this.showIconButtonComponent = true;
        this.showDatePickerComponent = false;
        this.showInteractiveBannerComponent = false;
        break;
      case 'interactiveBanner':
        this.showInputComponent = false;
        this.showTextareaComponent = false;
        this.showDropDownComponent = false;
        this.showIconButtonComponent = false;
        this.showDatePickerComponent = false;
        this.showInteractiveBannerComponent = true;
        break;
      case 'inputError':
        this.form_textarea.get(this.qaTextareaInput.id)?.valid
          ? this.form_textarea
            .get(this.qaTextareaInput.id)
            ?.setErrors({ invalid: true })
          : this.form_textarea.get(this.qaTextareaInput.id)?.reset();

        this.form_textarea.updateValueAndValidity();
        break;
      case 'setInputError':
        this.form_textarea.get(this.qaTextareaInput.id)?.setErrors({
          invalid: true,
          testingError: true,
          maxlength: { requiredLength: 3, actualLength: 5 }
        });
        this.form_textarea.updateValueAndValidity();
        break;
      case 'removeInputError':
        this.form_textarea
          .get(this.qaTextareaInput.id)
          ?.setErrors({ errors: null });
        this.form_textarea.updateValueAndValidity();
        break;
      case 'disable-input':
        this.qaInput?.formGroup.get(this.qaInput.id)?.disabled
          ? this.qaInput?.formGroup.get(this.qaInput.id)?.enable()
          : this.qaInput?.formGroup.get(this.qaInput.id)?.disable();
        break;
      case 'disable-textarea':
        this.qaTextareaInput?.formGroup.get(this.qaTextareaInput.id)?.disabled
          ? this.qaTextareaInput?.formGroup
            .get(this.qaTextareaInput.id)
            ?.enable()
          : this.qaTextareaInput?.formGroup
            .get(this.qaTextareaInput.id)
            ?.disable();
        break;
      case 'setErrorDate':
        this.form_date_picker.markAllAsTouched();
        break;
      case 'removeErrorDate':
        this.form_date_picker.markAsUntouched();
        break;
      case 'setErrorDate':
        this.form_date_picker.markAllAsTouched();
        break;
      case 'removeErrorDate':
        this.form_date_picker.markAsUntouched();
        break;
    }
  }

  disable() {
    if (!this.testButtonConfig?.disabled) this.testButtonConfig.disabled = true;
    else this.testButtonConfig.disabled = false;
  }
}
