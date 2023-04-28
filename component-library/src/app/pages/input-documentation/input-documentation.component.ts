import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslatedPageComponent } from '@app/pages/translated-page-component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { TranslateService } from '@ngx-translate/core';
import {
  slugTitleURLConfig,
  slugTitleURLType
} from '@app/components/title-slug-url/title-slug-url.component';
import {
  IBannerConfig,
  ICheckBoxComponentConfig,
  ICTAConfig,
  IInputComponentConfig,
  IRadioInputComponentConfig,
  ITabNavConfig
} from 'ircc-ds-angular-component-library';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-documentation',
  templateUrl: './input-documentation.component.html',
  styleUrls: ['./input-documentation.component.scss']
})
export class InputDocumentationComponent
  implements OnInit, TranslatedPageComponent
{
  altLangLink = 'inputDocumentation';

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  @ViewChild('input', { static: false }) banner!: ElementRef;

  form_interactive_input = new FormGroup({});

  currentButtonSet = new Set<string>();
  buttonSetWithAllOptions = new Set<string>([
    'showPrimaryButtonToggle',
    'showSecondaryButtonToggle',
    'showPlainButtonToggle',
    'showLinkToggle'
  ]);

  interactiveDemoSlugTitleURLConfig: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Interactive Demo'
  };

  bannerConfig: IBannerConfig = {
    id: 'banner',
    cta: []
  };

  inputConfig: IInputComponentConfig = {
    id: 'input',
    formGroup: this.form_interactive_input,
    label: 'Label text',
    desc: 'Description line of text',
    errorMessages: [
      { key: 'invalid', errorLOV: 'ERROR.fieldIsInvalid' },
      { key: 'testingError', errorLOV: 'ERROR.testErrorMessage' },
      { key: 'maxlength', errorLOV: 'ERROR.fieldExceededMaxLength' }
    ]
  };

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'size',
      formGroup: this.form_interactive_input,
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
      id: 'hint',
      formGroup: this.form_interactive_input,
      label: 'Hint',
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
      id: 'required',
      formGroup: this.form_interactive_input,
      label: 'Required',
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
      id: 'error',
      formGroup: this.form_interactive_input,
      label: 'Error',
      options: [
        {
          text: 'None'
        },
        {
          text: 'Single'
        },
        {
          text: 'Multiple'
        }
      ]
    },
    {
      id: 'desc',
      formGroup: this.form_interactive_input,
      label: 'Description',
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
      id: 'placeholder',
      formGroup: this.form_interactive_input,
      label: 'Placeholder',
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

  checkboxes: ICheckBoxComponentConfig[] = [
    {
      id: 'state',
      formGroup: this.form_interactive_input,
      label: 'State',
      inlineLabel: 'Disabled'
    }
  ];

  demoTabsConfig: ITabNavConfig = {
    id: 'demoTabs',
    tab: [
      {
        id: 'basic',
        title: 'Basic'
      },
      {
        id: 'password',
        title: 'Password'
      }
    ]
  };

  setBannerType(value: any) {
    switch (value) {
      case 'password':
        this.inputConfig.type = 'password';
        break;
      default:
        this.inputConfig.type = 'text';
        break;
    }
  }

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

  removeItemFromCTAList(text: string) {
    const indexOfObject: any = this.bannerConfig?.cta?.findIndex((object) => {
      return object.text === text;
    });

    if (indexOfObject !== -1) {
      this.bannerConfig?.cta?.splice(indexOfObject, 1);
    }
  }

  disableRadio(name: string) {
    this.toggles.forEach((item) => {
      if (item.id === name) {
        item.disabled = true;
      }
    });
  }

  enableRadio(name: string) {
    this.toggles.forEach((item) => {
      if (item.id === name) {
        item.disabled = false;
      }
    });
  }

  bannerClose(event: Event) {
    const bannerContainer = this.banner.nativeElement.querySelector(
      `#${event}`
    );
    setTimeout(function () {
      bannerContainer?.classList.remove('noDisplay');
    }, 1000);
  }

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

  handleSizeToggle(value: any): IInputComponentConfig {
    return {
      ...this.inputConfig,
      size: value['size'].toLowerCase()
    };
  }

  handleHintToggle(value: any): IInputComponentConfig {
    return {
      ...this.inputConfig,
      hint: value['hint'] === 'True' ? 'Hint text' : ''
    };
  }
  handleRequiredToggle(value: any): IInputComponentConfig {
    return {
      ...this.inputConfig,
      required: value['required'] === 'True'
    };
  }

  handleCloseToggle(value: any) {
    if (value['showCloseToggle'] === 'True') {
      this.bannerConfig.dismissible = true;
    } else {
      this.bannerConfig.dismissible = false;
    }
  }

  handleTitleToggle(value: any) {
    if (value['showTitleToggle'] === 'True') {
      this.bannerConfig.title = 'Title text';
    } else {
      this.bannerConfig.title = '';
    }
  }

  handleDescToggle(value: any) {
    if (value['showDescToggle'] === 'True') {
      this.bannerConfig.content =
        'Description text lorem ipsum dolor sit amet consecteteur adipiscing elit.';
    } else {
      this.bannerConfig.content = '';
    }
  }

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

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.form_interactive_input.addControl(
      this.inputConfig.id,
      new FormControl()
    );

    this.toggles.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.form_interactive_input.addControl(
          toggle.id,
          new FormControl(toggle.options[1].text)
        );
      }
    });

    this.checkboxes.forEach((checkbox) => {
      this.form_interactive_input.addControl(checkbox.id, new FormControl());
    });

    this.form_interactive_input.valueChanges.subscribe((value: any) => {
      this.inputConfig = this.parseToggleConfig(value);
      if (value['error']) this.toggleErrors(value['error']);
      if (value['state'] !== undefined) this.toggleDisabled(value['state']);
    });
  }

  /**
   * Return mapping of input config from form values
   */
  private parseToggleConfig(value: any): IInputComponentConfig {
    return {
      ...this.inputConfig,
      size: value['size'].toLowerCase(),
      hint: value['hint'] === 'True' ? 'Hint text' : '',
      required: value['required'] === 'True',
      desc: value['desc'] === 'True' ? 'Description line of text' : '',
      placeholder: value['placeholder'] === 'True' ? 'Placeholder text' : ''
    };
  }

  private toggleErrors(error: string) {
    switch (error) {
      case 'None':
        this.form_interactive_input
          .get(this.inputConfig.id)
          ?.setErrors({ errors: null });
        break;
      case 'Single':
        this.form_interactive_input.get(this.inputConfig.id)?.setErrors({
          invalid: true
        });
        break;
      case 'Multiple':
        this.form_interactive_input.get(this.inputConfig.id)?.setErrors({
          invalid: true,
          testingError: true,
          maxlength: { requiredLength: 3, actualLength: 5 }
        });
        break;
    }
  }

  private toggleDisabled(disabled: boolean) {
    const inputControl: AbstractControl | null =
      this.form_interactive_input.get(this.inputConfig.id);
    if (
      (disabled && inputControl?.disabled) ||
      (!disabled && inputControl?.enabled)
    )
      return;

    if (disabled) {
      inputControl?.disable();
    } else {
      inputControl?.enable();
    }
  }
}
