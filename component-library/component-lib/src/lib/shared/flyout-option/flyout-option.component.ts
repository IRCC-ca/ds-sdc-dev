import { Component, Input, OnInit } from '@angular/core';
import { DSSizes } from '../../../shared/constants/jl-components.constants';

export enum IFlyoutOptionType {
  text = 'text',
  checkbox = 'checkbox',
  dropdown = 'dropdown',
  line = 'line',
  heading = 'heading'
}

export interface IFlyoutOptionConfig {
  id?: string,
  value: string,
  selected?: boolean,
  active?: boolean,
  disabled?: boolean,
  type?: keyof typeof IFlyoutOptionType,
  clickable?: boolean,
  size?: keyof typeof DSSizes
};

@Component({
  selector: 'ircc-cl-lib-flyout-option',
  templateUrl: './flyout-option.component.html'
})
export class FlyoutOptionComponent implements OnInit {

  @Input() config : IFlyoutOptionConfig = {
    id: '',
    value: 'Blank label'
  }

  @Input() id? : string;
  @Input() size? : keyof typeof DSSizes;
  @Input() value?: string;
  @Input() selected?: boolean;
  @Input() active?: boolean;
  @Input() disabled?: boolean;
  @Input() type?: keyof typeof IFlyoutOptionType;
  @Input() clickable?: boolean;

  constructor() { }

  ngOnInit() {
     //set config from individual options, if present
    if(this.id) this.config.id = this.id;
    if(this.size) this.config.size = this.size;
    if(this.value) this.config.value = this.value;
    if(this.selected) this.config.selected = this.selected;
    if(this.active) this.config.active = this.active;
    if(this.disabled) this.config.disabled = this.disabled;
    if(this.type) this.config.type = this.type;
    if(this.clickable) this.config.clickable = this.clickable;

    if(this.config.type === undefined) this.config.type = 'text';
    if((this.config.type === 'text' || 'checkbox' || 'dropdown') && this.config.clickable !== false && this.config.disabled !== true) {
      this.config.clickable = true;
    } else {
      this.config.clickable = false;
    }
  };

};
