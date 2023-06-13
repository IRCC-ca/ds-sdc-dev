import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  IBannerConfig,
  ICTAConfig,
  IRadioInputComponentConfig,
  ITabNavConfig
} from 'ircc-ds-angular-component-library';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import {
  ICodeViewerConfig,
  stringify
} from '@app/components/code-viewer/code-viewer.component';

const NUMBER_OF_CTA_ALLOWED: number = 3;

@Component({
  selector: 'app-banner-doc-code',
  templateUrl: './banner-doc-code.component.html',
  styleUrls: ['./banner-doc-code.component.scss']
})
export class BannerDocCodeComponent implements OnInit {
  @ViewChild('banner', { static: false }) banner!: ElementRef;
  altLangLink = 'bannerDocumentation';

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  form_interactive_banner = new FormGroup({});

  currentButtonSet = new Set<string>();
  buttonSetWithAllOptions = new Set<string>([
    'showPrimaryButtonToggle',
    'showSecondaryButtonToggle',
    'showPlainButtonToggle',
    'showLinkToggle'
  ]);

  bannerConfig: IBannerConfig = {
    id: 'banner',
    cta: [],
    size: 'large'
  };

  bannerConfigCodeView: any = {
    id: this.bannerConfig.id,
    title: this.bannerConfig.title,
    content: this.bannerConfig.content,
    type: this.bannerConfig.type,
    rounded: this.bannerConfig.rounded,
    dismissible: this.bannerConfig.dismissible,
    cta: this.bannerConfig.cta,
    size: this.bannerConfig.size,
    ariaDissmissible: this.bannerConfig.ariaDissmissible
  };

