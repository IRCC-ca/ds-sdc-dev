import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ICheckBoxComponentConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-michael',
  templateUrl: './michael.component.html',
  styleUrls: ['./michael.component.scss']
})
export class MichaelComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  checkboxesConfigs: ICheckBoxComponentConfig[] = [
    { //checkbox1
      id: 'checkbox_label_test',
      formGroup: this.form,
      label: 'Testing Label',
      helpText: 'Hint text',
      desc: 'Description line of text',
      disableFocus: true, //TODO: Not working,
    },
    { //checkbox2
      id: 'checkbox_small_test',
      formGroup: this.form,
      label: 'Small Test',
      size: 'small',
      helpText: 'Hint text',
      desc: 'Description line of small test',
    },
    { //checkbox3
      id: 'checkbox_error_test',
      formGroup: this.form,
      label: 'Error Test',
      customErrorText: 'Error Message',
      helpText: 'Test help text',
      desc: 'Description line of error test',
    },
    {
      id: 'checkbox_form_disabled_test',
      formGroup: this.form,
      label: 'Form Disabled Test',
      helpText: 'Test help text',
      desc: 'Description line of disabled test',
    },
    {
      id: 'checkbox_form_error_test',
      formGroup: this.form,
      label: 'Form Error Test',
      errorMessages: [{key: 'invalid', errorLOV: 'This field is invalid.'}]
    },
    {
      id: 'checkbox_validators_test',
      formGroup: this.form,
      label: 'Form Validators Test',
    },
    {
      id: 'checkbox_mixed_test',
      formGroup: this.form,
      mixed: true,
      label: 'Form Mixed Test',
    },
    {
      id: 'checkbox_mixed_error_test',
      formGroup: this.form,
      mixed: true,
      label: 'Form Mixed Error Test',
      customErrorText: 'Error Message for Mixed Error Test',
      errorMessages: [{key: 'invalid', errorLOV: 'This field is invalid.'}],
      errorIcon: {class: 'fa-solid fa-circle-xmark'}
    },
    {
      id: 'checkbox_mixed_error_test2',
      formGroup: this.form,
      mixed: true,
      size: 'small',
      label: 'Form Mixed Error Small Test',
      customErrorText: 'Error Message for Mixed Error Small Test',
      errorMessages: [{key: 'invalid', errorLOV: 'This field is invalid.'}],
      errorIcon: {class: 'fa-solid fa-circle-xmark'}
    },
  ];
  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('michael-alt');

    this.checkboxesConfigs.forEach(i => {
      if (i.id !== 'checkbox_validators_test') {
        this.form.addControl(i.id, new FormControl());
      }
    })
    this.form.addControl(this.checkboxesConfigs[5]?.id, new FormControl('', [Validators.required]));
  }

  buttonActions(actionType: string) {
    switch (actionType) {
      case 'disableCheckbox':
        this.form.get('checkbox_form_disabled_test')?.disabled ?
          this.form.get('checkbox_form_disabled_test')?.enable() : this.form.get('checkbox_form_disabled_test')?.disable();

        this.form.get('checkbox_form_error_test')?.disabled ?
          this.form.get('checkbox_form_error_test')?.enable() : this.form.get('checkbox_form_error_test')?.disable();
        break;
      case 'checkboxError':
        [
          'checkbox_form_error_test',
          this.checkboxesConfigs[2].id,
          this.checkboxesConfigs[7].id,
          this.checkboxesConfigs[8].id
        ].forEach((id) => {
          this.form.get(id)?.valid ?
            this.form.get(id)?.setErrors({ 'invalid': true }) :
            this.form.get(id)?.reset();
        })

        this.form.updateValueAndValidity();
        break;
    }
  }
}
