import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import {
  ICheckBoxComponentConfig,
  ISelectConfig,
  IRadioInputComponentConfig,
  ITabNavConfig,
  IBannerConfig
} from 'ircc-ds-angular-component-library';
import {
  IAutoTestComponentConfig,
  IAutoTestConfigObject
} from '../auto-tester/auto-tester.component';

// Parent components imports
import { ParentTemplateComponent } from '../../../@shared/templates/parent-template.component';
import { TranslateService } from '@ngx-translate/core';
import { StandAloneFunctions } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-kris',
  templateUrl: './kris.component.html',
  styleUrls: ['./kris.component.scss']
})
export class KrisComponent extends ParentTemplateComponent implements OnInit {
  form = new FormGroup({});

  demoTabsConfig: ITabNavConfig = {
    id: 'demoTabs',
    tab: [
      {
        id: 'info',
        title: 'Info'
      },
      {
        id: 'warning',
        title: 'Warning'
      },
      {
        id: 'critical',
        title: 'Critical'
      }
    ]
  };

  bannerConfig: IBannerConfig = {
    id: 'banner',
    title: 'Title text',
    type: 'info',
    dismissible: true,
    content: 'Description text lorem ipsum dolor sit amet consecteteur adipiscing elit.',
    cta: [
      {
        text: 'Default',
        type: 'button',
        btnConfig: {
          id: 'cta1',
          category: 'secondary'
        }
      }
    ]
  };

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'sizeToggle',
      formGroup: this.form,
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
      formGroup: this.form,
      label: 'Show description',
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
      id: 'showPrimaryToggle',
      formGroup: this.form,
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
      formGroup: this.form,
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
      id: 'showTitleToggle',
      formGroup: this.form,
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
      formGroup: this.form,
      label: 'Show close',
      options: [
        {
          text: 'True'
        },
        {
          text: 'False'
        }
      ]
    }
  ]



  constructor(
    altLang: LanguageSwitchService,
    translate: TranslateService,
    standAloneFunctions: StandAloneFunctions
  ) {
    super(altLang, translate, standAloneFunctions);
  }

  ngOnInit() {
    this.altLang.setAltLangLink('kris-alt');
    this.toggles.forEach(toggle => {
      if (toggle.options && toggle.options[0].text){
        this.form.addControl(toggle.id, new FormControl(toggle.options[0].text))
      }
    });
  }
}
