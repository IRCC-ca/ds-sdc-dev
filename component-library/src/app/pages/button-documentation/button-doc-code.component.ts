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
  IBannerConfig,
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
import { TranslatedPageComponent } from '../translated-page-component';

export enum LayoutType {
  'fluid' = 'button-container-fluid',
  'fixed' = 'button-container-fixed'
}

@Component({
  selector: 'app-button-doc-code',
  templateUrl: './button-doc-code.component.html',
  styleUrls: ['./button-documentation.component.scss']
})
export class ButtonDocCodeComponent implements OnInit, TranslatedPageComponent {
  altLangLink = 'buttons';
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
      label: 'General.StateLabel',
      size: 'small',
      inlineLabel: 'General.DisabledLabel'
    }
  ];

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'showSizeToggle',
      formGroup: this.formButton,
      size: 'small',
      label: 'General.Size',
      options: [
        {
          text: 'General.Small',
          value: 'Small'
        },
        {
          text: 'General.Large',
          value: 'Large'
        }
      ]
    },
    {
      id: 'showCriticalToggle',
      formGroup: this.formButton,
      label: 'General.Critical',
      size: 'small',
      options: [
        {
          text: 'General.TrueLabel',
          value: 'True'
        },
        {
          text: 'General.FalseLabel',
          value: 'False'
        }
      ]
    },
    {
      id: 'showLayoutToggle',
      formGroup: this.formButton,
      label: 'General.Layout',
      size: 'small',
      options: [
        {
          text: 'Buttons.ConfigLayoutFluid',
          value: 'Fluid'
        },
        {
          text: 'Buttons.ConfigLayoutFixed',
          value: 'Fixed'
        }
      ]
    },
    {
      id: 'showIconToggle',
      formGroup: this.formButton,
      label: 'Buttons.ConfigIconHeading',
      size: 'small',
      options: [
        {
          text: 'General.NoneErr',
          value: 'None'
        },
        {
          text: 'Buttons.ConfigIconLeading',
          value: 'Leading'
        },
        {
          text: 'Buttons.ConfigIconTrailing',
          value: 'Trailing'
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
        title: 'General.Primary'
      },
      {
        id: 'secondary',
        title: 'Buttons.SecondaryHeading'
      },
      {
        id: 'plain',
        title: 'Buttons.PlainHeading'
      }
    ]
  };

  bannerConfig: IBannerConfig = {
    id: 'banner-disabled-desc',
    type: 'info',
    size: 'small',
    title: 'General.EnabledBannerTitle',
    content: 'General.EnabledBannerContent',
    rounded: true
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
            new FormControl(toggle.options[0].value)
          );
          break;
        case 'showSizeToggle':
          this.formButton.addControl(
            toggle.id,
            new FormControl(toggle.options[0].value)
          );
          break;
        case 'showCriticalToggle':
          this.formButton.addControl(
            toggle.id,
            new FormControl(toggle.options[1].value)
          );
          break;
        default: {
          console.log('Default');
          this.formButton.addControl(
            toggle.id,
            new FormControl(toggle.options[0].value)
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

    this.formButton
      .get(this.checkboxes[0].id)
      ?.valueChanges.subscribe((change) => {
        if (change) {
          this.bannerConfig.title = 'General.DisabledBannerTitle';
          this.bannerConfig.content = 'General.DisabledBannerContent';
        } else {
          this.bannerConfig.title = 'General.EnabledBannerTitle';
          this.bannerConfig.content = 'General.EnabledBannerContent';
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
