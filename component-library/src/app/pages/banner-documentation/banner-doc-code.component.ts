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

  interactiveDemoSlugTitleURLConfig: slugTitleURLConfig = {
    title: 'Interactive Demo',
    anchorType: slugAnchorType.primary
  };

  bannerConfig: IBannerConfig = {
    id: 'banner',
    cta: []
  };

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'showSizeToggle',
      formGroup: this.form_interactive_banner,
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
      id: 'showCloseToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show close',
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
      id: 'showTitleToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show title',
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
      id: 'showDescToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show description',
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
      id: 'showPrimaryButtonToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show primary button',
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
      id: 'showPlainButtonToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show plain button',
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
      id: 'showSecondaryButtonToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show secondary button',
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
      id: 'showLinkToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show link',
      size: 'small',
      options: [
        {
          text: 'True'
        },
        {
          text: 'False'
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
        title: 'Info'
      },
      {
        id: 'warning',
        title: 'Warning'
      },
      {
        id: 'critical',
        title: 'Critical'
      },
      {
        id: 'success',
        title: 'Success'
      },
      {
        id: 'generic',
        title: 'Generic'
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
      text: 'Link',
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
      else if (text === 'Link') this.bannerConfig?.cta?.push(linkExample);
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
   * Disables/Enables button/link radios (Max 2 allowed on the banner at a time)
   */
  checkCurrentButtonCounter() {
    if (this.currentButtonSet.size >= 2) {
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
      this.addItemtoCTAList('Link');
      this.currentButtonSet.add('showLinkToggle');
      this.checkCurrentButtonCounter();
    } else {
      this.removeItemFromCTAList('Link');
      this.currentButtonSet.delete('showLinkToggle');
      this.checkCurrentButtonCounter();
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
          : '',
      dismissible: value['showCloseToggle'] === 'True' ? true : false
    };
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.toggles.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.form_interactive_banner.addControl(
          toggle.id,
          new FormControl(toggle.options[1].text)
        );
      }
    });

    this.form_interactive_banner.valueChanges.subscribe((value: any) => {
      this.handlePrimaryButtonToggle(value);
      this.handlePlainButtonToggle(value);
      this.handleSecondaryButtonToggle(value), this.handleLinkToggle(value);
      this.bannerConfig = this.parseToggleConfig(value);
    });
  }
}
