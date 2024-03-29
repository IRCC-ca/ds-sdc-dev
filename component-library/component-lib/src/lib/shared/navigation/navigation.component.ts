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

  @ViewChild('navigationAreaScroll', { static: false })
  navigationAreaScroll: ElementRef | undefined;

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
    marginTop: 0,
    childrenPadding: true
  };
  configSub?: Subscription;
  scrollTimeout: any;
  wrapperTop?: number; // Relative height from top of nav to top of page in px
  wrapperWidth?: number; // Width of wrapper in px
  wrapperFixed: boolean = false;

  listenerScroll = () => {};
  listenerResize = () => {};
  constructor(
    private navService: NavigationService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.configSub = this.navService.navConfigObs$.subscribe((response) => {
      this.config = response;
      if (
        this.config?.childrenPadding != true &&
        this.config?.childrenPadding != false
      ) {
        this.config.childrenPadding = true;
      }
    });
    // Record relative height from top of page for sidenav
    this.wrapperTop = this.el.nativeElement?.getBoundingClientRect().top;
  }

  getPaddingChildrenPadding(index: number): string {
    let classes = '';

    if (this.config?.childrenPadding === true) {
      classes += 'indent-' + index;
    }

    return classes;
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
    this.wrapperWidth = this.el.nativeElement.parentElement.offsetWidth;
    if (this.config.scrolling === true) {
      this.getHeight();
      this.renderer.listen('window', 'resize', () => {
        this.getHeight();
        setTimeout(() => {
          // Update element width upon window resize
          this.wrapperWidth = this.el.nativeElement.parentElement.offsetWidth;
        });
      });
    }
    if (this.config.fixed) {
      this.renderer.listen('window', 'scroll', () => {
        // Check if navigation top has hit top of viewport
        if (this.wrapperTop) {
          this.wrapperFixed = this.wrapperTop < window.scrollY;
        }
      });
    }
  }

  getHeight = () => {
    this.listenerScroll();
    this.listenerResize();

    if (this.complicatedMaths() === true) {
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

      this.renderer.setStyle(
        this.navigationAreaScroll?.nativeElement,
        'margin-top',
        this.navigationHeader?.nativeElement.offsetHeight +
          this.config?.marginTop +
          'px'
      );
    } else {
      this.renderer.removeClass(
        this.navigationHeader?.nativeElement,
        'position-fixed'
      );
      this.renderer.removeStyle(this.navigationHeader?.nativeElement, 'top');
      this.renderer.removeStyle(
        this.navigationAreaScroll?.nativeElement,
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
    this.renderer.removeStyle(
      this.navigationAreaScroll?.nativeElement,
      'margin-top'
    );
    this.renderer.removeStyle(this.navigationArea?.nativeElement, 'height');
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

    this.renderer.setStyle(
      this.navigation?.nativeElement,
      'overflow-y',
      'auto'
    );
    this.renderer.setStyle(
      this.navigation?.nativeElement,
      'overflow-x',
      'clip'
    );
  };

  disableSetScrollableNavigationArea = () => {
    this.renderer.removeStyle(this.navigation?.nativeElement, 'height');
    this.renderer.removeStyle(this.navigation?.nativeElement, 'overflow-y');
    this.renderer.removeStyle(this.navigation?.nativeElement, 'overflow-x');
  };

  setIndex = (index: number): number => {
    return (index += 1);
  };
}
