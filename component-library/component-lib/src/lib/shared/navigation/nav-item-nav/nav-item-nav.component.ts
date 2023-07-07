import {
  Renderer2,
  Input,
  SimpleChanges,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router, IsActiveMatchOptions } from '@angular/router';
import { DSSizes } from '../../../../shared/constants/jl-components.constants';
import { Component, OnInit } from '@angular/core';
import {
  INavigationIndicator,
  INavigationItemHeading,
  INavigationItemLink
} from '../navigation.types';
import { IIndicatorConfig } from '../../indicator/indicator.component';
import { NavigationService } from '../navigation.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'ircc-cl-lib-nav-item',
  templateUrl: './nav-item-nav.component.html'
})

//TODO: Fix class name (NavItemNavComponent)
export class navItemNavComponent implements OnInit {
  @ViewChild('externalLinkA', { static: false }) externalLinkA:
    | ElementRef
    | undefined;

  @ViewChild('internalLink', { static: false }) internalLink:
    | ElementRef
    | undefined;

  //TODO: Pattern is supposed to be that any elements that may not be used should be OPTIONAL
  @Input() config: INavigationItemLink = {
    id: '',
    href: '',
    anchor: '',
    external: false,
    border: false,
    label: '',
    iconLeading: '',
    iconTrailing: '',
    type: 'link',
    children: [],
    header: false
  };

  @Input() id: string = '';
  @Input() size?: keyof typeof DSSizes;
  @Input() indicator?: INavigationIndicator;

  indicatorConfig: IIndicatorConfig = {
    category: 'weak',
    purpose: 'status',
    type: 'dot',
    tabIndex: -1
  };

  headerConfig: INavigationItemHeading = {
    iconLeading: '',
    id: 'header_link',
    label: 'Header Title',
    type: 'heading',
    children: []
  };

  // Check if current url's fragment match
  fragMatchOptions: IsActiveMatchOptions = {
      queryParams: 'ignored',
      matrixParams: 'exact',
      paths: 'exact',
      fragment: 'exact'
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
        icon: this.config.indicator.icon,
        tabIndex: -1
      };
      this.config.indicator.label
        ? (this.indicatorConfig = {
            ...this.indicatorConfig,
            type: 'text',
            label: this.config.indicator.label,
            tabIndex: -1
          })
        : null;
      this.size
        ? (this.indicatorConfig = { ...this.indicatorConfig, size: this.size })
        : null;
    }
    this.size !== undefined ? (this.config.size = this.size) : undefined;
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

  enterPress(event: any) {
    if (this.config.external) {
      this.externalLinkA?.nativeElement.click();
    } else {
      this.internalLink?.nativeElement.click();
    }
  }
}
