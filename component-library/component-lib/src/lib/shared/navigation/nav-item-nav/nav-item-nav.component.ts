import {
  Renderer2,
  Input,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { DSSizes } from '../../../../shared/constants/jl-components.constants';
import { Component, OnInit } from '@angular/core';
import { INavigationIndicator, INavigationItemLink } from '../navigation.types';
import { IIndicatorConfig } from '../../indicator/indicator.component';
import { NavigationService } from '../navigation.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'ircc-cl-lib-nav-item',
  templateUrl: './nav-item-nav.component.html'
})

//TODO: Fix class name (NavItemNavComponent)
export class navItemNavComponent implements OnInit {
  //TODO: Pattern is supposed to be that any elements that may not be used should be OPTIONAL
  @Input() config: INavigationItemLink = {
    id: '',
    href: '',
    anchor: '',
    external: false,
    border: false,
    label: '',
    icon: '',
    trailingIcon: '',
    type: 'link',
    children: []
  };

  @Input() id: string = '';
  @Input() size?: keyof typeof DSSizes;
  @Input() indicator?: INavigationIndicator;

  indicatorConfig: IIndicatorConfig = {
    category: 'weak',
    purpose: 'status',
    type: 'dot'
  };

  navObjectChangeSub = new Subscription();

  constructor(
    private renderer: Renderer2,
    private navEvent: NavigationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //Used entirely as a workaround for the change detection limitations
    this.navObjectChangeSub = this.navEvent.itemChangeObs$
      .pipe(filter((item) => item === this.config.id))
      .subscribe(() => {
        this.indicatorConfig.status = this.config.indicator?.status;
        this.indicatorConfig.icon = this.config.indicator?.icon;
      });

    this.id !== '' ? (this.config.id = this.id) : undefined;
    if (this.config.indicator) {
      this.indicatorConfig = {
        type: 'dot',
        category: 'weak',
        purpose: 'status',
        status: this.config.indicator.status,
        icon: this.config.indicator.icon
      };
      this.config.indicator.label
        ? (this.indicatorConfig = {
            ...this.indicatorConfig,
            type: 'text',
            label: this.config.indicator.label
          })
        : null;
      this.size
        ? (this.indicatorConfig = { ...this.indicatorConfig, size: this.size })
        : null;
    }
  }

  linkClick(e: Event) {
    this.navEvent.navEvent({ id: this.config.id, event: e }); //Broadcast the event
    if (!this.config.external) {
      setTimeout(() => {
        if (this.config?.anchor) {
          const anchorElement = this.renderer.selectRootElement(
            `#${this.config.anchor}`,
            true
          );
          anchorElement
            ? anchorElement.scrollIntoView({ behavior: 'smooth' })
            : null;
        }
      }, 0);
    }
  }
}
