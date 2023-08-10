import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../../share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IAutocompleteComponent,
  ICheckBoxComponentConfig,
  IRadioInputComponentConfig,
  ITabNavConfig
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
  form_interactive_button = new FormGroup({});

  testArrays = TestArrays;

  config: IAutocompleteComponent = {
    id: 'auto-complete',
    formGroup: this.form,
    label: 'Label',
    hint: 'Hint',
    desc: 'Description',
    placeholder: 'Placeholder',
    size: 'small',
    required: true,
    suggestions: this.testArrays.quotes,
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'This Field is required'
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
          "import { IAutocompleteComponent } from 'ircc-ds-angular-component-library';\n" +
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

  // toggles: IRadioInputComponentConfig[] = [
  //   {
  //     id: 'showSizeToggle',
  //     formGroup: this.form_interactive_button,
  //     size: 'small',
  //     label: 'Size',
  //     options: [
  //       {
  //         text: 'Small'
  //       },
  //       {
  //         text: 'Large'
  //       }
  //     ]
  //   },
  //   {
  //     id: 'hint',
  //     formGroup: this.form,
  //     size: 'small',
  //     label: 'General.Hint',
  //     options: [
  //       {
  //         text: 'General.TrueLabel',
  //         value: 'True'
  //       },
  //       {
  //         text: 'General.FalseLabel',
  //         value: 'False'
  //       }
  //     ]
  //   }
  // ];

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
      label: 'ERROR.errorMessage',
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
    private slugify: SlugifyPipe
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
    this.config.formGroup.addControl(
      this.config.id,
      new FormControl(null, Validators.required)
    );
    if (!this.form.get(this.config.id)?.touched) {
      this.form.get(this.config.id)?.markAsTouched();
    }

    this.form_interactive_button.valueChanges.subscribe((change) => {
      this.autocompleteCodeView = {
        ...this.config,
        formGroup: `new FormGroup({})`
      };
      if (this.codeViewConfig.tab) {
        this.codeViewConfig.tab[1].value =
          "import { IAutocompleteComponent } from 'ircc-ds-angular-component-library';\n//...\n" +
          `config: IAutocompleteComponent = ${stringify(
            this.autocompleteCodeView
          )}\n\nthis.config.formGroup.addControl(this.config.id, new FormControl());\n\n//Note: Setting formControl state triggers disabled/enabled styling automatically \nthis.config.formGroup.get('formControlName')?.enable(); //sets the form control to be enabled`;
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
        } else {
          this.config.formGroup.get(this.config.id)?.enable(change);
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
          this.config.formGroup.removeControl(this.config.id);
          this.config.formGroup.addControl(
            this.config.id,
            new FormControl(null, Validators.required)
          );

          if (!this.form.get(this.config.id)?.touched) {
            this.form.get(this.config.id)?.markAsTouched();
          }
          this.config = {
            ...this.config,
            errorMessages: [
              {
                key: 'required',
                errorLOV: 'This Field is required'
              }
            ]
          };
        } else {
          this.config.formGroup.removeControl(this.config.id);
          this.config.formGroup.addControl(this.config.id, new FormControl());

          if (!this.form.get(this.config.id)?.touched) {
            this.form.get(this.config.id)?.markAsUntouched();
          }
          this.config = {
            ...this.config,
            errorMessages: undefined
          };
        }
      });
  }
}
