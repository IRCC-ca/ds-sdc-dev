import { Component, Input, OnInit } from '@angular/core';
import { DSSizes } from "../../../shared/constants/jl-components.constants";
import { ButtonCategories } from '../button/button.component';
import { IIconButtonIconConfig } from '../icon-button/icon-button.component';
import { IFlyoutConfig } from '../flyout/flyout.component';
import { IFlyoutOptionConfig } from '../flyout-option/flyout-option.component';

export interface IDropdownConfig {
    id: string;
    label?: string;
    size?: keyof typeof DSSizes;
    category?: keyof typeof ButtonCategories;
    placeholderText?: string;
    disabled?: boolean;
    icon?: IIconButtonIconConfig;
    flyout?: IFlyoutConfig;
}
@Component({
  selector: 'lib-dropdown',
  templateUrl: './drop-down.component.html'
})
export class DropdownComponent implements OnInit {

  @Input() config: IDropdownConfig = {
    id: ''
  };

  @Input() id: string = '';
  @Input() size? : keyof typeof DSSizes;
  @Input() label? : string = '';
  @Input() placeholderText? : string = '';
  @Input() disabled?: boolean;
  @Input() category?: keyof typeof ButtonCategories;

  showPlaceholder : boolean = false;
  selected: boolean = false;

  flyoutConfig : IFlyoutConfig = {
    id: this.config.id + '_flyout',
    options: [{
      value: 'Options empty'
    }]
  }

  selectedOption(e: Event) {
    console.log(e);
    this.showPlaceholder = false;
    this.config.label = e.toString();
    this.selected = !this.selected;
  }

  onBlur(e: FocusEvent) {
    console.log('BLUR', e);
  }

  ngOnInit() {

    if (this.id !== '') this.config.id = this.id;
    if (this.size) this.config.size =  this.size;
    if (this.label !== '') this.config.label = this.label;
    if (this.placeholderText !== '') this.config.placeholderText = this.placeholderText;
    if (this.disabled !== undefined) this.config.disabled = this.disabled;
    (this.category === undefined) ? undefined : this.config.category = this.category;

    if (!this.config.category) this.config.category = ButtonCategories.primary

    if (!this.config.label || this.config.label.trim().length == 0) {
      if (!this.config.placeholderText) {
        this.config.placeholderText = "Default";
      }
      this.showPlaceholder = true;
    }

    if(this.config.flyout) this.flyoutConfig = this.config.flyout;

  }

  toggleSelect() {
    this.selected = !this.selected;
    if(this.selected){
      let flyout = document.getElementById(`${this.config.id}_flyout`);
      flyout?.addEventListener('keypress', (e : KeyboardEvent)=>{
        console.log(e.key);
      })
    }
  }
}
