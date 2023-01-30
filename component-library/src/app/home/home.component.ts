import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownTypes, DSSizes, ICheckBoxComponentConfig, IComponentOutputEvent, IDropdownInputConfig, IJLDropdownComponentConfig, IJLInputComponentConfig, InputTypes, IRadioInputComponentConfig, ButtonIconDirection, IIconButtonComponentConfig, IBannerConfig, BannerType } from 'ircc-ds-angular-component-library';

export enum HomeButtonActionTypes {
  disableCheckbox = 'disableCheckbox',
  checkboxError = 'checkboxError',
  disableRadio = 'disableRadio',
  disablePassword = 'disablePassword'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homeButtonActionTypes = HomeButtonActionTypes;

  form = new FormGroup({});

  iconDirectionEnum = ButtonIconDirection;

  bannerConfig : IBannerConfig = {
    id: 'banner_52',
    title: 'Title',
    content: `<p>This is descriptione. <strong>This is the text.<strong> For the description. This is it.</p>
    <ul>
      <li>List example</li>
      <li>Another list example</li>
    </ul>`,
    type: BannerType.warning,
    dismissible: true
  }

  checkboxesConfigs: ICheckBoxComponentConfig[] = [
    { //checkbox1
      id: 'checkbox_label_test',
      formGroup: this.form,
      label: 'Testing Label',
      disableFocus: true //TODO: Not working
    },
    { //checkbox2
      id: 'checkbox_small_test',
      formGroup: this.form,
      label: 'Small Test',
      small: true
    },
    { //checkbox3
      id: 'checkbox_error_test',
      formGroup: this.form,
      label: 'Error Test',
      error: true
    },
    {
      id: 'checkbox_form_disabled_test',
      formGroup: this.form,
      label: 'Form Disabled Test'
    },
    {
      id: 'checkbox_form_error_test',
      formGroup: this.form,
      label: 'Form Error Test'
    },
    {
      id: 'checkbox_validators_test',
      formGroup: this.form,
      label: 'Form Validators Test',
      validators: [Validators.required]
    },
    {
      id: 'checkbox_mixed_test',
      formGroup: this.form,
      mixed: true,
      label: 'Form Mixed Test',
    },
  ];
  //TODO: Test non-config checkboxes

  dropdownConfig: IJLDropdownComponentConfig = {
    id: 'dropdown_test1',
    options: [
      {
        text: 'Option1',
        value: 'Value1'
      },
      {
        text: 'Option2',
        value: 'Value2'
      },
      {
        text: 'Option3',
        value: 'Value3'
      }
    ],
    type: DropdownTypes.input
  };

  radioConfig: IRadioInputComponentConfig = {
    id: 'radio_input_test1',
    formGroup: this.form,
    label: 'Radio Label Test',
    desc: 'Test description',
    hint: 'Test hint text',
    required: true,
    options: [
      {
        text: 'Text Test',
        value: 'Test Value',
      },
      {
        text: 'Test noValue'
      },
      {
        text: 'Size Override Test',
        sizeOverride: DSSizes.small,
      },
      {
        text: 'Disabled Single Field Test',
        disabled: true
      },
      {
        text: 'Large Error State Test',
        error: true
      },
      {
        text: 'Small Error State Test',
        sizeOverride: DSSizes.small,
        error: true
      },
    ],
    helpText: 'Help text test'
  };

  radioErrorTestConfig: IRadioInputComponentConfig = {
    id: 'radio_error_test',
    formGroup: this.form,
    label: 'Radio Form Error Test',
    options: [
      {
        text: 'Test 1'
      },
      {
        text: 'Test 2 - Invalid'
      },
      {
        text: 'Test 3'
      }
    ]
  }

  demoText = '';
  demoTextArray: IComponentOutputEvent[] = [];

  inputConfigs: IJLInputComponentConfig[] = [
    {
      label: 'Input Label',
      placeholder: 'placeholder',
      id: 'input1',
      formGroup: this.form
    },
    {
      label: "Password Test - error state applies, but ng-invalid class doesn't change anything",
      type: InputTypes.password,
      id: 'password',
      formGroup: this.form
    },
    {
      id: 'test_input_1',
      formGroup: this.form,
      label: 'Password',
      desc: "Password description",
      hint: 'Password Hint',
      type: InputTypes.password,
      placeholder: 'Placeholder text',
      required: true,
    }
  ]

