import { EventEmitter, Input, Output } from '@angular/core';
import { DSSizes } from '../../../../shared/constants/jl-components.constants';
import { Component, OnInit } from '@angular/core';

import { NavigationItemLink } from '../navigation.types';

@Component({
  selector: 'ircc-cl-lib-nav-item',
  templateUrl: './nav-item-nav.component.html'
})
export class navItemNavComponent implements OnInit {
  @Input() config: NavigationItemLink = {
    id: '',
    href: '',
    anchor: false,
    label: '',
    icon: '',
    type: 'link',
    children: []
  };

  @Input() id: string = '';
  @Input() size?: keyof typeof DSSizes;

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
  }
}
