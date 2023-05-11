import { EventEmitter, Input, Output } from '@angular/core';
import { DSSizes } from '../../../../shared/constants/jl-components.constants';
import { Component, OnInit } from '@angular/core';
import { NavigationItemAccordion } from '../navigation.types';
import { IButtonConfig } from '../../button/button.component';

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

  buttonConfigAcccordion: IButtonConfig = {
    id: 'accordion-button',
    category: 'plain',
    size: 'small',
    ariaLabel: 'Click to expand the accordion',
    iconDirection: 'left'
  };

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
    this.open !== undefined ? (this.config.open = this.open) : undefined;
    this.label !== '' ? (this.config.label = this.label) : undefined;
    this.size !== undefined ? (this.config.size = this.size) : undefined;
  }

  openAccordion() {
    this.config.open = !this.config.open;
  }
}
