import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { NavigationItemHeading } from '../navigation.types';

@Component({
  selector: 'ircc-cl-lib-nav-header',
  templateUrl: './nav-item-heading.component.html'
})
export class navItemHeadingComponent implements OnInit {
  @Input() config: NavigationItemHeading = {
    id: '',
    label: '',
    icon: '',
    type: 'heading',
    children: []
  };

  @Input() id: string = '';

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
  }
}
