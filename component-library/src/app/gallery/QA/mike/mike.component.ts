import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { FormGroup, FormControl } from '@angular/forms';
import {
  IAutoTestComponentConfig,
  IAutoTestConfigObject
} from '../auto-tester/auto-tester.component';
import {
  IBannerConfig,
  ICTAConfig,
  IButtonConfig,
  IRadioInputComponentConfig,
  IHiddenNavConfig,
  IIconConfig
} from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-mike',
  templateUrl: './mike.component.html',
  styleUrls: ['./mike.component.scss']
})
export class MikeComponent implements OnInit {
  toggleComp(comp: string) {
    document.querySelectorAll('section')?.forEach((section) => {
      section.classList.remove('show');
    });
    document.getElementById(comp)?.classList.toggle('show');
  }

  BANNER_ID = 'qa_test_banner';

  qaBanner: IBannerConfig = {
    id: this.BANNER_ID
  };

  hiddenNavConfig: IHiddenNavConfig = {
    id: 'hidden_nav',
    skipLinks: [
      {
        title: 'skip to this',
        href: 't1'
      },
      {
        title: 'skip to that',
        href: 't2',
        ariaLabel: 'Test Label'
      }
    ]
  };

  iconConfig: IIconConfig = {
    FA_keywords: 'fa-regular fa-mustache'
  };

  form = new FormGroup({});
  ctaForm1 = new FormGroup({});
  radioForm = new FormGroup({});
  radioTesterForm = new FormGroup({});
  iconTesterForm = new FormGroup({});

  iconTest: IAutoTestConfigObject = {
    inputs: [
      {
        id: 'FA_keywords',
        label: 'FA_keywords',
        formGroup: this.iconTesterForm
      },
      {
        id: 'ariaLabel',
        label: 'ariaLabel',
        formGroup: this.iconTesterForm
      }
    ]
  };

  iconComponentConfig: IAutoTestComponentConfig = {
    id: 'icon_tester',
    formGroup: this.iconTesterForm,
    testFields: this.iconTest
  };

  radioConfig: IRadioInputComponentConfig = {
    id: 'radio_1',
    formGroup: this.radioForm,
    options: [
      {
        text: 'radio 1'
      },
      {
        text: 'radio 2',
        disabled: true
      },
      {
        text: 'small override radio',
        sizeOverride: 'small'
      },
      {
        text: 'small disabled radio',
        disabled: true,
        sizeOverride: 'small'
      }
    ],
    errorMessages: [
      { key: 'required', errorLOV: 'This field is required' },
      { key: 'otherError', errorLOV: 'And another error' }
    ]
  };

  radioOptions: IAutoTestConfigObject = {
    inputs: [
      {
        id: 'label',
        formGroup: this.radioTesterForm,
        label: 'Label'
      },
      { id: 'desc', formGroup: this.radioTesterForm, label: 'Description' },
      {
        id: 'hint',
        formGroup: this.radioTesterForm,
        label: 'Hint'
      },
      {
        id: 'helpText',
        formGroup: this.radioTesterForm,
        label: 'Help text (accessibility only)'
      }
    ],
    selects: [
      {
        id: 'size',
        formGroup: this.radioTesterForm,
        label: 'Size',
        options: [
          {
            text: 'small'
          },
          {
            text: 'large'
          }
        ]
      }
    ],
    checkboxes: [
      {
        id: 'disabled',
        formGroup: this.radioTesterForm,
        inlineLabel: 'disabled'
      },
      {
        id: 'required',
        formGroup: this.radioTesterForm,
        inlineLabel: 'required'
      }
    ]
  };

  radioTestConfig: IAutoTestComponentConfig = {
    id: 'auto_test_radio',
    formGroup: this.radioTesterForm,
    testFields: this.radioOptions
  };

