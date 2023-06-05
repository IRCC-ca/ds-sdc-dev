import {
  AfterViewInit,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DSSizes } from '../../../shared/constants/jl-components.constants';
import { INavigationItem, INavigationConfig } from './navigation.types';
import { Subscription } from 'rxjs';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'ircc-cl-lib-navigation',
  templateUrl: './navigation.component.html'
})
export class navigationComponent implements OnInit, AfterViewInit {
  @ViewChild('navigationHeader', { static: false }) navigationHeader:
    | ElementRef
    | undefined;

  @ViewChild('navigationContentTop', { static: false }) navigationContentTop:
    | ElementRef
    | undefined;

  @ViewChild('navigationContentBottom', { static: false })
  navigationContentBottom: ElementRef | undefined;

  @ViewChild('navigationArea', { static: false })
  navigationArea: ElementRef | undefined;

  @ViewChild('navigation', { static: false })
  navigation: ElementRef | undefined;

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() iconLeading: string = '';
  @Input() iconTrailing: string = '';
  @Input() size: keyof typeof DSSizes | undefined;
  //TODO: NavigationItem and all other interfaces must be renamed starting with 'I'
  @Input() navigationConfig: Array<INavigationItem> = [];

  flattenNavigation: Array<INavigationItem> = [];
  config: INavigationConfig = {
    id: '',
    label: '',
    iconLeading: '',
    iconTrailing: '',
    size: 'small',
    navigationConfig: [],
    scrolling: false,
    height: '75vh',
    marginTop: 0
  };
  configSub?: Subscription;
  scrollTimeout: any;

  listenerScroll = () => {};
  listenerResize = () => {};
  constructor(
    private navService: NavigationService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.configSub = this.navService.navConfigObs$.subscribe((response) => {
      this.config = response;
    });
  }

  isArray = (obj: any) => {
    return Array.isArray(obj);
  };

  arrayOfObject = (obj: any) => {
    return Object.keys(obj);
  };

  getIconsStatus = () => {
    return (
      this.config &&
      (this.config?.iconLeading || '').length > 0 &&
      (this.config?.iconTrailing || '').length > 0
    );
  };

  //These are in THIS component, not in it's own. I.e. the buttons in the actual
  //header are not in a child component.
  clickIconLeading = (event: any) => {
    this.navService.navEvent({ id: this.config.id, event: event });
  };
  clickIconTrailing = (event: any) => {
    this.navService.navEvent({ id: this.config.id, event: event });
  };

  navigationClass = (): string => {
    if (
      ((this.config?.iconLeading?.length || ''.length > 0) &&
        this.config?.iconTrailing?.length) ||
      ''.length > 0
    ) {
      return 'header-full';
    } else if (this.config?.iconLeading?.length || ''.length > 0) {
      return 'header-iconleading';
    } else if (this.config?.iconTrailing?.length || ''.length > 0) {
      return 'header-icontrailing';
    }

    return '';
  };

  ngAfterViewInit() {
    if (this.config.scrolling === true) {
      this.getHeight();
      this.renderer.listen('window', 'resize', () => {
        this.getHeight();
      });
    }
  }

  getHeight = () => {
    this.listenerScroll();
    this.listenerResize();

    console.log('getHeight');
    if (this.complicatedMaths() === true) {
      console.log('resize');
      this.disableStickyNav();
      this.setScrollableNavigationArea();

      this.listenerResize = this.renderer.listen('window', 'resize', () => {
        this.setScrollableNavigationArea();
      });
    } else if (this.complicatedMaths() === false) {
      this.disableSetScrollableNavigationArea();
      this.setStickyNav();
      this.listenerScroll = this.renderer.listen('window', 'scroll', () => {
        this.scrolling();
      });
    }
  };

  scrolling = (): void => {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    this.scrollTimeout = setTimeout(
      (() => {
        this.setStickyNav();
      }).bind(this),
      50
    );
  };

  setStickyNav = () => {
    if (
      window.pageYOffset > this.navigationHeader?.nativeElement.offsetHeight
    ) {
      this.renderer.addClass(
        this.navigationHeader?.nativeElement,
        'position-fixed'
      );
      this.renderer.setStyle(
        this.navigationHeader?.nativeElement,
        'top',
        `${this.config?.marginTop}px`
      );

      this.renderer.addClass(
        this.navigationContentTop?.nativeElement,
        'position-fixed'
      );
      this.renderer.setStyle(
        this.navigationContentTop?.nativeElement,
        'top',
        this.navigationHeader?.nativeElement.offsetHeight +
          this.config?.marginTop +
          'px'
      );

      this.renderer.setStyle(
        this.navigationArea?.nativeElement,
        'margin-top',
        this.navigationHeader?.nativeElement.offsetHeight +
          this.navigationContentTop?.nativeElement.offsetHeight +
          this.config?.marginTop +
          'px'
      );
    } else {
      this.renderer.removeClass(
        this.navigationHeader?.nativeElement,
        'position-fixed'
      );
      this.renderer.removeStyle(this.navigationHeader?.nativeElement, 'top');

      this.renderer.removeClass(
        this.navigationContentTop?.nativeElement,
        'position-fixed'
      );

      this.renderer.removeStyle(
        this.navigationContentTop?.nativeElement,
        'top'
      );
      this.renderer.removeStyle(
        this.navigationArea?.nativeElement,
        'margin-top'
      );
    }
  };

  disableStickyNav = () => {
    this.renderer.removeClass(
      this.navigationHeader?.nativeElement,
      'position-fixed'
    );
    this.renderer.removeStyle(this.navigationHeader?.nativeElement, 'top');

    this.renderer.removeClass(
      this.navigationContentTop?.nativeElement,
      'position-fixed'
    );

    this.renderer.removeStyle(this.navigationContentTop?.nativeElement, 'top');
    this.renderer.removeStyle(this.navigationArea?.nativeElement, 'margin-top');
    this.renderer.removeStyle(this.navigationArea?.nativeElement, 'height');
  };

  disableSetScrollableNavigationArea = () => {
    this.renderer.removeStyle(this.navigationArea?.nativeElement, 'height');
    this.renderer.removeStyle(this.navigation?.nativeElement, 'height');
    this.renderer.removeStyle(this.navigationArea?.nativeElement, 'overflow-y');
    this.renderer.removeStyle(this.navigationArea?.nativeElement, 'overflow-x');
  };

  complicatedMaths = (): boolean => {
    let windowheight = window.innerHeight;

    let usableHeight =
      windowheight -
      (this.navigationHeader?.nativeElement.offsetHeight +
        this.navigationContentTop?.nativeElement.offsetHeight +
        this.navigationContentBottom?.nativeElement.offsetHeight);

    return usableHeight > windowheight / 2 ? true : false;
  };

  setScrollableNavigationArea = () => {
    this.renderer.setStyle(
      this.navigation?.nativeElement,
      'height',
      this.config.height
    );

    let usableHeight =
      this.navigation?.nativeElement.offsetHeight -
      (this.navigationHeader?.nativeElement.offsetHeight +
        this.navigationContentTop?.nativeElement.offsetHeight +
        this.navigationContentBottom?.nativeElement.offsetHeight);

    this.renderer.setStyle(
      this.navigationArea?.nativeElement,
      'height',
      usableHeight + 'px'
    );

    this.renderer.setStyle(
      this.navigationArea?.nativeElement,
      'overflow-y',
      'auto'
    );
    this.renderer.setStyle(
      this.navigationArea?.nativeElement,
      'overflow-x',
      'clip'
    );
  };
}
