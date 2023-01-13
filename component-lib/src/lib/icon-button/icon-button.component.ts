import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