  ctaTestConfigObj: IAutoTestConfigObject = {
    inputs: [
      {
        id: 'text',
        formGroup: this.ctaForm1,
        label: 'Text'
      }
    ],
    selects: [
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
        options: [
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
        id: 'disabled',
        formGroup: this.ctaForm1,
        inlineLabel: 'disabled'
      },
      {
        id: 'noCta',
        formGroup: this.ctaForm1,
        inlineLabel: 'Turn off cta'
      }
    ]
  };

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
        inlineLabel: 'rounded'
      },
      {
        id: 'dismissible',
        formGroup: this.form,
        inlineLabel: 'dismissible'
      }
    ],
    selects: [
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
  };

  testComponentConfig: IAutoTestComponentConfig = {
    id: 'mike_tester',
    formGroup: this.form,
    testFields: this.testerConfig
  };

  ctaTestConfig: IAutoTestComponentConfig = {
    id: 'cta_tester',
    formGroup: this.ctaForm1,
    testFields: this.ctaTestConfigObj
  };

  triggerError() {
    if (!this.radioConfig.formGroup.get('radio_1')?.hasError('otherError')) {
      this.radioConfig.formGroup.get('radio_1')?.hasError('required')
        ? this.radioConfig.formGroup
            .get('radio_1')
            ?.setErrors({ required: true, otherError: true })
        : this.radioConfig.formGroup
            .get('radio_1')
            ?.setErrors({ required: true });
    } else {
      this.radioConfig.formGroup.get('radio_1')?.reset();
    }
  }

  toggleDisable() {
    document.getElementById('radio_10')?.hasAttribute('disabled')
      ? document.getElementById('radio_10')?.removeAttribute('disabled')
      : document.getElementById('radio_10')?.setAttribute('disabled', '');
  }

  constructor(private altLang: LanguageSwitchService) {}

  ngOnInit() {
    this.altLang.setAltLangLink('mike-alt');

    this.testerConfig.selects?.forEach((i) => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerConfig.checkboxes?.forEach((i) => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerConfig.inputs?.forEach((i) => {
      this.form.addControl(i.id, new FormControl());
    });

    this.ctaTestConfigObj.selects?.forEach((i) => {
      this.ctaForm1.addControl(i.id, new FormControl());
    });
    this.ctaTestConfigObj.checkboxes?.forEach((i) => {
      this.ctaForm1.addControl(i.id, new FormControl());
    });
    this.ctaTestConfigObj.inputs?.forEach((i) => {
      this.ctaForm1.addControl(i.id, new FormControl());
    });

    this.radioForm.addControl(this.radioConfig.id, new FormControl());

    this.radioOptions.inputs?.forEach((i) => {
      this.radioTesterForm.addControl(i.id, new FormControl());
    });

    this.radioOptions.selects?.forEach((i) => {
      this.radioTesterForm.addControl(i.id, new FormControl());
    });

    this.radioOptions.checkboxes?.forEach((i) => {
      this.radioTesterForm.addControl(i.id, new FormControl());
    });

    this.iconTest.inputs?.forEach((i) => {
      this.iconTesterForm.addControl(i.id, new FormControl());
    });

    this.form.valueChanges.subscribe((x) => {
      let updatedConfig: IBannerConfig = {
        id: this.BANNER_ID
      };

      for (const param in x) {
        updatedConfig = { ...updatedConfig, [param]: x[param] };
        this.qaBanner = updatedConfig;
      }
    });

    this.iconTesterForm.valueChanges.subscribe((x) => {
      let updatedConfig: IIconConfig = {
        FA_keywords: this.iconConfig.FA_keywords
      };

      for (const param in x) {
        updatedConfig = { ...updatedConfig, [param]: x[param] };
        this.iconConfig = updatedConfig;
      }

      console.log('ICON CONFIG:', updatedConfig);
    });

    // code for CTA1:
    this.ctaForm1.valueChanges.subscribe((x) => {
      let ctaConf: ICTAConfig = {
        text: '',
        type: 'button'
      };

      let btnConf1: IButtonConfig = {
        id: 'ctaBtn_1'
      };

      for (const param in x) {
        if (!x['noCta']) {
          //if cta isn't disabled
          if (param === 'text') {
            //setting text param on ctaConfig
            ctaConf = { ...ctaConf, [param]: x[param] };
          } else {
            //setting type param on ctaConfig and disabling elements that currently don't apply to link
            //TO-DO: when link config exists refactor code
            if (param === 'type' && x[param] === 'link') {
              document.getElementById('category')?.toggleAttribute('disabled');
              document.getElementById('color')?.toggleAttribute('disabled');
              document.getElementById('disabled')?.toggleAttribute('disabled');
              ctaConf = { ...ctaConf, [param]: x[param], linkConfig: '' };
            } else if (param === 'type' && x[param] === 'button') {
              document.getElementById('category')?.removeAttribute('disabled');
              document.getElementById('color')?.removeAttribute('disabled');
              document.getElementById('disabled')?.removeAttribute('disabled');
              ctaConf = { ...ctaConf, [param]: x[param] };
            }
            if (x['type'] === 'button') {
              //if it's a button set up the buttonConfig
              btnConf1 = { ...btnConf1, [param]: x[param] };
              console.log(btnConf1);
              ctaConf = { ...ctaConf, btnConfig: btnConf1 };
              console.log(ctaConf);
            } else {
              //otherwise delete btnConfig altogether
              delete ctaConf.btnConfig;
            }
          }
          if (x['text'] != null && x['type'] != null) {
            //a type is set and text is present so add the cta
            this.qaBanner = { ...this.qaBanner, cta: [ctaConf] };
          }
        } else {
          //if cta disabled delete cta config
          delete this.qaBanner.cta;
        }
      }
    });

    this.radioTesterForm.valueChanges.subscribe((x) => {
      console.log(x);
      for (const param in x) {
        console.log(x[param]);
        this.radioConfig = { ...this.radioConfig, [param]: x[param] };
      }
    });
  }
}
