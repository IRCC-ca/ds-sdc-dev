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
    icon: '',
    size: 'small',
    type: 'heading',
    children: []
  };

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() children: Array<INavigationItem> | undefined;
  @Input() size: keyof typeof DSSizes | undefined;

  buttonIcon: IIconButtonComponentConfig = {
    id: `${this.config.id}-button`,
    category: 'custom',
    size: this.config?.size,
    icon: {
      class: this.config?.icon,
      color: 'var(--text-primary)'
    }
  };

  navObjectChangeSub = new Subscription();

  constructor(private navEvent: NavigationService) {}

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
    this.label !== '' ? (this.config.label = this.label) : undefined;
    this.icon !== '' ? (this.config.icon = this.icon) : undefined;
    this.children !== undefined
      ? (this.config.children = this.children)
      : undefined;
    this.size !== undefined ? (this.config.size = this.size) : undefined;

    this.buttonIcon = {
      id: `${this.config.id}_button`,
      category: 'custom',
      size: this.config?.size,
      icon: {
        class: this.config?.icon,
        color: 'var(--text-primary)'
      }
    };
  }
}
