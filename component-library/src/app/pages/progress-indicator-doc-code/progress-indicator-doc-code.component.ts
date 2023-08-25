import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {
  ICodeViewerConfig,
  stringify
} from '@app/components/code-viewer/code-viewer.component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { TranslateService } from '@ngx-translate/core';
import {
  IProgressIndicatorConfig,
  IRadioInputComponentConfig
} from 'ircc-ds-angular-component-library';
import { TranslatedPageComponent } from '../translated-page-component';

@Component({
  selector: 'app-progress-indicator-doc-code',
  templateUrl: './progress-indicator-doc-code.component.html',
  styleUrls: ['./progress-indicator-doc-code.component.scss'],
  providers: [SlugifyPipe]
})
export class ProgressIndicatorDocCodeComponent
  implements OnInit, TranslatedPageComponent
{
  currentLanguage: string = '';
  altLangLink = 'progressIndicator';
  formProgressIndicator = new FormGroup({});
  state: boolean = false;

  progressIndicatorConfig: IProgressIndicatorConfig = {
    id: 'progressIndicator',
    size: 'small',
    orientation: 'horizontal',
    steps: [
      {
        title: 'Step title',
        tagConfig: {
          id: 'tag',
          type: 'success',
          size: 'small'
        }
      }
    ]
  };

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'size',
      formGroup: this.formProgressIndicator,
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
      id: 'orientation',
      formGroup: this.formProgressIndicator,
      size: 'small',
      label: 'General.Layout',
      options: [
        {
          text: 'General.Horizontal',
          value: 'Horizanotal'
        },
        {
          text: 'General.Vertical',
          value: 'Vertical'
        }
      ]
    },
    {
      id: 'gated',
      formGroup: this.formProgressIndicator,
      size: 'small',
      label: 'General.Gated',
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
      id: 'step3',
      formGroup: this.formProgressIndicator,
      size: 'small',
      label: 'General.Step3',
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
      id: 'step4',
      formGroup: this.formProgressIndicator,
      size: 'small',
      label: 'General.Step4',
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

  progressIndicatorConfigCodeView: any = {
    id: this.progressIndicatorConfig.id,
    size: this.progressIndicatorConfig.size,
    orientation: this.progressIndicatorConfig.orientation,
    steps: this.progressIndicatorConfig.steps
  };

  codeViewConfig: ICodeViewerConfig = {
    id: 'progress-indicator-viewer',
    openAccordion: true,
    selected: 'html',
    tab: [
      {
        id: 'html',
        title: 'HTML',
        value: `<ircc-cl-lib-progress-indicator [config]="progressIndicatorConfig"></ircc-cl-lib-progress-indicator>`
      },
      {
        id: 'ts',
        title: 'TypeScript',
        value:
          "import { IProgressIndicatorConfig } from 'ircc-ds-angular-component-library';\n\n" +
          `progressIndicatorConfig: IProgressIndicatorConfig = ${stringify(
            this.progressIndicatorConfigCodeView
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

    this.formProgressIndicator.addControl(
      this.progressIndicatorConfig.id,
      new FormControl()
    );

    this.toggles.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.formProgressIndicator.addControl(
          toggle.id,
          new FormControl(toggle.options[1].value)
        );
      }
    });

    this.formProgressIndicator.patchValue({
      size: 'Small',
      layout: 'Horizontal',
      gated: 'False',
      step3: 'True',
      step4: 'True'
    });

    this.formProgressIndicator.valueChanges.subscribe((value: any) => {
      this.parseToggleConfig(value);
      this.parseCodeViewConfig();
    });
  }

  private parseToggleConfig(value: any): IProgressIndicatorConfig {
    return {
      ...this.progressIndicatorConfig,
      size: value['sizeToggle'],
      orientation: value['orientation']
      // gated: value['gated'] === 'Flase',
      // step3: value['step3'] === 'True',
      // step4: value['step4'] === 'True'
    };
  }

  private parseCodeViewConfig() {
    const index = this.codeViewConfig?.tab?.findIndex((t) => t.id === 'ts');
    if (-1 == index || !index) return;
    this.progressIndicatorConfigCodeView = {
      ...this.progressIndicatorConfigCodeView,
      size: this.progressIndicatorConfig.size,
      orientation: this.progressIndicatorConfig.orientation
    };
    if (this.codeViewConfig?.tab) {
      this.codeViewConfig.tab[index].value =
        "import { IProgressIndicatorConfig } from 'ircc-ds-angular-component-library';\n\n" +
        `progressIndicatorConfig: IProgressIndicatorConfig = ${stringify(
          this.progressIndicatorConfigCodeView
        )} 
      `;
    }
  }
}
