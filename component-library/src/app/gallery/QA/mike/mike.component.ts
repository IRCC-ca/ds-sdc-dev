import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { FormGroup, FormControl} from '@angular/forms';
import { IAutoTestComponentConfig, IAutoTestConfigObject } from '../auto-tester/auto-tester.component';
import { IBannerConfig, ICTAConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-mike',
  templateUrl: './mike.component.html',
  styleUrls: ['./mike.component.scss']
})
export class MikeComponent implements OnInit {

  BANNER_ID = 'qa_test_banner';

  qaBanner : IBannerConfig = {
    id: this.BANNER_ID
  };

  form = new FormGroup({});
  form2 = new FormGroup({});

  ctaTestConfigObj : IAutoTestConfigObject = {
    inputs: [
      {
        id: 'text',
        formGroup: this.form2,
        label: 'Text'
      }
    ]
  }

  testerConfig: IAutoTestConfigObject = {
    inputs: [
      {
        id: 'title',
        formGroup: this.form,
        label: 'title'
      },
      {
        id: 'content',
        formGroup: this.form,
        label: 'content'
      }
    ],
    checkboxes: [
        {
          id: 'rounded',
          formGroup: this.form,
          label: 'rounded'
        },
        {
          id: 'dismissible',
          formGroup: this.form,
          label: 'dismissible'
        }
    ],
    dropdowns: [
      {
        id: 'type',
        label: 'Type',
        formGroup: this.form,
        options: [
          {
            text: 'generic'
          },
          {
            text: 'info'
          },
          {
            text: 'warning'
          },
          {
            text: 'critical'
          },
          {
            text: 'success'
          }
        ]
      },
      {
        id: 'size',
        label: 'Size',
        formGroup: this.form,
        options: [
          {
            text: 'large'
          },
          {
            text: 'small'
          }
        ]
      }
    ]
  }

  testComponentConfig: IAutoTestComponentConfig = {
    id: 'mike_tester',
    formGroup: this.form,
    testFields: this.testerConfig
  }

  ctaTestConfig: IAutoTestComponentConfig = {
    id: 'cta_tester',
    formGroup: this.form2,
    testFields: this.ctaTestConfigObj
  }




  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('mike-alt');

    this.testerConfig.dropdowns?.forEach(i => {
      this.form.addControl(i.id, new FormControl());

    });
    this.testerConfig.checkboxes?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerConfig.inputs?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });

    this.ctaTestConfigObj.dropdowns?.forEach(i => {
      this.form2.addControl(i.id, new FormControl());

    });
    this.ctaTestConfigObj.checkboxes?.forEach(i => {
      this.form2.addControl(i.id, new FormControl());
    });
    this.ctaTestConfigObj.inputs?.forEach(i => {
      this.form2.addControl(i.id, new FormControl());
    });


    this.form.valueChanges.subscribe(x => {

      let updatedConfig : IBannerConfig = {
        id: this.BANNER_ID
      };

      for(let param in x){
          console.log(param);
          console.log(x[param]);
          updatedConfig = {...updatedConfig, [param] : x[param]}
          console.log('updatedConfig: ', updatedConfig);
          this.qaBanner = updatedConfig;

      }
  });

  }

}
