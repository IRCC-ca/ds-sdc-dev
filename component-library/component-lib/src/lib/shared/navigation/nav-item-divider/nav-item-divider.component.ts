import { Component, OnInit, Input } from '@angular/core';
import { INavigationDivider } from '../navigation.types';

@Component({
  selector: 'ircc-cl-lib-nav-divider',
  templateUrl: './nav-item-divider.component.html'
})
export class navItemDividerComponent implements OnInit {
  @Input() config: INavigationDivider = {
    id: '',
    children: [],
    label: '',
    type: 'link'
  };

  @Input() id: string = '';

  constructor() {}

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
  }
}
