import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
export enum IconButtonCategories {
  primary = 'primary',
  critical = 'critical',
  custom = 'custom'
}

export enum IconButtonSize {
  large = 'large',
  small = 'small',
  extraSmall = 'extraSmall'
}

export interface IconButtonIconConfig {
  class: string; // Fontawesome icon class
  color?: string; // icon color
}

export interface IconButtonComponentConfig {
  id: string,
  category: keyof typeof IconButtonCategories,
  size?: keyof typeof IconButtonSize,
  ariaLabel?: string,
  disabled?: boolean,
  customIcon?: IconButtonIconConfig
}
@Component({
  selector: 'lib-icon-button',
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent implements OnInit {
  @Input() config: IconButtonComponentConfig = {
    id: '',
    category: IconButtonCategories.primary,
    ariaLabel: ''
  };
  @Input() id = '';
  @Input()
  category!: keyof typeof IconButtonCategories | IconButtonCategories;
  @Input()
  size!: keyof typeof IconButtonSize | IconButtonSize;
  @Input()
  ariaLabel?: string;
  @Input()
  disabled?: boolean;
  @Output()
  clickEvent = new EventEmitter<string>();
  icon?: IconButtonIconConfig;
  // Mapping of icons to category
  iconConfigs: { [key: string]: IconButtonIconConfig } = {
    primary: {
      class: 'fa-thin fa-xmark',
      color: 'var(--primary-text)'
    },
    critical: {
      class: 'fa-solid fa-trash-can',
      color: 'var(--critical-text)'
    }
  }

  ngOnInit(): void {
    if (this.id) this.config.id = this.id;
    if (this.category) this.config.category = this.category;
    if (this.size) this.config.size = this.size;
    if (this.ariaLabel) this.config.ariaLabel = this.ariaLabel;
    if (this.disabled) this.config.disabled = this.disabled;
    this.icon = this.config.category === 'custom' ? this.config.customIcon : this.iconConfigs[this.config.category];
  }

  buttonClick(id: string) {
    this.clickEvent.emit(id);
  }
}
