import {Component, Input, OnInit} from '@angular/core';
export enum IconButtonCategories {
  primary = 'primary',
  critical = 'critical',
  custom = 'custom'
}
@Component({
  selector: 'lib-icon-button',
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent implements OnInit {

  @Input()
  category?: IconButtonCategories | keyof typeof IconButtonCategories
  icon?: string;
  constructor() { }

  ngOnInit(): void {
    this.icon = 'fa-thin fa-xmark';
  }

}
