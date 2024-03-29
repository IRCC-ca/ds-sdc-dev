import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ICheckBoxComponentConfig,
  IIconButtonComponentConfig,
  IRadioInputComponentConfig,
  ITabNavConfig,
  CLASS_X_MARK,
  CLASS_TRASHCAN,
  IconButtonCategories,
  IBannerConfig
} from 'ircc-ds-angular-component-library';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import {
  ICodeViewerConfig,
  stringify
} from '@app/components/code-viewer/code-viewer.component';
import { TranslatedPageComponent } from '../translated-page-component';

@Component({
  selector: 'app-icon-button-doc-code',
  templateUrl: './icon-button-doc-code.component.html',
  styleUrls: ['./icon-button-doc-code.component.scss']
})
export class IconButtonDocCodeComponent
  implements OnInit, TranslatedPageComponent
{
  @ViewChild('iconButton', { static: false }) iconButton!: ElementRef;
  altLangLink = 'iconButton';

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  formIconBtn = new FormGroup({});

  iconBtnConfig: IIconButtonComponentConfig = {
    id: 'icon-button',
    category: IconButtonCategories.primary,
    size: 'extraSmall',
    disabled: false,
    icon: {
      class: 'fa-light'
    }
  };

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'sizeToggle',
      formGroup: this.formIconBtn,
      size: 'small',
      label: 'General.Size',
      options: [
        {
          text: 'General.ExtraSmall',
          value: 'extraSmall'
        },
        {
          text: 'General.Small',
          value: 'small'
        },
        {
          text: 'General.Large',
          value: 'large'
        }
      ]
    }
  ];

  checkboxes: ICheckBoxComponentConfig[] = [
    {
      id: 'stateToggle',
      formGroup: this.formIconBtn,
      label: 'General.StateLabel',
      size: 'small',
      inlineLabel: 'Disabled'
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
        id: 'critical',
        title: 'General.Critical'
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

  iconBtnConfigCodeView: any = {
    id: this.iconBtnConfig.id,
    category: this.iconBtnConfig.category,
    size: this.iconBtnConfig.size,
    disabled: this.iconBtnConfig.disabled,
    icon: this.iconBtnConfig.icon
  };

  codeViewConfig: ICodeViewerConfig = {
    id: 'icon-btn-code-viewer',
    openAccordion: true,
    selected: 'html',
    tab: [
      {
        id: 'html',
        title: 'HTML',
        value:
          `<div>\n` +
          '  <ircc-cl-lib-icon-button [config]="iconBtnConfig"></ircc-cl-lib-icon-button>\n' +
          '</div>'
      },
      {
        id: 'ts',
        title: 'TypeScript',
        value:
          "import { IIconButtonComponentConfig } from 'ircc-ds-angular-component-library';\n\n" +
          `iconBtnConfig: IIconButtonComponentConfig = ${stringify(
            this.iconBtnConfigCodeView
          )}`
      }
    ]
  };

  /**
   * Set iconBtn type based on the tab selected
   */
  setIconBtnCategory(value: any) {
    if (value === 'primary') {
      this.iconBtnConfig.category = 'primary';
      this.iconBtnConfig.icon = {
        class: CLASS_X_MARK,
        color: 'var(--text-primary)'
      };
    } else if (value === 'critical') {
      this.iconBtnConfig.category = 'critical';
      this.iconBtnConfig.icon = {
        class: CLASS_TRASHCAN,
        color: 'var(--critical-text)'
      };
    }

    this.parseCodeViewConfig();
  }

  /**
   * Return mapping of iconBtnConfig from form values
   */
  private parseToggleConfig(value: any): IIconButtonComponentConfig {
    return {
      ...this.iconBtnConfig,
      size: value['sizeToggle'],
      disabled:
        value['stateToggle'] === true
          ? (this.iconBtnConfig.disabled = true)
          : (this.iconBtnConfig.disabled = false)
    };
  }

  private parseCodeViewConfig() {
    const index = this.codeViewConfig?.tab?.findIndex((t) => t.id === 'ts');
    if (-1 == index || !index) return;
    this.iconBtnConfigCodeView = {
      ...this.iconBtnConfigCodeView,
      id: this.iconBtnConfig.id,
      category: this.iconBtnConfig.category,
      size: this.iconBtnConfig.size,
      disabled: this.iconBtnConfig.disabled,
      icon: this.iconBtnConfig.icon
    };
    if (this.codeViewConfig?.tab) {
      this.codeViewConfig.tab[index].value =
        "import { IIconButtonComponentConfig } from 'ircc-ds-angular-component-library';\n\n" +
        `iconBtnConfig: IIconButtonComponentConfig = ${stringify(
          this.iconBtnConfigCodeView
        )}`;
    }
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.checkboxes.forEach((checkbox) => {
      if (checkbox) {
        this.formIconBtn.addControl(checkbox.id, new FormControl());
      }
    });

    this.formIconBtn
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
      if (toggle.options && toggle.options[1].text) {
        this.formIconBtn.addControl(
          toggle.id,
          new FormControl(toggle.options[0].value)
        );
      }
    });

    this.formIconBtn.valueChanges.subscribe((value: any) => {
      this.iconBtnConfig = this.parseToggleConfig(value);
      this.parseCodeViewConfig();
    });
  }
}
