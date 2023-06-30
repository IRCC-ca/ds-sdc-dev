import { Injectable } from '@angular/core';
import {
  IProgressIndicatorConfig,
  Orientations
} from 'ircc-ds-angular-component-library';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessbilityDemoFormStateService {
  progressIndicatorConfig: IProgressIndicatorConfig = {
    id: 'progress_indicator',
    selected: 1,
    steps: [
      {
        title: 'ACC_DEMO.BACKGROUNDINFO',
        tagConfig: {
          id: 'progress_indicator_step1',
          type: 'success'
        }
      },
      {
        title: 'ACC_DEMO.PERSONAL_INFO.H1',
        tagConfig: {
          id: 'progress_indicator_step2',
          type: 'primary'
        }
      },
      {
        title: 'ACC_DEMO.STEPPER.STEP3',
        tagConfig: {
          id: 'progress_indicator_step3',
          type: 'locked'
        }
      },
      {
        title: 'ACC_DEMO.STEPPER.STEP4',
        tagConfig: {
          id: 'progress_indicator_step4',
          type: 'locked'
        }
      }
    ]
  };

  private progressIndicatorSubj = new BehaviorSubject<IProgressIndicatorConfig>(
    this.progressIndicatorConfig
  );
  progressIndicatorObs$ = this.progressIndicatorSubj.asObservable();

  /**
   * Update the entire indicator config
   * @param config IProgressIndicatorConfig
   */
  updateProgressIndicator(config: IProgressIndicatorConfig) {
    this.progressIndicatorConfig = config;
    this.progressIndicatorSubj.next(this.progressIndicatorConfig);
  }

  /**
   * Update which element in the indicator is selected
   * @param selected number - index number of element to be selected
   */
  updateSelected(selected: number) {
    this.progressIndicatorConfig.selected = selected;
    this.progressIndicatorSubj.next(this.progressIndicatorConfig);
  }

  /**
   * Update the indicator to be vertical or horizontal
   * @param orientation either 'vertical' or 'horizontal'
   */
  updateOrientation(orientation: keyof typeof Orientations) {
    this.progressIndicatorConfig.orientation = orientation;
    this.progressIndicatorSubj.next(this.progressIndicatorConfig);
  }
}
