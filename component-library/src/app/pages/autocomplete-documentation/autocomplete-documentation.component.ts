import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../../share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IAutocompleteComponent,
  IBannerConfig,
  ICheckBoxComponentConfig,
  IRadioInputComponentConfig,
  ITabNavConfig,
  StandAloneFunctions
} from 'ircc-ds-angular-component-library';
import { TranslatedPageComponent } from '../translated-page-component';

import TestArrays from './TestArrays';
import {
  ICodeViewerConfig,
  stringify
} from '@app/components/code-viewer/code-viewer.component';

@Component({
  selector: 'app-autocomplete-documentation',
  templateUrl: './autocomplete-documentation.component.html',
  styleUrls: ['./autocomplete-documentation.component.scss'],
  providers: [SlugifyPipe]
})
export class AutocompleteDocumentationComponent
  implements OnInit, TranslatedPageComponent
{
  currentLanguage: string = '';
  altLangLink = 'autocomplete';
  form: FormGroup = new FormGroup({});
  form_interactive_button: FormGroup = new FormGroup({});

  testArrays = TestArrays;

  config: IAutocompleteComponent = {
    id: 'auto-complete',
    formGroup: this.form,
    label: 'Label',
    hint: '',
    desc: '',
    placeholder: 'Placeholder',
    size: 'small',
    required: true,
    suggestions: this.testArrays.quotes,
    errorMessages: [
      {
        key: 'required',
        errorLOV: this.translate.instant('ERROR.fieldIsRequired')
      }
    ]
  };

  autocompleteCodeView: any = {
    id: this.config.id,
    formGroup: `new FormGroup({})`,
    label: this.config.label,
    desc: this.config.desc,
    hint: this.config.hint,
    placeholder: this.config.placeholder,
    size: this.config.size,
    required: this.config.required,
    suggestions: this.testArrays.quotes
  };

  codeViewConfig: ICodeViewerConfig = {
    id: 'button-code-viewer',
    openAccordion: true,
    selected: 'html',
    tab: [
      {
        id: 'html',
        title: 'HTML',
        value: `<app-code-viewer [config]="codeViewConfig"></app-code-viewer>`
      },
      {
        id: 'ts',
        title: 'TypeScript',
        value:
          "import { IAutocompleteComponent } from 'ircc-ds-angular-component-library';\n\n" +
          `config: IAutocompleteComponent = ${stringify(
            this.autocompleteCodeView
          )}\nthis.config.formGroup.addControl(this.config.id, new FormControl());`
      }
    ]
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
      id: 'size',
      formGroup: this.form_interactive_button,
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
      id: 'hint',
      formGroup: this.form_interactive_button,
      size: 'small',
      label: 'General.Hint',
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
      id: 'required',
      formGroup: this.form_interactive_button,
      size: 'small',
      label: 'General.Required',
      options: [
        {
          text: 'True',
          value: 'True'
        },
        {
          text: 'False',
          value: 'False'
        }
      ]
    },
    {
      id: 'error',
      formGroup: this.form_interactive_button,
      size: 'small',
      label: 'General.Error',
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
      id: 'desc',
      formGroup: this.form_interactive_button,
      size: 'small',
      label: 'General.Description',
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
      id: 'placeholder',
      formGroup: this.form_interactive_button,
      size: 'small',
      label: 'General.Placeholder',
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

  bannerConfig: IBannerConfig = {
    id: 'banner-disabled-desc',
    type: 'info',
    size: 'small',
    title: 'General.EnabledBannerTitle',
    content: 'General.EnabledBannerContent',
    rounded: true
  };

  demoTabsConfig: ITabNavConfig = {
    id: 'demoTabs',
    size: 'small',
    tab: [
      {
        id: 'basic',
        title: 'Basic'
      }
    ]
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private slugify: SlugifyPipe,
    private standalone: StandAloneFunctions
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
    this.config.formGroup.addControl(this.config.id, new FormControl());

    this.config.formGroup.valueChanges.subscribe((changes) => {
      // Stop user input from clearing error messages if error is toggled to True
      if (this.form_interactive_button.get('error')?.value === 'True') {
        this.standalone.setFormErrors(this.config.formGroup, this.config.id, [
          'required'
        ]);
      }
    });

    this.form_interactive_button.valueChanges.subscribe((change) => {
      this.autocompleteCodeView = {
        ...this.config,
        formGroup: `new FormGroup({})`
      };
      if (this.codeViewConfig.tab) {
        this.codeViewConfig.tab[1].value =
          "import { IAutocompleteComponent } from 'ircc-ds-angular-component-library';\n\n" +
          `config: IAutocompleteComponent = ${stringify(
            this.autocompleteCodeView
          )}`;
      }
    });

    this.form_interactive_button.addControl(
      this.checkboxes[0].id,
      new FormControl()
    );

    this.form_interactive_button
      .get(this.checkboxes[0].id)
      ?.valueChanges.subscribe((change) => {
        if (change) {
          this.config.formGroup.get(this.config.id)?.disable(change);
          this.bannerConfig.title = 'General.DisabledBannerTitle';
          this.bannerConfig.content = 'General.DisabledBannerContent';
        } else {
          this.config.formGroup.get(this.config.id)?.enable(change);
          this.bannerConfig.title = 'General.EnabledBannerTitle';
          this.bannerConfig.content = 'General.EnabledBannerContent';
        }
      });

    this.toggles.forEach((toggle) => {
      if (toggle.options && toggle.options[0].text) {
        this.form_interactive_button.addControl(
          toggle.id,
          new FormControl(toggle.options[0].value)
        );
      }
    });

    // Set initial values for config toggles
    this.form_interactive_button.patchValue({
      hint: 'False',
      error: 'False',
      desc: 'False'
    });

    this.form_interactive_button
      .get('size')
      ?.valueChanges.subscribe((change: string) => {
        this.config = {
          ...this.config,
          size: change === 'Large' ? 'large' : 'small'
        };
      });

    this.form_interactive_button
      .get('hint')
      ?.valueChanges.subscribe((change: string) => {
        this.config = {
          ...this.config,
          hint: change === 'True' ? 'Hint' : ''
        };
      });

    this.form_interactive_button
      .get('required')
      ?.valueChanges.subscribe((change: string) => {
        this.config = {
          ...this.config,
          required: change === 'True' ? true : false
        };
      });

    this.form_interactive_button
      .get('desc')
      ?.valueChanges.subscribe((change: string) => {
        this.config = {
          ...this.config,
          desc: change === 'True' ? 'Description' : ''
        };
      });

    this.form_interactive_button
      .get('placeholder')
      ?.valueChanges.subscribe((change: string) => {
        this.config = {
          ...this.config,
          placeholder: change === 'True' ? 'Placeholder' : ''
        };
      });

    this.form_interactive_button
      .get('error')
      ?.valueChanges.subscribe((change: string) => {
        if (change === 'True') {
          this.standalone.setFormErrors(this.config.formGroup, this.config.id, [
            'required'
          ]);
          this.config = {
            ...this.config,
            errorMessages: [
              {
                key: 'required',
                errorLOV: 'ERROR.fieldIsRequired'
              }
            ]
          };
        } else {
          this.standalone.setFormErrors(
            this.config.formGroup,
            this.config.id,
            []
          );
          this.config = {
            ...this.config,
            errorMessages: undefined
          };
        }
      });
  }
}
