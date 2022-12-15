import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IJLInputComponentConfig, IRadioInputComponentConfig } from 'ircc-ds-angular-component-library';

export enum StatusTypes {
  birth = 'birth',
  descent = 'descent',
  naturalized = 'naturalized',
  resident = 'resident',
  indian = 'indian'
}
@Component({
  selector: 'app-quick-demo',
  templateUrl: './quick-demo.component.html',
  styleUrls: ['./quick-demo.component.scss']
})
export class QuickDemoComponent implements OnInit {
  form = new FormGroup({});
  statusTypes = StatusTypes;


  radioConfig:IRadioInputComponentConfig = {
    id: 'canadaRadio',
    formGroup: this.form,
    options: [
      {
        text: 'I am a Canadian citizen by birth',
        value: StatusTypes.birth
      },
      {
        text: 'I am a Canadian citizen by descent',
        value: StatusTypes.descent
      },
      {
        text: 'I am a naturalized Canadian citizen',
        value: StatusTypes.naturalized
      },
      {
        text: 'I am a permanent resident of Canada',
        value: StatusTypes.resident
      },
      {
        text: 'I am a status Indian',
        value: StatusTypes.indian
      },
    ]
  };

  dateInputConfigs: IJLInputComponentConfig[] = [
    {
      label: 'Year (YYYY)',
      id: 'date_year',
      formGroup: this.form
    },
    {
      label: 'Month',
      id: 'date_month',
      formGroup: this.form
    },
    {
      label: 'Day',
      id: 'date_day',
      formGroup: this.form
    }
  ];

  uciInputConfig: IJLInputComponentConfig = {
    id: 'uciInput',
    formGroup: this.form
  };

  nameChangeConfig: IRadioInputComponentConfig = {
    id: 'nameChangeRadio',
    formGroup: this.form,
    options: [
      {
        text: 'Yes, I have used another name',
        value: 'yes'
      },
      {
        text: 'No, I have not used another name',
        value: 'no'
      },
    ]
  };

  ngOnInit() {
    this.form.addControl(this.radioConfig.id, new FormControl('', [Validators.required]));

    this.form.get(this.radioConfig.id)?.valueChanges.subscribe(change => {
      console.log(change);
      if (change === StatusTypes.resident) {
        this.dateInputConfigs.forEach(config => {
          if (config.id === 'date_year'){
            this.form.setControl(config.id, new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]));
          } else {
          this.form.setControl(config.id, new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]));
          }
        });
      }
    });
    this.form.setControl(this.uciInputConfig.id, new FormControl('', [Validators.required]));
    this.form.setControl(this.nameChangeConfig.id, new FormControl('', [Validators.required]));
  }


}
