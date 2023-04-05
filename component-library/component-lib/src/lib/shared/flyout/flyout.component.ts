import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { IFlyoutOptionConfig } from '../flyout-option/flyout-option.component';

export enum IFlyoutSelectTypes {
  single = 'single',
  multi = 'multi'
}

export interface IFlyoutConfig {
  id?: string,
  options?: IFlyoutOptionConfig[],
  disabled?: boolean
  selection?: [] | number,
  type?: keyof typeof IFlyoutSelectTypes
};

@Component({
  selector: 'lib-flyout',
  templateUrl: './flyout.component.html'
})
export class FlyoutComponent implements OnInit {

  @Input() config : IFlyoutConfig = {

  }
  @Input() id? : string;
  @Output() isSelected = new EventEmitter();

  clearOptions(){
    console.log('getting here?');
    this.config?.options?.forEach(option => {
      option.selected = false;
    });
    console.log('THE OPTIONS', this.config.options);
  }

  constructor() { }

  ngOnInit() {
    console.log('Flyout:', this.config);
    if(this.config.type === undefined) this.config.type = 'single';
    if(this.id) this.config.id = this.id;
  };

  optionSelected(i: number){
    if(this.config.options && !this.config.options[i].selected && this.config.options[i].clickable){
      console.log(i);
      console.log(this.config.type);
      this.config.type != 'multi' ? this.clearOptions() : /*this.config.selection = [].push(this.config.options[i]);*/null;
      this.config.options[i].selected = true;
      this.isSelected.emit(this.config.options[i].value);
      }
  }

};
