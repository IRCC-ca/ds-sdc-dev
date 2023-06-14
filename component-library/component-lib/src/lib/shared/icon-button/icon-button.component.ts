import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DSFullSizes } from '../../../shared/constants/jl-components.constants';
export enum IconButtonCategories {
  primary = 'primary',
  critical = 'critical',
  custom = 'custom'
}

export interface IIconButtonIconConfig {
  class: string; // Fontawesome icon class
  color?: string; // icon color
}

export interface IIconButtonComponentConfig {
  id: string;
  category: keyof typeof IconButtonCategories;
  size?: keyof typeof DSFullSizes;
  ariaLabel?: string;
  disabled?: boolean;
  icon?: IIconButtonIconConfig;
}

export const CLASS_X_MARK = 'fa-thin fa-xmark';
export const CLASS_TRASHCAN = 'fa-solid fa-trash-can';
@Component({
  selector: 'ircc-cl-lib-icon-button',
  templateUrl: './icon-button.component.html'
})
export class IconButtonComponent implements OnInit {
  @Input() config: IIconButtonComponentConfig = {
    id: '',
    category: IconButtonCategories.primary,
    ariaLabel: ''
  };
  @Input() id = '';
  @Input() category?: keyof typeof IconButtonCategories | IconButtonCategories;
  @Input() size?: keyof typeof DSFullSizes | DSFullSizes;
  @Input() ariaLabel?: string;
  @Input() disabled?: boolean;
  @Input() icon?: IIconButtonIconConfig;
  @Output() clickEvent = new EventEmitter<string>();
  // Mapping of icons to category
  iconConfigs: { [key: string]: IIconButtonIconConfig } = {
    primary: {
      class: CLASS_X_MARK,
      color: 'var(--primary-text)'
    },
    critical: {
      class: CLASS_TRASHCAN,
      color: 'var(--critical-text)'
    }
  };

  ngOnInit() {
    if (this.id) this.config.id = this.id;
    if (this.category) this.config.category = this.category;
    if (this.size) this.config.size = this.size;
    if (this.ariaLabel) this.config.ariaLabel = this.ariaLabel;
    if (this.disabled) this.config.disabled = this.disabled;
    if (this.icon)
      this.config.icon =
        this.config.category === IconButtonCategories.custom
          ? this.icon
          : this.iconConfigs[this.config.category];
    else if (!this.icon && this.config.icon)
      this.config.icon =
        this.config.category === IconButtonCategories.custom
          ? this.config.icon
          : this.iconConfigs[this.config.category];
    else this.config.icon = this.iconConfigs[this.config.category];
  }

  buttonClick(id = this.config.id) {
    this.clickEvent.emit(id);
  }
}
