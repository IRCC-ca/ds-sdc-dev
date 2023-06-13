import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ICheckBoxComponentConfig,
  IIconButtonComponentConfig,
  IRadioInputComponentConfig,
  ITabNavConfig
} from 'ircc-ds-angular-component-library';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import {
  ICodeViewerConfig,
  stringify
} from '@app/components/code-viewer/code-viewer.component';

@Component({
  selector: 'app-icon-button-doc-code',
  templateUrl: './icon-button-doc-code.component.html',
  styleUrls: ['./icon-button-doc-code.component.scss']
})
export class IconButtonDocCodeComponent implements OnInit {
  @ViewChild('iconButton', { static: false }) iconButton!: ElementRef;
  altLangLink = 'iconButtonDocumentation';

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  form_interactive_iconBtn = new FormGroup({});

  iconBtnConfig: IIconButtonComponentConfig = {
    id: 'icon-button',
    category: 'primary',
    size: 'extraSmall',
    disabled: false
  };

  iconBtnConfigCodeView: any = {
    id: this.iconBtnConfig.id,
    category: this.iconBtnConfig.category,
    size: this.iconBtnConfig.size,
    disabled: this.iconBtnConfig.disabled
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
          `iconBtnConfig: IBannIIconButtonComponentConfigerConfig = ${stringify(
            this.iconBtnConfigCodeView
          )}`
      }
    ]
  };

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'showSizeToggle',
      formGroup: this.form_interactive_iconBtn,
      size: 'small',
      label: 'General.Size',
      options: [
        {
          text: 'General.ExtraSmall',
          value: 'Extra small'
        },
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
  ];

  checkboxes: ICheckBoxComponentConfig[] = [
    {
      id: 'showSelectToggle',
      formGroup: this.form_interactive_iconBtn,
      label: 'State',
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
        title: 'Primary'
      },
      {
        id: 'critical',
        title: 'Critical'
      },
    ]
  };

  /**
   * Set iconBtn type based on the tab selected
   */
  setIconBtnCategory(value: any) {
    if (value === 'primary') {
      this.iconBtnConfig.category = 'primary';
    } else if (value === 'critical') {
      this.iconBtnConfig.category = 'critical';
    }
    this.parseCodeViewConfig();
  }

  /**
   * disable radio button based on id
   */
  disableRadio(name: string) {
    this.toggles.forEach((item) => {
      if (item.id === name) {
        item.disabled = true;
      }
    });
  }

  /**
   * enable radio button based on id
   */
  enableRadio(name: string) {
    this.toggles.forEach((item) => {
      if (item.id === name) {
        item.disabled = false;
      }
    });
  }

  /**
   * Return mapping of iconBtnConfig from form values
   */
  private parseToggleConfig(value: any): IIconButtonComponentConfig {
    return {
      ...this.iconBtnConfig,
      size: value['showSizeToggle'].toLowerCase(),
      category: value === 'primary' ? (this.iconBtnConfig.category = 'primary') : (this.iconBtnConfig.category = 'critical'),
      disabled:
        value['disabled'] === true
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
      disabled: this.iconBtnConfig.disabled
      
    };
    if (this.codeViewConfig?.tab) {
      this.codeViewConfig.tab[index].value =
        "import { IIconButtonComponentConfig } from 'ircc-ds-angular-component-library';\n\n" +
        `iconBtnConfig: IIconButtonComponentConfig = ${stringify(this.iconBtnConfigCodeView)}`;
    }
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
    
    this.checkboxes.forEach((checkbox) => {
      if (checkbox) {
        this.form_interactive_iconBtn.addControl(checkbox.id, new FormControl());
      }
    });

    this.toggles.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.form_interactive_iconBtn.addControl(
          toggle.id,
          new FormControl(toggle.options[1].value)
        );
      }
    });

    this.form_interactive_iconBtn.valueChanges.subscribe((value: any) => {
      this.iconBtnConfig = this.parseToggleConfig(value)
      this.parseCodeViewConfig();
    });
  }
}
