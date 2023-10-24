import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  IBannerConfig,
  BannerService,
  ICTAConfig,
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
import { Subscription } from 'rxjs';
import { TranslatedPageComponent } from '../translated-page-component';

const NUMBER_OF_CTA_ALLOWED: number = 3;

@Component({
  selector: 'app-banner-doc-code',
  templateUrl: './banner-doc-code.component.html',
  styleUrls: ['./banner-doc-code.component.scss']
})
export class BannerDocCodeComponent implements OnInit, TranslatedPageComponent {
  @ViewChild('banner', { static: false }) banner!: ElementRef;
  altLangLink = 'banner';

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private bannerService: BannerService
  ) {}

  formBanner = new FormGroup({});

  currentButtonSet = new Set<string>();
  buttonSetWithAllOptions = new Set<string>([
    'showPrimaryButtonToggle',
    'showSecondaryButtonToggle',
    'showPlainButtonToggle',
    'showLinkToggle'
  ]);

  bannerConfig: IBannerConfig = {
    id: 'banner',
    size: 'small',
    dismissible: true,
    title: 'Title text',
    content:
      'Description text lorem ipsum dolor sit amet consecteteur adipiscing elit.',
    cta: []
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

  configSubToggle?: Subscription;

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
      formGroup: this.formBanner,
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
      formGroup: this.formBanner,
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
      formGroup: this.formBanner,
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
      formGroup: this.formBanner,
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
      formGroup: this.formBanner,
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
      formGroup: this.formBanner,
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
      formGroup: this.formBanner,
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
      formGroup: this.formBanner,
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
    this.bannerService.setBanner(this.bannerConfig);
  }

  /**
   * Add item to CTA list
   */
  addItemtoCTAList(text: string) {
    const plainExample: ICTAConfig = {
      text: 'Default',
      type: 'button',
      btnConfig: {
        id: 'ctaPlain',
        category: 'plain',
        size: this.bannerConfig.size
      }
    };

    const secondaryExample: ICTAConfig = {
      text: 'Default',
      type: 'button',
      btnConfig: {
        id: 'ctaSecondary',
        category: 'secondary',
        size: this.bannerConfig.size
      }
    };

    const primaryExample: ICTAConfig = {
      text: 'Default',
      type: 'button',
      btnConfig: {
        id: 'ctaPrimary',
        category: 'primary',
        size: this.bannerConfig.size
      }
    };

    const linkExample: ICTAConfig = {
      text: 'Default',
      type: 'link'
    };

    const indexOfObject: any = this.bannerConfig?.cta?.findIndex((object) => {
      if (object.btnConfig?.category) {
        return object.btnConfig?.category === text;
      } else {
        return object.type === text;
      }
    });

    if (indexOfObject == -1) {
      if (text === 'primary') this.bannerConfig?.cta?.push(primaryExample);
      else if (text === 'secondary')
        this.bannerConfig?.cta?.push(secondaryExample);
      else if (text === 'plain') this.bannerConfig?.cta?.push(plainExample);
      else if (text === 'link') this.bannerConfig?.cta?.push(linkExample);
    }
  }

  /**
   * remove specific item from cta array if it exists
   */
  removeItemFromCTAList(text: string) {
    const indexOfObject: any = this.bannerConfig?.cta?.findIndex((object) => {
      if (object.btnConfig?.category) {
        return object.btnConfig?.category === text;
      } else {
        return object.type === text;
      }
    });

    if (indexOfObject !== -1) {
      this.bannerConfig?.cta?.splice(indexOfObject, 1);
    }
  }

  /**
   * disable radio button based on id
   */
  disableRadio(name: string) {
    this.formBanner.get(name)?.disable();
  }

  /**
   * enable radio button based on id
   */
  enableRadio(name: string) {
    this.formBanner.get(name)?.enable();
  }

  /**
   * Disables/Enables button/link radios (Max 3 allowed on the banner at a time)
   */
  checkCurrentButtonCounter() {
    if (this.currentButtonSet.size >= NUMBER_OF_CTA_ALLOWED) {
      this.buttonSetWithAllOptions.forEach((btn) => {
        if (!this.currentButtonSet.has(btn)) {
          if (!this.formBanner.get(btn)?.disabled) {
            this.disableRadio(btn);
          }
        }
      });
    } else {
        this.buttonSetWithAllOptions.forEach((btn) => {
          if (this.formBanner.get(btn)?.disabled) {
            this.enableRadio(btn);
          }
        });
      }
  }

  /**
   * Hide or show Primary button on test banner based on radio selection
   */
  handlePrimaryButtonToggle(value: any) {
    if (value === 'True') {
      this.addItemtoCTAList('primary');
      this.currentButtonSet.add('showPrimaryButtonToggle');
      this.checkCurrentButtonCounter();
    } else {
      this.removeItemFromCTAList('primary');
      this.currentButtonSet.delete('showPrimaryButtonToggle');
      this.checkCurrentButtonCounter();
    }
  }

  /**
   * Hide or show Secondary button on test banner based on radio selection
   */
  handleSecondaryButtonToggle(value: any) {
    if (value === 'True') {
      this.addItemtoCTAList('secondary');
      this.currentButtonSet.add('showSecondaryButtonToggle');
      this.checkCurrentButtonCounter();
    } else {
      this.removeItemFromCTAList('secondary');
      this.currentButtonSet.delete('showSecondaryButtonToggle');
      this.checkCurrentButtonCounter();
    }
  }

  /**
   * Hide or show plain button on test banner based on radio selection
   */
  handlePlainButtonToggle(value: any) {
    if (value === 'True') {
      this.addItemtoCTAList('plain');
      this.currentButtonSet.add('showPlainButtonToggle');
      this.checkCurrentButtonCounter();
    } else {
      this.removeItemFromCTAList('plain');
      this.currentButtonSet.delete('showPlainButtonToggle');
      this.checkCurrentButtonCounter();
    }
  }

  /**
   * Hide or show Link on test banner based on radio selection
   */
  handleLinkToggle(value: any) {
    if (value === 'True') {
      this.addItemtoCTAList('link');
      this.currentButtonSet.add('showLinkToggle');
      this.checkCurrentButtonCounter();
    } else {
      this.removeItemFromCTAList('link');
      this.currentButtonSet.delete('showLinkToggle');
      this.checkCurrentButtonCounter();
    }
  }

  /**
   * Sets dismissable to true or false and sets ariaDismissable respectively based on radio selection
   */
  handleCloseToggle(value: any) {
    if (value === 'True') {
      this.bannerConfig.dismissible = true;
      this.bannerConfig.ariaDissmissible = 'close';
    } else {
      this.bannerConfig.dismissible = false;
      this.bannerConfig.ariaDissmissible = '';
    }
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

  listOfConfigItems = [
    'showCloseToggle',
    'showDescToggle',
    'showLinkToggle',
    'showPlainButtonToggle',
    'showPrimaryButtonToggle',
    'showSecondaryButtonToggle',
    'showSizeToggle',
    'showTitleToggle'
  ];

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.toggles.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.formBanner.addControl(
          toggle.id,
          new FormControl(toggle.options[0].value)
        );
      }
    });

    // update default toggles to match figma
    this.formBanner.patchValue({
      showPrimaryButtonToggle: 'False',
      showPlainButtonToggle: 'False',
      showLinkToggle: 'False',
      showSecondaryButtonToggle: 'True'
    });
    this.handleSecondaryButtonToggle('True');

    this.listOfConfigItems.forEach((configItem) => {
      this.formBanner.get(configItem)?.valueChanges.subscribe((value: any) => {
        this.parseConfig(configItem, value);
      });
    });

    this.configSubToggle = this.bannerService.toggleSubjObs$.subscribe(
      (response) => {
        if (this.bannerConfig.id === response.id && response.value === false) {
          setTimeout(() => {
            this.bannerService.toggleBanner(this.bannerConfig.id, true);
          }, 2000);
        }
      }
    );
  }

  private updateCTAbuttonSize() {
    if (this.bannerConfig.cta && this.bannerConfig.cta?.length > 0) {
      const ctaArray = this.bannerConfig.cta;
      this.currentButtonSet.clear();
      this.bannerConfig.cta = []; //clear banner config cta

      //add buttons to the cta again with the updated size to maintain order
      ctaArray.forEach((btn: ICTAConfig) => {
        if (btn.btnConfig?.category === 'primary')
          this.handlePrimaryButtonToggle('True');
        else if (btn.btnConfig?.category === 'secondary')
          this.handleSecondaryButtonToggle('True');
        else if (btn.btnConfig?.category === 'plain')
          this.handlePlainButtonToggle('True');
        else if (btn.type === 'link') this.handleLinkToggle('True');
      });
    }
  }

  private parseConfig(type: string, value: any) {
    switch (type) {
      case 'showSizeToggle':
        this.bannerConfig = {
          ...this.bannerConfig,
          size: value.toLowerCase()
        };
        this.updateCTAbuttonSize();
        this.bannerService.setBanner(this.bannerConfig);
        break;
      case 'showTitleToggle':
        this.bannerConfig = {
          ...this.bannerConfig,
          title: value === 'True' ? 'Title text' : undefined
        };
        this.bannerService.setBanner(this.bannerConfig);
        break;
      case 'showDescToggle':
        this.bannerConfig = {
          ...this.bannerConfig,
          content:
            value === 'True'
              ? 'Description text lorem ipsum dolor sit amet consecteteur adipiscing elit.'
              : undefined
        };
        this.bannerService.setBanner(this.bannerConfig);
        break;
      case 'showCloseToggle':
        this.handleCloseToggle(value);
        break;
      case 'showPrimaryButtonToggle':
        this.handlePrimaryButtonToggle(value);
        break;
      case 'showSecondaryButtonToggle':
        this.handleSecondaryButtonToggle(value);
        break;
      case 'showPlainButtonToggle':
        this.handlePlainButtonToggle(value);
        break;
      case 'showLinkToggle':
        this.handleLinkToggle(value);
        break;
      default:
        break;
    }
    this.parseCodeViewConfig();
  }
}
