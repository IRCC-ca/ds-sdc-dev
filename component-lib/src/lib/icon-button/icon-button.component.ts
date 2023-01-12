import {Component, Input, OnInit} from '@angular/core';
// import {ButtonCategories, ButtonComponent} from "../button/button.component";

export enum IconButtonCategories {
  primary = 'primary',
  critical = 'critical',
  custom = 'custom'
}
@Component({
  selector: 'lib-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {
  // public ButtonCat = ButtonCategories.plain;
  @Input() category?: IconButtonCategories | keyof IconButtonCategories;
  constructor() { }

  ngOnInit(): void {
    console.log(this.category)
  }

}
