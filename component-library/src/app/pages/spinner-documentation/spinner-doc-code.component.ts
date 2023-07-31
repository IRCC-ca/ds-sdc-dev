import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {
  ICodeViewerConfig,
  stringify
} from '@app/components/code-viewer/code-viewer.component';
import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { TranslateService } from '@ngx-translate/core';
import {
  IRadioInputComponentConfig,
  ISpinnerConfig
} from 'ircc-ds-angular-component-library';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';

@Component({
  selector: 'app-spinner-doc-code',
  templateUrl: './spinner-doc-code.component.html',
  styleUrls: ['./spinner-doc-code.component.scss'],
  providers: [SlugifyPipe]
})
export class SpinnerDocCodeComponent implements OnInit {
  currentLanguage: string = '';
  altLangLink = 'spinnerDocCode';
  form_spinner = new FormGroup({});

  spinnerConfig: ISpinnerConfig = {
    id: 'spinner',
    size: 'small',
    label: '',
    description: '',
    type: 'active',
    orientation: 'horizontal'
  };

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'sizeToggle',
      formGroup: this.form_spinner,
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
    },
    {
      id: 'label',
      formGroup: this.form_spinner,
      size: 'small',
      label: 'General.LabelHeading',
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
      id: 'description',
      formGroup: this.form_spinner,
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
      id: 'type',
      formGroup: this.form_spinner,
      size: 'small',
      label: 'General.StateLabel',
      options: [
        {
          text: 'General.ActiveLabel',
          value: 'active'
        },
        {
          text: 'General.SuccessHeading',
          value: 'success'
        },
        {
          text: 'ERROR.errorMessage',
          value: 'critical'
        }
      ]
    },
    {
      id: 'orientation',
      formGroup: this.form_spinner,
      size: 'small',
      label: 'General.Layout',
      options: [
        {
          text: 'General.Vertical',
          value: 'vertical'
        },
        {
          text: 'General.Horizontal',
          value: 'horizontal'
        }
      ]
    }
  ];

  spinnerConfigCodeView: any = {
    id: this.spinnerConfig.id,
    size: this.spinnerConfig.size,
    label: this.spinnerConfig.label,
    description: this.spinnerConfig.description,
    type: this.spinnerConfig.type,
    orientation: this.spinnerConfig.orientation
  };

  codeViewConfig: ICodeViewerConfig = {
    id: 'spinner-viewer',
    openAccordion: true,
    selected: 'html',
    tab: [
      {
        id: 'html',
        title: 'HTML',
        value: `<ircc-cl-lib-spinner [config]="spinnerConfig"></ircc-cl-lib-spinner>`
      },
      {
        id: 'ts',
        title: 'TypeScript',
        value:
          "import { ISpinnerConfig } from 'ircc-ds-angular-component-library';\n\n" +
          `spinnerConfig: ISpinnerConfig = ${stringify(
            this.spinnerConfigCodeView
          )} 
          `
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

    this.form_spinner.addControl(this.spinnerConfig.id, new FormControl());

    this.toggles.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.form_spinner.addControl(
          toggle.id,
          new FormControl(toggle.options[1].value)
        );
      }
    });

    this.form_spinner.patchValue({
      size: 'Small',
      label: 'False',
      description: 'False',
      type: 'active',
      orientation: 'horizontal'
    });

    this.form_spinner.valueChanges.subscribe((value: any) => {
      this.spinnerConfig = this.parseToggleConfig(value);
      this.parseCodeViewConfig();
    });
  }

  /**
   * Return mapping of Spinner config from form values
   */
  private parseToggleConfig(value: any): ISpinnerConfig {
    return {
      ...this.spinnerConfig,
      size: value['sizeToggle'],
      label: value['label'] === 'True' ? 'label text' : undefined,
      description:
        value['description'] === 'True'
          ? 'Description line of text'
          : undefined,
      type: value['type'],
      orientation: value['orientation']
    };
  }

  private parseCodeViewConfig() {
    const index = this.codeViewConfig?.tab?.findIndex((t) => t.id === 'ts');
    if (-1 == index || !index) return;
    this.spinnerConfigCodeView = {
      ...this.spinnerConfigCodeView,
      size: this.spinnerConfig.size,
      label: this.spinnerConfig.label,
      description: this.spinnerConfig.description,
      type: this.spinnerConfig.type,
      orientation: this.spinnerConfig.orientation
    };
    if (this.codeViewConfig?.tab) {
      this.codeViewConfig.tab[index].value =
        "import { ISpinnerConfig } from 'ircc-ds-angular-component-library';\n\n" +
        `spinnerConfig: ISpinnerConfig = ${stringify(
          this.spinnerConfigCodeView
        )} 
      `;
    }
  }
}
