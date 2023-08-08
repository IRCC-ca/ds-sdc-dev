import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { FormControl, FormGroup } from '@angular/forms';
import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import {
  ButtonColor,
  IButtonConfig,
  ICheckBoxComponentConfig,
  IRadioInputComponentConfig,
  ITabNavConfig
} from 'ircc-ds-angular-component-library';
import {
  ICodeViewerConfig,
  stringify
} from '@app/components/code-viewer/code-viewer.component';
import { docPageheadingConfig } from '@app/share/documentation-page-headings';

export enum LayoutType {
  'fluid' = 'button-container-fluid',
  'fixed' = 'button-container-fixed'
}

@Component({
  selector: 'app-button-doc-code',
  templateUrl: './button-doc-code.component.html',
  styleUrls: ['./button-documentation.component.scss']
})
export class ButtonDocCodeComponent implements OnInit {
  altLangLink = 'buttonDocumentation';
  layoutFluid: boolean = true;

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  formButton = new FormGroup({});

  buttonConfig: IButtonConfig = {
    id: 'button',
    color: ButtonColor.CTA,
    disabled: false,
    icon: undefined,
    size: 'large'
  };

  buttonConfigCodeView: any = {
    id: this.buttonConfig.id,
    formGroup: `new FormGroup({})`,
    category: this.buttonConfig.category,
    color: this.buttonConfig.color,
    size: this.buttonConfig.size,
    ariaLabel: this.buttonConfig.ariaLabel,
    disabled: this.buttonConfig.disabled,
    icon: this.buttonConfig.icon,
    iconDirection: this.buttonConfig.iconDirection,
    tabIndex: this.buttonConfig.tabIndex
  };

  codeViewConfig: ICodeViewerConfig = {
    id: 'button-code-viewer',
    openAccordion: true,
    selected: 'html',
    tab: [
      {
        id: 'html',
        title: 'HTML',
        value:
          `<div class=${LayoutType.fluid}>\n` +
          '  <ircc-cl-lib-button [config]="buttonConfig"></ircc-cl-lib-button>\n' +
          '</div>'
      },
      {
        id: 'ts',
        title: 'TypeScript',
        value:
          "import { ButtonColor, IButtonConfig } from 'ircc-ds-angular-component-library';\n" +
          "import { FormGroup } from '@angular/forms';\n\n" +
          `buttonConfig: IButtonConfig = ${stringify(
            this.buttonConfigCodeView
          )}`
      }
    ]
  };

  checkboxes: ICheckBoxComponentConfig[] = [
    {
      id: 'showSelectToggle',
      formGroup: this.formButton,
      label: 'State',
      size: 'small',
      inlineLabel: 'Disabled'
    }
  ];

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'showSizeToggle',
      formGroup: this.formButton,
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
      formGroup: this.formButton,
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
      formGroup: this.formButton,
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
      formGroup: this.formButton,
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
      this.buttonConfig.iconDirection = undefined;
    }
  }

  /**
   * toggle between type of layout selected
   */
  handleLayoutToggle(value: any) {
    if (value['showLayoutToggle'] === 'Fluid') {
      this.layoutFluid = true;
      this.updateHtmlandCssCodeBlock(LayoutType.fluid);
    } else {
      this.layoutFluid = false;
      this.updateHtmlandCssCodeBlock(LayoutType.fixed);
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
    this.parseCodeViewConfig();
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
          this.formButton.addControl(
            toggle.id,
            new FormControl(toggle.options[0].text)
          );
          break;
        case 'showSizeToggle':
          this.formButton.addControl(
            toggle.id,
            new FormControl(toggle.options[1].text)
          );
          break;
        case 'showCriticalToggle':
          this.formButton.addControl(
            toggle.id,
            new FormControl(toggle.options[1].text)
          );
          break;
        default: {
          console.log('Default');
          this.formButton.addControl(
            toggle.id,
            new FormControl(toggle.options[0].text)
          );
        }
      }
    }
  }

  /**
   * Return mapping of button config from form values
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

  private updateHtmlandCssCodeBlock(layoutStyleClass: LayoutType) {
    const htmlIndex = this.codeViewConfig?.tab?.findIndex(
      (t) => t.id === 'html'
    );

    if (htmlIndex === undefined) return;
    if (this.codeViewConfig?.tab) {
      this.codeViewConfig.tab[htmlIndex].value =
        `<div class=${layoutStyleClass}>\n` +
        '  <ircc-cl-lib-button [config]="buttonConfig"></ircc-cl-lib-button>\n' +
        '</div>';
    }
  }

  private parseCodeViewConfig() {
    const index = this.codeViewConfig?.tab?.findIndex((t) => t.id === 'ts');
    if (-1 == index || !index) return;
    this.buttonConfigCodeView = {
      ...this.buttonConfigCodeView,
      id: this.buttonConfig.id,
      formGroup: `new FormGroup({})`,
      category: this.buttonConfig.category,
      color: this.buttonConfig.color,
      size: this.buttonConfig.size,
      ariaLabel: this.buttonConfig.ariaLabel,
      disabled: this.buttonConfig.disabled,
      icon: this.buttonConfig.icon,
      iconDirection: this.buttonConfig.iconDirection,
      tabIndex: this.buttonConfig.tabIndex
    };
    if (this.codeViewConfig?.tab) {
      this.codeViewConfig.tab[index].value =
        "import { ButtonColor, IButtonConfig } from 'ircc-ds-angular-component-library';\n" +
        "import { FormGroup } from '@angular/forms';\n\n" +
        `buttonConfig: IButtonConfig = ${stringify(this.buttonConfigCodeView)}`;
    }
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.checkboxes.forEach((checkbox) => {
      if (checkbox) {
        this.formButton.addControl(checkbox.id, new FormControl());
      }
    });

    this.toggles.forEach((toggle) => {
      if (toggle.options) {
        this.assignToggleDefaultValues(toggle.id, toggle);
      }
    });

    this.formButton.valueChanges.subscribe((value: any) => {
      this.buttonConfig = this.parseToggleConfig(value);
      this.parseCodeViewConfig();
    });
  }
}
