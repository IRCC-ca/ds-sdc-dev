import { Component, OnInit, Input } from '@angular/core';
import { DSSizes } from '../../../../shared/constants/jl-components.constants';
import { INavigationItem, INavigationItemHeading } from '../navigation.types';
import { IIconButtonComponentConfig } from '../../icon-button/icon-button.component';
import { NavigationService } from '../navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ircc-cl-lib-nav-header',
  templateUrl: './nav-item-heading.component.html'
})
export class navItemHeadingComponent implements OnInit {
  @Input() config: INavigationItemHeading = {
    id: '',
    label: '',
    iconLeading: '',
    size: 'small',
    type: 'heading',
    children: [],
    bold: false
  };

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() iconLeading: string = '';
  @Input() children: Array<INavigationItem> | undefined;
  @Input() size: keyof typeof DSSizes | undefined;
  @Input() leftPadding: boolean | undefined;
  @Input() bold: boolean | undefined;

  buttonIcon: IIconButtonComponentConfig = {
    id: `${this.config.id}-button`,
    category: 'custom',
    size: this.config?.size,
    icon: {
      class: this.config?.iconLeading,
      color: 'var(--text-primary)'
    }
  };

  navObjectChangeSub = new Subscription();

  constructor(private navEvent: NavigationService) {}

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
    this.label !== '' ? (this.config.label = this.label) : undefined;
    this.iconLeading !== ''
      ? (this.config.iconLeading = this.iconLeading)
      : undefined;
    this.children !== undefined
      ? (this.config.children = this.children)
      : undefined;
    this.size !== undefined ? (this.config.size = this.size) : undefined;
    this.leftPadding !== undefined
      ? (this.config.leftPadding = this.leftPadding)
      : undefined;
    this.bold !== undefined ? (this.config.bold = this.bold) : undefined;
    if (this.config?.bold != true && this.config?.bold != false) {
      this.config.bold = true;
    }

    this.buttonIcon = {
      id: `${this.config.id}_button`,
      category: 'custom',
      size: this.config?.size,
      icon: {
        class: this.config?.iconLeading,
        color: 'var(--text-primary)'
      }
    };
  }

  getClasses(): string {
    let classes = '';

    if (this.config.iconLeading.length > 0) {
      classes += 'grid-header';
    }

    if (this.config?.leftPadding === true) {
      classes += ' left-padding';
    }

    if (this.config?.bold === false) {
      classes += ' remove-bold';
    }


    return classes;
  }
}