  codeViewConfig: ICodeViewerConfig = {
    id: 'banner-code-viewer',
    openAccordion: true,
    selected: 'html',
    tab: [
      {
        id: 'html',
        title: 'HTML',
        value:
          `<div>\n` +
          '  <ircc-cl-lib-banner [config]="bannerConfig"></ircc-cl-lib-banner>\n' +
          '</div>'
      },
      {
        id: 'ts',
        title: 'TypeScript',
        value:
          "import { IBannerConfig } from 'ircc-ds-angular-component-library';\n\n" +
          `bannerConfig: IBannerConfig = ${stringify(
            this.bannerConfigCodeView
          )}`
      }
    ]
  };

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'showSizeToggle',
      formGroup: this.form_interactive_banner,
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
      id: 'showTitleToggle',
      formGroup: this.form_interactive_banner,
      label: 'Banner.BannerConfig.ShowTitleLabel',
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
      id: 'showDescToggle',
      formGroup: this.form_interactive_banner,
      label: 'Banner.BannerConfig.ShowDescriptionLabel',
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
      id: 'showCloseToggle',
      formGroup: this.form_interactive_banner,
      label: 'Banner.BannerConfig.ShowCloseLabel',
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
      id: 'showPrimaryButtonToggle',
      formGroup: this.form_interactive_banner,
      label: 'Banner.BannerConfig.ShowPrimaryButtonLabel',
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
      id: 'showSecondaryButtonToggle',
      formGroup: this.form_interactive_banner,
      label: 'Banner.BannerConfig.ShowSecondaryButtonLabel',
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
      id: 'showPlainButtonToggle',
      formGroup: this.form_interactive_banner,
      label: 'Banner.BannerConfig.ShowPlainButtonLabel',
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
      id: 'showLinkToggle',
      formGroup: this.form_interactive_banner,
      label: 'Banner.BannerConfig.ShowLinkLabel',
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
    }
  ];

  demoTabsConfig: ITabNavConfig = {
    id: 'demoTabs',
    size: 'small',
    tab: [
      {
        id: 'info',
        title: 'General.InfoHeading'
      },
      {
        id: 'warning',
        title: 'General.WarningHeading'
      },
      {
        id: 'critical',
        title: 'General.Critical'
      },
      {
        id: 'success',
        title: 'General.SuccessHeading'
      },
      {
        id: 'generic',
        title: 'General.GenericHeading'
      }
    ]
  };

  /**
   * Set banner type based on the tab selected
   */
  setBannerType(value: any) {
    if (value === 'info') {
      this.bannerConfig.type = 'info';
    } else if (value === 'warning') {
      this.bannerConfig.type = 'warning';
    } else if (value === 'success') {
      this.bannerConfig.type = 'success';
    } else if (value === 'generic') {
      this.bannerConfig.type = 'generic';
    } else if (value === 'critical') {
      this.bannerConfig.type = 'critical';
    }
    this.parseCodeViewConfig();
  }

  /**
   * Add item to CTA list
   */
  addItemtoCTAList(text: string) {
    const plainExample: ICTAConfig = {
      text: 'Plain',
      type: 'button',
      btnConfig: {
        id: 'ctaPlain',
        category: 'plain'
      }
    };

    const secondaryExample: ICTAConfig = {
      text: 'Secondary',
      type: 'button',
      btnConfig: {
        id: 'ctaSecondary',
        category: 'secondary'
      }
    };

    const primaryExample: ICTAConfig = {
      text: 'Primary',
      type: 'button',
      btnConfig: {
        id: 'ctaPrimary',
        category: 'primary'
      }
    };

    const linkExample: ICTAConfig = {
      text: 'Link-Text',
      type: 'link'
    };

    const indexOfObject: any = this.bannerConfig?.cta?.findIndex((object) => {
      return object.text === text;
    });

    if (indexOfObject == -1) {
      if (text === 'Primary') this.bannerConfig?.cta?.push(primaryExample);
      else if (text === 'Secondary')
        this.bannerConfig?.cta?.push(secondaryExample);
      else if (text === 'Plain') this.bannerConfig?.cta?.push(plainExample);
      else if (text === 'Link-Text') this.bannerConfig?.cta?.push(linkExample);
    }
  }

  /**
   * remove specific item from cta array if it exists
   */
  removeItemFromCTAList(text: string) {
    const indexOfObject: any = this.bannerConfig?.cta?.findIndex((object) => {
      return object.text === text;
    });

    if (indexOfObject !== -1) {
      this.bannerConfig?.cta?.splice(indexOfObject, 1);
    }
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
   * Handles banner dismiss animation
   */
  bannerClose(event: Event) {
    const bannerContainer = this.banner.nativeElement.querySelector(
      `#${event}`
    );
    setTimeout(function () {
      bannerContainer?.classList.remove('noDisplay');
      bannerContainer?.classList.add('bannerDismissed');
      setTimeout(function () {
        bannerContainer?.classList.remove('bannerDismissed');
      }, 700);
    }, 700);
  }

  /**
   * Disables/Enables button/link radios (Max 3 allowed on the banner at a time)
   */
  checkCurrentButtonCounter() {
    if (this.currentButtonSet.size >= NUMBER_OF_CTA_ALLOWED) {
      this.buttonSetWithAllOptions.forEach((btn) => {
        if (!this.currentButtonSet.has(btn)) {
          this.disableRadio(btn);
        }
      });
    } else {
      this.buttonSetWithAllOptions.forEach((btn) => {
        this.enableRadio(btn);
      });
    }
  }

  /**
   * Hide or show Primary button on test banner based on radio selection
   */
  handlePrimaryButtonToggle(value: any) {
    if (value['showPrimaryButtonToggle'] === 'True') {
      this.addItemtoCTAList('Primary');
      this.currentButtonSet.add('showPrimaryButtonToggle');
      this.checkCurrentButtonCounter();
    } else {
      this.removeItemFromCTAList('Primary');
      this.currentButtonSet.delete('showPrimaryButtonToggle');
      this.checkCurrentButtonCounter();
    }
  }

  /**
   * Hide or show Secondary button on test banner based on radio selection
   */
  handleSecondaryButtonToggle(value: any) {
    if (value['showSecondaryButtonToggle'] === 'True') {
      this.addItemtoCTAList('Secondary');
      this.currentButtonSet.add('showSecondaryButtonToggle');
      this.checkCurrentButtonCounter();
    } else {
      this.removeItemFromCTAList('Secondary');
      this.currentButtonSet.delete('showSecondaryButtonToggle');
      this.checkCurrentButtonCounter();
    }
  }

  /**
   * Hide or show plain button on test banner based on radio selection
   */
  handlePlainButtonToggle(value: any) {
    if (value['showPlainButtonToggle'] === 'True') {
      this.addItemtoCTAList('Plain');
      this.currentButtonSet.add('showPlainButtonToggle');
      this.checkCurrentButtonCounter();
    } else {
      this.removeItemFromCTAList('Plain');
      this.currentButtonSet.delete('showPlainButtonToggle');
      this.checkCurrentButtonCounter();
    }
  }

  /**
   * Hide or show Link on test banner based on radio selection
   */
  handleLinkToggle(value: any) {
    if (value['showLinkToggle'] === 'True') {
      this.addItemtoCTAList('Link-Text');
      this.currentButtonSet.add('showLinkToggle');
      this.checkCurrentButtonCounter();
    } else {
      this.removeItemFromCTAList('Link-Text');
      this.currentButtonSet.delete('showLinkToggle');
      this.checkCurrentButtonCounter();
    }
  }

  /**
   * Sets dismissable to true or false and sets ariaDismissable respectively based on radio selection
   */
  handleCloseToggle(value: any) {
    if (value['showCloseToggle'] === 'True') {
      this.bannerConfig.dismissible = true;
      this.bannerConfig.ariaDissmissible = 'close';
    } else {
      this.bannerConfig.dismissible = false;
      this.bannerConfig.ariaDissmissible = '';
    }
  }

  /**
   * Return mapping of input config from form values
   */
  private parseToggleConfig(value: any): IBannerConfig {
    return {
      ...this.bannerConfig,
      size: value['showSizeToggle'].toLowerCase(),
      title:
        value['showTitleToggle'] === 'True'
          ? (this.bannerConfig.title = 'Title text')
          : '',
      content:
        value['showDescToggle'] === 'True'
          ? (this.bannerConfig.content =
              'Description text lorem ipsum dolor sit amet consecteteur adipiscing elit.')
          : ''
    };
  }

  private parseCodeViewConfig() {
    const index = this.codeViewConfig?.tab?.findIndex((t) => t.id === 'ts');
    if (-1 == index || !index) return;
    this.bannerConfigCodeView = {
      ...this.bannerConfigCodeView,
      id: this.bannerConfig.id,
      title: this.bannerConfig.title,
      content: this.bannerConfig.content,
      type: this.bannerConfig.type,
      rounded: this.bannerConfig.rounded,
      dismissible: this.bannerConfig.dismissible,
      cta: this.bannerConfig.cta,
      size: this.bannerConfig.size,
      ariaDissmissible: this.bannerConfig.ariaDissmissible
    };
    if (this.codeViewConfig?.tab) {
      this.codeViewConfig.tab[index].value =
        "import { IBannerConfig } from 'ircc-ds-angular-component-library';\n\n" +
        `bannerConfig: IBannerConfig = ${stringify(this.bannerConfigCodeView)}`;
    }
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.toggles.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.form_interactive_banner.addControl(
          toggle.id,
          new FormControl(toggle.options[1].value)
        );
      }
    });

    this.form_interactive_banner.valueChanges.subscribe((value: any) => {
      this.handlePrimaryButtonToggle(value);
      this.handlePlainButtonToggle(value);
      this.handleSecondaryButtonToggle(value);
      this.handleLinkToggle(value);
      this.handleCloseToggle(value);
      this.bannerConfig = this.parseToggleConfig(value);
      this.parseCodeViewConfig();
    });
  }
}
