import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { FormControl, FormGroup } from '@angular/forms';
import { slugAnchorType, slugTitleURLConfig, slugTitleURLType } from '@app/components/title-slug-url/title-slug-url.component';
import { IButtonConfig, ICheckBoxComponentConfig, IRadioInputComponentConfig, ITabNavConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-button-documentation',
  templateUrl: './button-documentation.component.html',
  styleUrls: ['./button-documentation.component.scss']
})
export class ButtonDocumentationComponent implements OnInit {
  altLangLink = 'buttonDocumentation';
  layoutFluid: boolean = true;

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  form_interactive_button = new FormGroup({});

  interactiveDemoSlugTitleURLConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Interactive Demo',
    anchorType: slugAnchorType.primary
  };

  buttonConfig: IButtonConfig = {
    id: 'button',
    disabled: false,
    icon: ''
    
  };

  checkboxes : ICheckBoxComponentConfig[] = [
    {
      id: 'showSelectToggle',
      formGroup: this.form_interactive_button,
      label:'State',
      size: 'small',
      inlineLabel: 'Disabled'
    }
  ]

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'showSizeToggle',
      formGroup: this.form_interactive_button,
      size: 'small',
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
      id: 'showCriticalToggle',
      formGroup: this.form_interactive_button,
      label: 'Critical',
      size: 'small',
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
      id: 'showLayoutToggle',
      formGroup: this.form_interactive_button,
      label: 'Layout',
      size: 'small',
      options: [
        {
          text: 'Fluid'
        },
        {
          text: 'Fixed'
        }
      ]
    },
    {
      id: 'showIconToggle',
      formGroup: this.form_interactive_button,
      label: 'Icon',
      size: 'small',
      options: [
        {
          text: 'None'
        },
        {
          text: 'Leading'
        },
        {
          text: 'Trailing'
        }
      ]
    },
  ];

  demoTabsConfig: ITabNavConfig = {
    id: 'demoTabs',
    size: "small",
    tab: [
      {
        id: 'primary',
        title: 'Primary'
      },
      {
        id: 'secondary',
        title: 'Secondary'
      },
      {
        id: 'plain',
        title: 'Plain'
      }
    ]
  };

  handleSizeToggle(value: any) {
    this.buttonConfig.size = value['showSizeToggle'].toLowerCase();
    console.log('Button config size', this.buttonConfig.size)
  }

  handleIconToggle(value: any) {
    console.log('handleIconToggle', value)
    this.buttonConfig.icon ='fa-regular fa-igloo'
    if (value['showIconToggle'] === 'Leading') {
      this.buttonConfig.iconDirection='left'
    } 
    else if (value['showIconToggle'] === 'Trailing') {
      this.buttonConfig.iconDirection='right'
    }
    else {
      this.buttonConfig.icon =''
    }
  }

  handleCriticalToggle(value: any) {
    if (value['showCriticalToggle'] === 'True') {
      this.buttonConfig.color = 'critical';
    } else {
      this.buttonConfig.color = 'CTA';
    }
  }

  handleSelectCheckbox(value : any) {
    if (value['showSelectToggle']) {
      this.buttonConfig.disabled = true;
    } else {
      this.buttonConfig.disabled = false;
    }
  }

  handleLayoutToggle(value : any) {
    if (value['showLayoutToggle']  === 'Fluid') {
      this.layoutFluid = true
    } else {
      this.layoutFluid = false
    }
  }

  setButtonCategory(value: any) {
    if (value === 'primary') {
      this.buttonConfig.category = 'primary';
    } else if (value === 'secondary') {
      this.buttonConfig.category = 'secondary';
    } else if (value === 'plain') {
      this.buttonConfig.category = 'plain';
    } 
  }

  assignToggleDefaultValues(toggleID : string, toggle : IRadioInputComponentConfig) {
    if (toggle.options) {
      switch(toggleID) {
        case 'showIconToggle':
          this.form_interactive_button.addControl(toggle.id,new FormControl(toggle.options[0].text));
          break;
        case 'showSizeToggle': 
          this.form_interactive_button.addControl(toggle.id,new FormControl(toggle.options[1].text));
          break;
        case 'showCriticalToggle':
          this.form_interactive_button.addControl(toggle.id,new FormControl(toggle.options[1].text));
          break;
        default: {
          console.log("Default")
          this.form_interactive_button.addControl(toggle.id,new FormControl(toggle.options[0].text));
        }
      }
    }
  }

  track_toggles = {
    showSizeToggle: 'Large',
    showIconToggle: 'None',
    showCriticalToggle: 'False',
    showSelectToggle: false,
    showLayoutToggle: 'Fluid'
  };

  toggle_function = {
    showSizeToggle: this.handleSizeToggle,
    showIconToggle: this.handleIconToggle,
    showCriticalToggle: this.handleCriticalToggle,
    showSelectToggle: this.handleSelectCheckbox,
    showLayoutToggle: this.handleLayoutToggle
  };

  ngOnInit() {

    this.lang.setAltLangLink(this.altLangLink);
    
    this.checkboxes.forEach((checkbox) => {
      if (checkbox) {
        this.form_interactive_button.addControl(
          checkbox.id,
          new FormControl()
        );
      }
    });

    this.toggles.forEach((toggle) => {
      if (toggle.options) {
        this.assignToggleDefaultValues(toggle.id, toggle)
      }
    });

    this.form_interactive_button.valueChanges.subscribe((value: any) => {
      for (const param in value) {
        if (this.track_toggles[param] === value[param]) continue;
        this.track_toggles[param] = value[param];
        this.toggle_function[param].apply(this, [value]);
      }
    });
  }
}
