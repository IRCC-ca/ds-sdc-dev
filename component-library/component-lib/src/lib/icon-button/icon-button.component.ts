import {Component, Input, OnInit} from '@angular/core';
export enum IconButtonCategories {
  primary = 'primary',
  critical = 'critical',
  custom = 'custom'
}

export interface IconButtonIconConfig {
  class: string;
  color?: string;
}
@Component({
  selector: 'lib-icon-button',
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent implements OnInit {
  @Input()
  category!: keyof typeof IconButtonCategories
  icon?: IconButtonIconConfig;
  iconConfigs: { [key: string]: IconButtonIconConfig } = {
    primary: {
      class: 'fa-thin fa-xmark',
    },
    critical: {
      class: 'fa-solid fa-trash-can',
      color: 'var(--critical-text)'
    }
  }

  ngOnInit(): void {
    this.icon = this.iconConfigs[this.category];
  }

}
