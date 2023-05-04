import { EventEmitter, Input, Output } from '@angular/core';
import { DSSizes } from '../../../../shared/constants/jl-components.constants';
import { Component, OnInit } from '@angular/core';

export interface INavigationHeadingConfig {
  id: string;
  size?: keyof typeof DSSizes;
}

@Component({
  selector: 'ircc-cl-lib-nav-header',
  templateUrl: './nav-item-heading.component.html'
})
export class navItemHeadingComponent implements OnInit {
  @Input() config: INavigationHeadingConfig = {
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
