import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DSSizes } from "../../shared/constants/jl-components/jl-components.constants/jl-components.constants";
import { IProgressTagsConfig } from '../progress-tags/progress-tags.component';
import { ITabConfig } from '../tabs/tabs.component';
export interface IProgressIndicatorConfig {
  id: string,
  formGroup: FormGroup;
  tab?: ITabConfig[];
  stepNumber?: string,
  stepTitle?: string,
  size?: keyof typeof DSSizes,
  selected?: string;
}
@Component({
  selector: 'lib-progress-indicator',
  templateUrl: './progress-indicator.component.html',
})
export class ProgressIndicatorComponent implements OnInit {

  @Input() config: IProgressIndicatorConfig = {
    id: '',
    formGroup: new FormGroup({}),
  };

  tagConfig: IProgressTagsConfig = {
    id: this.config.id,
    size: this.config.size
  };
  
  constructor() { }

  ngOnInit(): void {
    if (this.config.selected === undefined && this.config.tab) {
      this.config.selected = (this.config.tab[0].id);
    };
  };

  setSelected(selectedID: any) {
    if (selectedID) this.config.selected = selectedID; //set the selected tab
  };
}
