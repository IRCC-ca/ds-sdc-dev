import { EventEmitter, Input, Output } from '@angular/core';
import { DSSizes } from '../../../../shared/constants/jl-components.constants';
import { Component, OnInit } from '@angular/core';
import { navItemHeadingComponent } from '../nav-item-heading/nav-item-heading.component';

export interface INavigationItemConfig {
  id: string;
  size?: keyof typeof DSSizes;
}

@Component({
  selector: 'ircc-cl-lib-nav-item',
  templateUrl: './nav-item-nav.component.html'
})
export class navItemNavComponent implements OnInit {
  @Input() config: INavigationItemConfig = {
    id: '',
    size: DSSizes.small
  };

  @Input() id: string = '';
  @Input() size?: keyof typeof DSSizes;

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
    this.size !== undefined ? (this.config.size = this.size) : undefined;
  }
}
