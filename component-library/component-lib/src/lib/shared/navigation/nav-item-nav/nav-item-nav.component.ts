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

  @Input() config: NavigationItemLink = {
    id: '',
    href: '',
    anchor: '', //anchor is true when the url has a hash. Routerlink needs to be null if external. [fragment] needed when it's using #heading etc...
    external: false,
    label: '',
    icon: '',
    type: 'link',
    children: []
  };

  @Input() id: string = '';
  @Input() size?: keyof typeof DSSizes;
  @Input() indicator?: NavigationIndicator;

  indicatorConfig : IIndicatorConfig = {
    category: 'weak',
    purpose: 'status',
    type: 'dot'
  }

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
    if (this.config.indicator){
      this.indicatorConfig = {
        type: 'dot',
        category: 'weak',
        purpose: 'status',
        status: this.config.indicator.status,
        icon: this.config.indicator.icon
      }
      this.config.indicator.label ? this.indicatorConfig = {...this.indicatorConfig, type: 'text', label: this.config.indicator.label} : null;
      this.config.size ? this.indicatorConfig = {...this.indicatorConfig, size: this.config.size} : null;

    }
  }
}
