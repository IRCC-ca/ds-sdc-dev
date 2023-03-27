import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { ButtonColor, ButtonIconDirection, IButtonConfig, IDatePickerConfig, IDropdownConfig, IIconButtonComponentConfig, IIconButtonIconConfig, IInputComponentConfig, ITextareaComponentConfig } from 'ircc-ds-angular-component-library';
import { IAutoTestComponentConfig, IAutoTestConfigObject } from '../auto-tester/auto-tester.component';

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

  INPUT_ID = 'qa_test_input';
  form_input = new FormGroup({});
  form_textarea = new FormGroup({});
  form_date_picker = new FormGroup({});

  qaInput : IInputComponentConfig = {
    id: this.INPUT_ID,
    formGroup: this.form_input
  };

  qaTextareaInput : ITextareaComponentConfig = {
    id: this.INPUT_ID,
    formGroup: this.form_textarea,
    errorMessages: [
      {key: 'invalid', errorLOV: 'ERROR.fieldIsInvalid'},
      {key: 'testingError', errorLOV: 'ERROR.testErrorMessage'},
      {key: 'maxlength' , errorLOV: 'ERROR.fieldExceededMaxLength'},
    ]
  };

  qaDateOfBirthDatePickerConfig: IDatePickerConfig = {
    id: this.INPUT_ID,
    formGroup: this.form_date_picker,
    maxYear: 2040,
    minYear: 2010,
    size: 'small',
    unknownDateToggle: {
      dayUnknown: true,
      yearUnknown: true
    }
  };

  qaButton : IIconButtonComponentConfig = {
    id: "qa_test_button",
    size: 'large',
    category: 'custom',
    icon:  {
      class: 'fa-solid fa-mustache',
      color: 'var(--primary-text)'
    }
  };

  testButtonConfig : IButtonConfig = {
    id: "qa_button",
    icon: 'fa-solid fa-mustache',
    iconDirection: 'right',
  };

  customIconConfigTest : IIconButtonIconConfig = {
    class: 'fa-regular fa-igloo',
    color: 'var(--critical-text)'
  }

  testDropdownConfig : IDropdownConfig = {
    id: "qaDropdown",
    category: 'secondary',
    label: "Secondary",
    size: 'large',
    icon:  {
      class: 'fa-light fa-heart',
    }

  }

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
      },
    ],
    checkboxes: [
      {
        id: 'required',
        formGroup: this.form_input,
        inlineLabel: 'required'
      },
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
      },
    ]
  }

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
      },
    ],
    checkboxes: [
      {
        id: 'required',
        formGroup: this.form_textarea,
        inlineLabel: 'required'
      },
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
          },
        ]
      }
    ]
  }

  testerConfigDatePicker: IAutoTestConfigObject = {
    inputs: [
      {
        id: 'label',
        formGroup: this.form_date_picker,
        label: 'label/Title'
      },
      {
        id: 'desc',
        formGroup: this.form_date_picker,
        label: 'description'
      },
      {
        id: 'hint',
        formGroup: this.form_date_picker,
        label: 'hint'
      },
    ],
    checkboxes: [
      {
        id: 'required',
        formGroup: this.form_date_picker,
        inlineLabel: 'required'
      },
    ],
    selects: [
      {
        id: 'size',
        label: 'Size',
        formGroup: this.form_date_picker,
        options: [
          {
            text: 'small'
          },
          {
            text: 'large'
          }
        ]
      },
    ]
  }

  testInputComponentConfig: IAutoTestComponentConfig = {
    id: 'naseer_input_tester',
    formGroup: this.form_input,
    testFields: this.testerConfigInput
  }

  testTextareaComponentConfig: IAutoTestComponentConfig = {
    id: 'naseer_textarea_tester',
    formGroup: this.form_textarea,
    testFields: this.testerConfigTextarea
  }

  testDatePickerComponentConfig: IAutoTestComponentConfig = {
    id: 'naseer_datepicker_tester',
    formGroup: this.form_date_picker,
    testFields: this.testerConfigDatePicker
  }




  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('naseer-alt');

    //******************************************************************************************************** */
    //********************************* Input Component Tester *********************************************** */
    //******************************************************************************************************** */

    this.testerConfigInput.selects?.forEach(i => {
      this.form_input.addControl(i.id, new FormControl());

    });
    this.testerConfigInput.checkboxes?.forEach(i => {
      this.form_input.addControl(i.id, new FormControl());
    });
    this.testerConfigInput.inputs?.forEach(i => {
      this.form_input.addControl(i.id, new FormControl());
    });

    this.form_input.addControl(this.qaInput.id, new FormControl())
    this.form_input.valueChanges.subscribe(x => {

      var updatedConfig : IInputComponentConfig = {
        id: this.INPUT_ID,
        formGroup: this.form_input,
      };
      if (!x['type']) x['type'] = 'text';
      for(let param in x){
          updatedConfig = {...updatedConfig, [param] : x[param]}
          this.qaInput = updatedConfig;
      }
    })

    
    //*********************************************************************************************************** */
    //********************************* Textarea Component Tester *********************************************** */
    //*********************************************************************************************************** */

    this.testerConfigTextarea.selects?.forEach(i => {
      this.form_textarea.addControl(i.id, new FormControl());

    });
    this.testerConfigTextarea.checkboxes?.forEach(i => {
      this.form_textarea.addControl(i.id, new FormControl());
    });
    this.testerConfigTextarea.inputs?.forEach(i => {
      this.form_textarea.addControl(i.id, new FormControl());
    });

    this.form_textarea.addControl(this.qaTextareaInput.id, new FormControl())
    this.form_textarea.valueChanges.subscribe(x => {

      var updatedConfig : IInputComponentConfig = {
        id: this.INPUT_ID,
        formGroup: this.form_textarea,
        errorMessages: this.qaTextareaInput.errorMessages
      };
      if (!x['type']) x['type'] = 'text';
      for(let param in x){
          updatedConfig = {...updatedConfig, [param] : x[param]}
          this.qaTextareaInput = updatedConfig;
      }
    })


    //******************************************************************************************************** */
    //********************************* DatePicker Component Tester *********************************************** */
    //******************************************************************************************************** */

    this.testerConfigDatePicker.selects?.forEach(i => {
      this.form_date_picker.addControl(i.id, new FormControl());

    });
    this.testerConfigDatePicker.checkboxes?.forEach(i => {
      this.form_date_picker.addControl(i.id, new FormControl());
    });
    this.testerConfigDatePicker.inputs?.forEach(i => {
      this.form_date_picker.addControl(i.id, new FormControl());
    });

    this.form_date_picker.addControl(this.qaDateOfBirthDatePickerConfig.id + '_dayControl', new FormControl(''));
    this.form_date_picker.addControl(this.qaDateOfBirthDatePickerConfig.id + '_monthControl',new FormControl(''));
    this.form_date_picker.addControl(this.qaDateOfBirthDatePickerConfig.id + '_yearControl',new FormControl(''));
    this.form_date_picker.valueChanges.subscribe(x => {

      var updatedConfig : IDatePickerConfig = {
        id: this.INPUT_ID,
        formGroup: this.form_date_picker,
      };
      for(let param in x){
          updatedConfig = {...updatedConfig, [param] : x[param]}
          this.qaDateOfBirthDatePickerConfig = updatedConfig;
      }
      console.log(this.qaDateOfBirthDatePickerConfig.maxYear)
    })

  }

  buttonActions(actionType: string) {
    switch (actionType) {
      case 'inputComponent':
        this.showInputComponent = true;
        this.showTextareaComponent = false;
        this.showDropDownComponent = false;
        this.showIconButtonComponent = false;
        this.showDatePickerComponent = false;
        break;
      case 'textareaComponent':
        this.showInputComponent = false;
        this.showTextareaComponent = true;
        this.showDropDownComponent = false;
        this.showIconButtonComponent = false;
        this.showDatePickerComponent = false;
        break;
      case 'datepickerComponent':
        this.showInputComponent = false;
        this.showTextareaComponent = false;
        this.showDropDownComponent = false;
        this.showIconButtonComponent = false;
        this.showDatePickerComponent = true;
        break;
      case 'dropDownComponent':
        this.showInputComponent = false;
        this.showTextareaComponent = false;
        this.showDropDownComponent = true;
        this.showIconButtonComponent = false;
        this.showDatePickerComponent = false;
        break;
      case 'iconButtonComponent':
        this.showInputComponent = false;
        this.showTextareaComponent = false;
        this.showDropDownComponent = false;
        this.showIconButtonComponent = true;
        this.showDatePickerComponent = false;
        break;
      case 'inputError':
        this.form_textarea.get(this.qaTextareaInput.id)?.valid ?
          this.form_textarea.get(this.qaTextareaInput.id)?.setErrors({ 'invalid': true }) :
          this.form_textarea.get(this.qaTextareaInput.id)?.reset();

        this.form_textarea.updateValueAndValidity();
        break;
      case 'setInputError':
        this.form_textarea.get(this.qaTextareaInput.id)?.
          setErrors({
            'invalid': true,
            'testingError': true,
            'maxlength': { requiredLength: 3, actualLength: 5 }});
        this.form_textarea.updateValueAndValidity();
        break;
      case 'removeInputError':
        this.form_textarea.get(this.qaTextareaInput.id)?.setErrors({errors: null});
        this.form_textarea.updateValueAndValidity();
        break;
      case 'disable-input':
        this.qaInput?.formGroup.get(this.qaInput.id)?.disabled ?
        this.qaInput?.formGroup.get(this.qaInput.id)?.enable() :
        this.qaInput?.formGroup.get(this.qaInput.id)?.disable();
        break;
      case 'disable-textarea':
        this.qaTextareaInput?.formGroup.get(this.qaTextareaInput.id)?.disabled ?
        this.qaTextareaInput?.formGroup.get(this.qaTextareaInput.id)?.enable() :
        this.qaTextareaInput?.formGroup.get(this.qaTextareaInput.id)?.disable();
        break;
    }
  }

  disable() {
    if(!this.testButtonConfig?.disabled) this.testButtonConfig.disabled = true;
    else this.testButtonConfig.disabled = false;
  }
}
