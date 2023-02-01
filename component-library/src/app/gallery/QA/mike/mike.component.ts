import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { FormGroup, FormControl} from '@angular/forms';
import { IAutoTestComponentConfig, IAutoTestConfigObject } from '../auto-tester/auto-tester.component';
import { IBannerConfig } from 'ircc-ds-angular-component-library';

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

  testerConfig: IAutoTestConfigObject = {
    checkboxes: [
        {
          id: 'title',
          formGroup: this.form,
          label: 'title'
        },
        {
          id: 'content',
          formGroup: this.form,
          label: 'content'
        },
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
      }
    ]
  }

  testComponentConfig: IAutoTestComponentConfig = {
    id: 'mike_tester',
    formGroup: this.form,
    testFields: this.testerConfig
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

    this.form.valueChanges.subscribe(x => {

      var updatedConfig : IBannerConfig = {
        id: this.BANNER_ID
      };

      // console.log(x);

      // updatedConfig = {...updatedConfig, type: x['autoConfig_type']}

      // if(x['autoConfig_checkbox_title']){
      //   updatedConfig = {...updatedConfig, title: 'This is the test title'}
      // }

      // console.log(updatedConfig);

      // this.qaBanner = updatedConfig;

      for(var param in x){

        if(x[param]){
          console.log(param);
          console.log(x[param]);
          if(param == 'title'){
            x[param] = 'This is the test title'
          }
          if(param == 'content'){
            x[param] = 'This is some content for us to test'
          }
          updatedConfig = {...updatedConfig, [param] : x[param]}
          console.log('updatedConfig: ', updatedConfig);
          this.qaBanner = updatedConfig;
        }
      }
  })

  }

}
