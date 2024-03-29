import { EventEmitter, Input, Output } from '@angular/core';
import { DSSizes } from '../../../../shared/constants/jl-components.constants';
import { Component, OnInit } from '@angular/core';
import { INavigationItemAccordion } from '../navigation.types';
import { IIconButtonComponentConfig } from '../../icon-button/icon-button.component';
import { Subscription, filter } from 'rxjs';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'ircc-cl-lib-nav-accordion',
  templateUrl: './nav-item-accordion.component.html'
})
export class navItemAccordionComponent implements OnInit {
  @Input() config: INavigationItemAccordion = {
    id: '',
    open: false,
    label: '',
    size: 'small',
    type: 'accordion',
    children: [],
    leftPadding: false,
    bold: true
  };
  @Input() id: string = '';
  @Input() open: boolean | undefined;
  @Input() label: string = '';
  @Input() size: keyof typeof DSSizes | undefined;
  @Input() iconLeading: string = '';
  @Input() leftPadding: boolean | undefined;
  @Input() bold: boolean | undefined;

  headerID: string = '';

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

  navObjectChangeSub = new Subscription();

  constructor(private navEvent: NavigationService) {}

  ngOnInit() {
    // this.navObjectChangeSub = this.navEvent.navObjectChangeObs$.pipe(
    //   filter(item => (item.id === this.config.id && item.type === 'accordion'))).subscribe(response => {
    //     this.config = response as NavigationItemAccordion;
    //   });

    this.id !== '' ? (this.config.id = this.id) : undefined;
    this.open !== undefined ? (this.config.open = this.open) : undefined;
    this.bold !== undefined ? (this.config.bold = this.bold) : undefined;

    if (this.config?.bold != true && this.config?.bold != false) {
      this.config.bold = true;
    }

    this.leftPadding !== undefined
      ? (this.config.leftPadding = this.leftPadding)
      : undefined;


    this.label !== '' ? (this.config.label = this.label) : undefined;
    this.size !== undefined ? (this.config.size = this.size) : undefined;
    this.iconLeading !== ''
      ? (this.config.iconLeading = this.iconLeading)
      : undefined;

    this.headerID = `${this.config.id}_header`;
    this.buttonIconOpen = {
      id: `${this.config.id}_button_open`,
      category: 'custom',
      size: this.config?.size,
      icon: {
        class: 'fa-light fa-chevron-up',
        color: 'var(--text-primary)'
      }
    };

    this.buttonIconClose = {
      id: `${this.config.id}_button_close`,
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
    this.navEvent.navEvent({ id: this.config.id, event: event });
  }

  enterPress(event: any) {
    this.config.open = !this.config.open;
  }
}
