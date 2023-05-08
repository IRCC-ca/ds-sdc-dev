import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { FormControl, FormGroup } from '@angular/forms';
import {
  slugAnchorType,
  slugTitleURLConfig,
} from '@app/components/title-slug-url/title-slug-url.component';
import {
  ButtonColor,
  IButtonConfig,
  ICheckBoxComponentConfig,
  IRadioInputComponentConfig,
  ITabNavConfig
} from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-button-doc-code',
  templateUrl: './button-doc-code.component.html',
  styleUrls: ['./button-doc-code.component.scss']
})
export class ButtonDocCodeComponent implements OnInit {
  altLangLink = 'buttonDocumentation';
  layoutFluid: boolean = true;

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  form_interactive_button = new FormGroup({});

  interactiveDemoSlugTitleURLConfig: slugTitleURLConfig = {
    title: 'Interactive Demo',
    anchorType: slugAnchorType.primary
  };

  buttonConfig: IButtonConfig = {
    id: 'button',
    color: ButtonColor.CTA,
    disabled: false,
    icon: '',
    size: 'large'
  };

  checkboxes: ICheckBoxComponentConfig[] = [
    {
      id: 'showSelectToggle',
      formGroup: this.form_interactive_button,
      label: 'State',
      size: 'small',
      inlineLabel: 'Disabled'
    }
  ];

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
    }
  ];

  demoTabsConfig: ITabNavConfig = {
    id: 'demoTabs',
    size: 'small',
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

  /**
   * position icon based on config
   */
  handleIconToggle(value: any) {
    this.buttonConfig.icon = 'fa-regular fa-igloo';
    if (value['showIconToggle'] === 'Leading') {
      this.buttonConfig.iconDirection = 'left';
    } else if (value['showIconToggle'] === 'Trailing') {
      this.buttonConfig.iconDirection = 'right';
    } else {
      this.buttonConfig.icon = '';
    }
  }

  /**
   * toggle between type of layout selected
   */
  handleLayoutToggle(value: any) {
    if (value['showLayoutToggle'] === 'Fluid') {
      this.layoutFluid = true;
    } else {
      this.layoutFluid = false;
    }
  }

  /**
   * Set button category based on the tab selected
   */
  setButtonCategory(value: any) {
    if (value === 'primary') {
      this.buttonConfig.category = 'primary';
    } else if (value === 'secondary') {
      this.buttonConfig.category = 'secondary';
    } else if (value === 'plain') {
      this.buttonConfig.category = 'plain';
    }
  }

  /**
   * Assign initial value for radio based on id
   */
  assignToggleDefaultValues(
    toggleID: string,
    toggle: IRadioInputComponentConfig
  ) {
    if (toggle.options) {
      switch (toggleID) {
        case 'showIconToggle':
          this.form_interactive_button.addControl(
            toggle.id,
            new FormControl(toggle.options[0].text)
          );
          break;
        case 'showSizeToggle':
          this.form_interactive_button.addControl(
            toggle.id,
            new FormControl(toggle.options[1].text)
          );
          break;
        case 'showCriticalToggle':
          this.form_interactive_button.addControl(
            toggle.id,
            new FormControl(toggle.options[1].text)
          );
          break;
        default: {
          console.log('Default');
          this.form_interactive_button.addControl(
            toggle.id,
            new FormControl(toggle.options[0].text)
          );
        }
      }
    }
  }

  /**
   * Return mapping of input config from form values
   */
  private parseToggleConfig(value: any): IButtonConfig {
    this.handleLayoutToggle(value);
    this.handleIconToggle(value);
    return {
      ...this.buttonConfig,
      size: value['showSizeToggle'].toLowerCase(),
      color:
        value['showCriticalToggle'] === 'True'
          ? (this.buttonConfig.color = 'critical')
          : (this.buttonConfig.color = 'CTA'),
      disabled:
        value['showSelectToggle'] === true
          ? (this.buttonConfig.disabled = true)
          : (this.buttonConfig.disabled = false)
    };
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.checkboxes.forEach((checkbox) => {
      if (checkbox) {
        this.form_interactive_button.addControl(checkbox.id, new FormControl());
      }
    });

    this.toggles.forEach((toggle) => {
      if (toggle.options) {
        this.assignToggleDefaultValues(toggle.id, toggle);
      }
    });

    this.form_interactive_button.valueChanges.subscribe((value: any) => {
      this.buttonConfig = this.parseToggleConfig(value);
    });
  }
}
