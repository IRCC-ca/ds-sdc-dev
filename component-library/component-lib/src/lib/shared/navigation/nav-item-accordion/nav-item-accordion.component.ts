import { EventEmitter, Input, Output } from '@angular/core';
import { DSSizes } from '../../../../shared/constants/jl-components.constants';
import { Component, OnInit } from '@angular/core';
import { NavigationItemAccordion } from '../navigation.types';

import { IIconButtonComponentConfig } from '../../icon-button/icon-button.component';

export interface INavigationItemConfig {
  id: string;
  size?: keyof typeof DSSizes;
}

@Component({
  selector: 'ircc-cl-lib-nav-accordion',
  templateUrl: './nav-item-accordion.component.html'
})
export class navItemAccordionComponent implements OnInit {
  @Input() config: NavigationItemAccordion = {
    id: '',
    open: false,
    label: '',
    size: 'small',
    type: 'accordion',
    children: []
  };
  @Input() id: string = '';
  @Input() open: boolean | undefined;
  @Input() label: string = '';
  @Input() size: keyof typeof DSSizes | undefined;

  buttonIconOpen: IIconButtonComponentConfig = {
    id: `${this.config.id}-button`,
    category: 'custom',
    size: this.config?.size,
    icon: {
      class: 'fa-light fa-arrow-right',
      color: 'var(--text-primary)'
    }
  };

  buttonIconClose: IIconButtonComponentConfig = {
    id: `${this.config.id}-button`,
    category: 'custom',
    size: this.config?.size,
    icon: {
      class: 'fa-light fa-arrow-right',
      color: 'var(--text-primary)'
    }
  };

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
    this.open !== undefined ? (this.config.open = this.open) : undefined;
    this.label !== '' ? (this.config.label = this.label) : undefined;
    this.size !== undefined ? (this.config.size = this.size) : undefined;

    this.buttonIconOpen = {
      id: `${this.config.id}-button-open`,
      category: 'custom',
      size: this.config?.size,
      icon: {
        class: 'fa-light fa-chevron-up',
        color: 'var(--text-primary)'
      }
    };

    this.buttonIconClose = {
      id: `${this.config.id}-button-close`,
      category: 'custom',
      size: this.config?.size,
      icon: {
        class: 'fa-light fa-chevron-down',
        color: 'var(--text-primary)'
      }
    };
  }

  openAccordion(event: any) {
    this.config.open = !this.config.open;
    alert(`Insert Service Here. Button id: ${event}`);
  }
}
