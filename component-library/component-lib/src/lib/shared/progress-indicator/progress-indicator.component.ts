import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { DSSizes } from '../../../shared/constants/jl-components.constants';
import { IProgressTagsConfig } from '../progress-tags/progress-tags.component';
import { ITabConfig, ITabNavConfig } from '../tabs/tabs.component';
import { TranslateService } from '@ngx-translate/core';

export const PROGRESS_INDICATOR_STEP_EN = 'Step';
export const PROGRESS_INDICATOR_STEP_FR = 'Étap';

export interface IStepConfig {
  title?: string;
  tagConfig: IProgressTagsConfig;
}
export interface IProgressIndicatorConfig {
  id: string;
  size?: keyof typeof DSSizes;
  orientation?: keyof typeof Orientations;
  steps?: IStepConfig[];
  selected?: number;
}
export enum Orientations {
  horizontal = 'horizontal',
  vertical = 'vertical'
}
@Component({
  selector: 'ircc-cl-lib-progress-indicator',
  templateUrl: './progress-indicator.component.html'
})
export class ProgressIndicatorComponent implements OnInit {
  @Input() config: IProgressIndicatorConfig = {
    id: '',
    steps: [{ tagConfig: { id: '' } }],
    orientation: 'horizontal'
  };

  @Input() id?: string;
  @Input() size?: keyof typeof DSSizes;
  @Input() orientation?: keyof typeof Orientations;
  @Input() steps?: IStepConfig[];
  @Input() selected?: number;

  @Output() tabClick: EventEmitter<any> = new EventEmitter();

  tabConfig: ITabConfig = {
    id: '',
    title: ''
  };
  tabNavConfig: ITabNavConfig = {
    id: '',
    tab: [{ id: '', title: '' }]
  };

  stepText = '';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    //set config from individual options, if present
    if (this.id) this.config.id = this.id;
    if (this.size) this.config.size = this.size;
    if (this.orientation) this.config.orientation = this.orientation;
    if (this.steps) this.config.steps = this.steps;
    if (this.selected) this.config.selected = this.selected;

    if (!this.config.orientation) this.config.orientation = 'horizontal';
    this.setLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((change) => {
      this.setLang(change.lang);
    });

    if (this.config.selected === undefined) {
      this.config.selected = 0;
    }
  }

  tabClickFn(selected: number) {
    this.tabClick.emit(selected);
  }

  setLang(lang: string) {
    if (lang === 'en' || lang === 'en-US') {
      this.stepText = PROGRESS_INDICATOR_STEP_EN;
    } else {
      this.stepText = PROGRESS_INDICATOR_STEP_FR;
    }
  }
}
