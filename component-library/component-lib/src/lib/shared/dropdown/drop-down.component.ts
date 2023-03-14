import { Component, Input, OnInit } from '@angular/core';
import { DSSizes } from "../../../shared/constants/jl-components/jl-components.constants/jl-components.constants";
import { IIconButtonIconConfig } from '../icon-button/icon-button.component';
import { IIconConfig } from '../icon/icon.component';

export interface IDropdownConfig {
    id: string;
    label?: string;
    size?: keyof typeof DSSizes;
    placeholderText?: string;
    disabled?: boolean;
    icon?: IIconButtonIconConfig;
}
  

@Component({
  selector: 'lib-dropdown',
  templateUrl: './drop-down.component.html'
})
export class DropdownComponent implements OnInit {

  @Input() config: IDropdownConfig = {
    id: '',
  };

  @Input() id: string = '';
  @Input() size? : keyof typeof DSSizes;
  @Input() label? : string = '';
  @Input() placeholderText? : string = '';
  @Input() disabled?: boolean;

  showPlaceholder : boolean = false;
  selected: boolean = false;

  constructor() { }

  ngOnInit(): void {

    if (this.id !== '') this.config.id = this.id;
    if (this.size) this.config.size =  this.size;
    if (this.label !== '') this.config.label = this.label;
    if (this.placeholderText !== '') this.config.placeholderText = this.placeholderText;
    if (this.disabled !== undefined) this.config.disabled = this.disabled;

    if (!this.config.label || this.config.label.trim().length == 0) {
      if (!this.config.placeholderText) {
        this.config.placeholderText = "Default";
      }
      this.showPlaceholder = true;
    }
  }

  toggleSelect() {
    this.selected = !this.selected;
  }
}
