import { Injectable } from '@angular/core';
import { IProgressIndicatorConfig } from 'ircc-ds-angular-component-library';
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
        title: 'ACC_DEMO.STEPPER.STEP1',
        tagConfig: {
          id: 'progress_indicator_step1',
          type: 'success'
        }
      },
      {
        title: 'ACC_DEMO.STEPPER.STEP2',
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
      },
    ]
  }

  private progressIndicatorSubj = new BehaviorSubject<IProgressIndicatorConfig>(this.progressIndicatorConfig);
  progressIndicatorObs$ = this.progressIndicatorSubj.asObservable();

  updateProgressIndicator(config: IProgressIndicatorConfig) {
    this.progressIndicatorConfig = config;
    this.progressIndicatorSubj.next(this.progressIndicatorConfig);
  }

  updateSelected(selected: number){
    this.progressIndicatorConfig.selected = selected;
    this.progressIndicatorSubj.next(this.progressIndicatorConfig);
  }
}
