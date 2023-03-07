import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DSSizes } from "../../../shared/constants/jl-components/jl-components.constants/jl-components.constants";
import { IProgressTagsConfig } from '../progress-tags/progress-tags.component';
import { ITabConfig, ITabNavConfig } from '../tabs/tabs.component';
export interface IStepConfig {
  title?: string,
  tagConfig: IProgressTagsConfig,
}
export interface IProgressIndicatorConfig {
  id: string,
  formGroup: FormGroup;
  size?: keyof typeof DSSizes,
  orientation?: keyof typeof Orientations,
  steps?: IStepConfig[];
  selected?: string;
}
export enum Orientations {
  horizontal = 'horizontal',
  vertical = 'vertical'
}
@Component({
  selector: 'lib-progress-indicator',
  templateUrl: './progress-indicator.component.html',
})
export class ProgressIndicatorComponent implements OnInit {

  stepIDs: any = [];
  @Input() config: IProgressIndicatorConfig = {
    id: '',
    formGroup: new FormGroup({}),
    steps: [{tagConfig: {id: ''}}],
    orientation: 'horizontal'
  };

  tagConfig: IProgressTagsConfig = {
    id: '',
    type: 'primary',
    size: "large",
  };
  tabConfig: ITabConfig = {
    id: '',
    title: '',
  }
  tabNavConfig: ITabNavConfig = {
    id: '',
    tab: [{id: '', title: ''}]
  }

  constructor() { }

  ngOnInit() {
    if(!this.config.orientation) this.config.orientation = 'horizontal';

    this.config?.steps?.forEach((step, index) => {
    this.stepIDs.push(`${this.config?.id}_step${index + 1}`);
    })

    if (this.config.selected === undefined) {
      this.config.selected = (this.stepIDs[0]);
    }
  };

  setSelected(selectedID: any) {
    if (selectedID) this.config.selected = selectedID; //set the selected tab
  };
}