  dropdownOptions = [
    {
      text: 'Option1',
      value: 'Value1'
    },
    {
      text: 'Option2',
      value: 'Value2'
    },
    {
      text: 'Option3',
      value: 'Value3'
    },
  ];

  selectDropDownConfig: IDropdownInputConfig = {
    id: 'selectDropDown',
    formGroup: this.form,
    label: 'Select Dropdown Test',
    category: 'secondary',
    options: [
      {
        text: "One",
        value: 'First'
      },
      {
        text: "Two",
        value: 'Second'
      }
    ],
    required: true,
    hint: "Hint Text",
    desc: "Description text",
  };

  iconButtonConfig: IIconButtonComponentConfig = {
    id: 'icon_button_component_test',
    category: 'primary',
    ariaLabel: 'aria test'
  }

  datePickerID = 'datePicker';

  isLoading = false;

  constructor() { }

  ngOnInit() {
    this.form.addControl(this.radioConfig.id, new FormControl());
    this.form.addControl(this.inputConfigs[0].id, new FormControl());
    this.form.addControl(this.inputConfigs[1].id, new FormControl('', [Validators.required]));
    this.form.addControl(this.inputConfigs[2].id, new FormControl('', [Validators.required]));
    this.form.addControl(this.dropdownConfig.id, new FormControl());
    this.form.addControl(this.radioErrorTestConfig.id, new FormControl('', [Validators.maxLength(6)]));
    this.form.addControl(this.selectDropDownConfig.id, new FormControl('', [Validators.required, Validators.maxLength(6)]));
  }

  valueChange(event: any) {
    console.log(event);
    if (event.id) {
      let index = this.demoTextArray.findIndex(val => val.id === event.id);
      if (index === -1) {
        let temp: IComponentOutputEvent = { id: event.id, value: event.value };
        this.demoTextArray.push(temp)
      } else {
        this.demoTextArray[index].value = event.value;
      }
    }
  }

  resetChips() {

  }

  getFormElements() {
    interface IValReturn {
      key: string;
      value: string;
    };
    let valReturn: IValReturn[] = [];
    console.log(this.form.value);
    Object.keys(this.form.value).forEach(key => {
      valReturn.push({ key: key, value: this.form.get(key)?.value });
    });
    return valReturn;
  }

  buttonActions(actionType: HomeButtonActionTypes) {
    switch (actionType) {
      case HomeButtonActionTypes.disableCheckbox:
        this.form.get('checkbox_form_disabled_test')?.disabled ?
          this.form.get('checkbox_form_disabled_test')?.enable() : this.form.get('checkbox_form_disabled_test')?.disable();

        this.form.get('checkbox_form_error_test')?.disabled ?
          this.form.get('checkbox_form_error_test')?.enable() : this.form.get('checkbox_form_error_test')?.disable();

        this.form.get('password')?.disabled ?
          this.form.get('password')?.enable() : this.form.get('password')?.disable()

        break;

      case HomeButtonActionTypes.checkboxError:
        this.form.get('checkbox_form_error_test')?.valid ? 
        this.form.get('checkbox_form_error_test')?.setErrors({ 'invalid': true }) : 
        this.form.get('checkbox_form_error_test')?.reset();
        this.form.updateValueAndValidity();
        console.log(this.form.get('checkbox_form_error_test')?.valid);
        break;

      case HomeButtonActionTypes.disableRadio:
        console.log('disable')
        this.form.get(this.radioErrorTestConfig.id)?.disabled ?
          this.form.get(this.radioErrorTestConfig.id)?.enable() : this.form.get(this.radioErrorTestConfig.id)?.disable();
        break;

      case HomeButtonActionTypes.disablePassword:
        this.form.get(this.inputConfigs[2].id)?.disabled ?
          this.form.get(this.inputConfigs[2].id)?.enable() : this.form.get(this.inputConfigs[2].id)?.disable();
    }
  }
}