import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { FormGroup, FormControl, ValidatorFn, Validators} from '@angular/forms';
import { IAutoTestComponentConfig, IAutoTestConfigObject } from '../auto-tester/auto-tester.component';
import { IBannerConfig, ICTAConfig, IButtonConfig } from 'ircc-ds-angular-component-library';

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
  ctaForm1 = new FormGroup({});

    // [category]='cta?.btnConfig?.category'
  // [color]='cta?.btnConfig?.color'
  // [ariaLabel]='cta?.btnConfig?.ariaLabel'
  // [disabled]='cta?.btnConfig?.disabled'
  // [icon]='cta?.btnConfig?.icon'
  // [iconDirection]='cta?.btnConfig?.iconDirection'

  ctaTestConfigObj : IAutoTestConfigObject = {
    inputs: [
      {
        id: 'text',
        formGroup: this.ctaForm1,
        label: 'Text'
      }
    ],
    dropdowns: [
      {
        id: 'type',
        formGroup: this.ctaForm1,
        label: 'CTA type',
        options: [
          {
            text: 'button'
          },
          {
            text: 'link'
          }
        ]
      },
      {
        id: 'category',
        formGroup: this.ctaForm1,
        label: 'Category',
        options:[
          {
            text: 'secondary'
          },
          {
            text: 'primary'
          },
          {
            text: 'plain'
          }
        ]
      },
      {
        id: 'color',
        formGroup: this.ctaForm1,
        label: 'Color',
        options: [
          {
            text: 'CTA'
          },
          {
            text: 'critical'
          }
        ]
      }
    ],
    checkboxes: [
      {
        id:'disabled',
        formGroup: this.ctaForm1,
        label: 'disabled'
      },
      {
        id:'noCta',
        formGroup: this.ctaForm1,
        label: 'Turn off cta'
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
        },
        {
          id: 'errorMessages',
          formGroup: this.form,
          label: 'error',
          errorMessages: [
            { key:'required' , errorLOV:'Required Error message' }
          ],
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

<<<<<<< HEAD
  ctaTestConfig: IAutoTestComponentConfig = {
    id: 'cta_tester',
    formGroup: this.ctaForm1,
    testFields: this.ctaTestConfigObj
  }




=======
>>>>>>> dev
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
      this.ctaForm1.addControl(i.id, new FormControl());

    });
    this.ctaTestConfigObj.checkboxes?.forEach(i => {
      this.ctaForm1.addControl(i.id, new FormControl());
    });
    this.ctaTestConfigObj.inputs?.forEach(i => {
      this.ctaForm1.addControl(i.id, new FormControl());
    });


    this.form.valueChanges.subscribe(x => {
      let updatedConfig : IBannerConfig = {
        id: this.BANNER_ID
      };

      for(let param in x){
        updatedConfig = {...updatedConfig, [param] : x[param]}
        this.qaBanner = updatedConfig;
      }
<<<<<<< HEAD
  });

  // code for CTA1:
    this.ctaForm1.valueChanges.subscribe(x => {
    let ctaConf : ICTAConfig = {
      text: '',
      type: 'button'
    }

    let btnConf1 : IButtonConfig = {
      id: 'ctaBtn_1'
    }

        for(let param in x){

          if(!x['noCta']){
            //if cta isn't disabled
          if(param === 'text'){
            //setting text param on ctaConfig
            ctaConf = {...ctaConf, [param] : x[param]}
          } else {
            //setting type param on ctaConfig and disabling elements that currently don't apply to link
            //TO-DO: when link config exists refactor code
            if(param === 'type' && x[param] === 'link'){
              document.getElementById('category')?.toggleAttribute('disabled');
              document.getElementById('color')?.toggleAttribute('disabled');
              document.getElementById('disabled')?.toggleAttribute('disabled');
              ctaConf = {...ctaConf, [param] : x[param], linkConfig: ''}
            }else if(param === 'type' && x[param] === 'button'){
              document.getElementById('category')?.removeAttribute('disabled');
              document.getElementById('color')?.removeAttribute('disabled');
              document.getElementById('disabled')?.removeAttribute('disabled');
              ctaConf = {...ctaConf, [param] : x[param]}
            }
            if(x['type'] === 'button'){
            //if it's a button set up the buttonConfig
              btnConf1 = {...btnConf1, [param] : x[param]}
              console.log(btnConf1);
              ctaConf = {...ctaConf, btnConfig : btnConf1}
              console.log(ctaConf);
            }else{
            //otherwise delete btnConfig altogether
              delete ctaConf.btnConfig;
            }
          }
          if(x['text'] != null && x['type'] != null){
            //a type is set and text is present so add the cta
            this.qaBanner = {...this.qaBanner, cta: [ctaConf]};
          }
          }
          else{
            //if cta disabled delete cta config
            delete this.qaBanner.cta;
          }
        }
    });
=======
    });
  }
  setResetError() {
    this.form.get('errorMessages')?.valid ?
      this.form.get('errorMessages')?.setErrors({ 'required': true }) :
      this.form.get('errorMessages')?.reset();
>>>>>>> dev
  }
}
