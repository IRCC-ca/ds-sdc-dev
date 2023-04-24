import { Component, Input, OnInit } from '@angular/core';

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
  clickable?: boolean
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

  constructor() { }

  ngOnInit() {
    if(this.config.type === undefined) this.config.type = 'text';
    if((this.config.type === 'text' || 'checkbox' || 'dropdown') && this.config.clickable !== false) this.config.clickable = true;
    if(this.id) this.config.id = this.id;
  };

};
