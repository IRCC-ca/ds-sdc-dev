import { EventEmitter, Input, Output } from '@angular/core';
import { DSSizes } from '../../../../shared/constants/jl-components.constants';
import { Component, OnInit } from '@angular/core';

import { NavigationIndicator, NavigationItemLink } from '../navigation.types';
import { IIndicatorConfig } from '../../indicator/indicator.component';

@Component({
  selector: 'ircc-cl-lib-nav-item',
  templateUrl: './nav-item-nav.component.html'
})
export class navItemNavComponent implements OnInit {

  indicatorConfig : IIndicatorConfig = {
    category: 'weak',
    purpose: 'status',
    type: 'dot'
  }

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
  @Input() indicator?: NavigationIndicator;

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
    if (this.config.indicator){
      this.indicatorConfig = {
        type: 'dot',
        category: 'weak',
        purpose: 'palette',
        status: this.config.indicator.status,
        icon: this.config.indicator.icon
      }
      this.config.indicator.label ? this.indicatorConfig = {...this.indicatorConfig, type: 'text', label: this.config.indicator.label} : null;
    }
  }
}
