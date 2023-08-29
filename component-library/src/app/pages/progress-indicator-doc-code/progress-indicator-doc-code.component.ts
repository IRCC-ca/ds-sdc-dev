import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
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
  formProgressIndicator: FormGroup = new FormGroup({});
  isMobile = false;

  progressIndicatorConfig: IProgressIndicatorConfig = {
    id: 'progress_indicator',
    size: 'small',
    orientation: 'horizontal',
    steps: [
      {
        title: 'General.stepTitle',
        tagConfig: {
          id: 'progress_indicator_step1',
          type: 'success'
        }
      },
      {
        title: 'General.stepTitle',
        tagConfig: {
          id: 'progress_indicator_step2',
          type: 'primary'
        }
      },
      {
        title: 'General.stepTitle',
        tagConfig: {
          id: 'progress_indicator_step3',
          type: 'critical'
        }
      },
      {
        title: 'General.stepTitle',
        tagConfig: {
          id: 'progress_indicator_step4',
          type: 'notStarted'
        }
      }
    ]
    // gated: false
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
          value: 'horizontal'
        },
        {
          text: 'General.Vertical',
          value: 'vertical'
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
    // gated: this.progressIndicatorConfig.gated
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
    @Inject(PLATFORM_ID) private platformId: object,
    private translate: TranslateService,
    private lang: LangSwitchService,
    private slugify: SlugifyPipe
  ) {
    this.currentLanguage = translate.currentLang;
    // this.isMobile = window.innerWidth <= 360;
  }

  @HostListener('window:resize', ['$event'])
  // handleResize(e: any) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.isMobile = window.innerWidth <= 768;
  //     this.progressIndicatorConfig.orientation = 'vertical';
  //     this.toggles.forEach(toggle => {
  //       if (toggle.id === 'orientation') {
  //         toggle.options?.forEach(option => {
  //           option.value = 'vertical'
  //         });
  //       }
  //     })
  //   }
  // }
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
      if (window.innerWidth <= 768 && toggle.id === 'orientation') {
        this.progressIndicatorConfig.orientation = 'vertical';
        toggle.options?.forEach((option) => {
          option.value = 'vertical';
        });
      }
    });

    this.formProgressIndicator.patchValue({
      size: 'Small',
      orientation: 'horizontal',
      gated: 'False',
      step3: 'True',
      step4: 'True'
    });

    this.formProgressIndicator.valueChanges.subscribe((value: any) => {
      // if (value['gated'] !== undefined) this.toggleGated(value['gated']);
      this.progressIndicatorConfig = this.parseToggleConfig(value);
      this.parseCodeViewConfig();
    });
  }

  private parseToggleConfig(value: any): IProgressIndicatorConfig {
    return {
      ...this.progressIndicatorConfig,
      size: value['size'].toLowerCase(),
      orientation: value['orientation']
      // gated: value['gated'] === 'Flase',
      // step3: value['step3'] === 'True',
      // step4: value['step4'] === 'True'
    };
  }

  private toggleGated(gated: boolean) {
    this.progressIndicatorConfig.steps?.forEach((step) => {
      if (gated && step.tagConfig.type === 'success') {
        step.tagConfig.type = 'primary';
      } else if (gated && step.tagConfig.type !== 'locked') {
        step.tagConfig.type = 'locked';
      }
    });
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
