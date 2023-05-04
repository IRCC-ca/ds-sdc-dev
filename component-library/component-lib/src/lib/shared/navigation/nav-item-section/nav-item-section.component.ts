import { EventEmitter, Input, Output } from '@angular/core';
import { DSSizes } from '../../../../shared/constants/jl-components.constants';
import { Component, OnInit } from '@angular/core';

export interface INavigationSectionConfig {
  id: string;
  size?: keyof typeof DSSizes;
}

@Component({
  selector: 'ircc-cl-lib-nav-section',
  templateUrl: './nav-item-section.component.html'
})
export class navItemSectionComponent implements OnInit {
  @Input() config: INavigationSectionConfig = {
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
