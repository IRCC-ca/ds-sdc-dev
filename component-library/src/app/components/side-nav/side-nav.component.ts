import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChildren,
  QueryList
} from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
  // ...
} from '@angular/animations';
import { ISideNavDataInterface } from './side-nav.model';
import { TranslateService } from '@ngx-translate/core';
import { IIconConfig } from 'dist/ircc-ds-angular-component-library/lib/shared/icon/icon.component';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { IsActiveMatchOptions, NavigationEnd, Router } from '@angular/router';
import { SideNavConfig } from '@app/components/side-nav/side-nav.config';
import {
  INavigationItemLink,
  NavigationItemType,
  DSSizes
} from 'ircc-ds-angular-component-library';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('leftSideNavTrigger', [
      // To define animations based on trigger actions
      state('open', style({ opacity: '1' })),
      state(
        'close',
        style({ opacity: '0', height: '0', 'pointer-events': 'none' })
      ),
      transition('open => close', [animate('300ms ease-in')]),
      transition('close => open', [animate('300ms ease-out')])
    ])
  ],
  providers: [SlugifyPipe]
})
export class SideNavComponent
  implements OnInit, AfterViewChecked, AfterViewInit
{
  @Input() mobileToggleIcon: boolean = false; // If display toggle menu icon
  @Input() rightNavLOVs: string[] = [];
  wrapperTop?: number; // Relative height from top of side nav to top of page in px
  wrapperFixed: boolean = false;
  sectionTopMargin: number = 0;
  current: string = ''; // Current url fragment
  navigationEnd: boolean = false;

  /**
   * Add active state to side nav item when scroll in to page section
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event?: Event) {
    if (!event || event?.type !== 'scroll') return;

    //calculating real height of scrollable content
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const sideNavTitles: NodeListOf<HTMLHeadElement> =
      document.querySelectorAll('app-title-slug-url h1, app-title-slug-url h2');
    // Query all side nav anchor tags from current elementRef
    const sideNavLinks: NodeListOf<HTMLAnchorElement> =
      this.el.nativeElement.querySelectorAll('ircc-cl-lib-nav-item a');

    if (this.navigationEnd) {
      this.updateActiveSideNavLink(sideNavLinks);
      this.navigationEnd = false;
      return;
    }

    //runs through sections to locate TOP of each heading
    sideNavTitles.forEach((section) => {
      const sectionTop = section.offsetTop;
      // Set current when scrollY passes top of section.
      if (
        window.scrollY >= sectionTop - this.sectionTopMargin &&
        window.scrollY != height
      )
        this.current = `${section.getAttribute('id')}`;
    });
    //set current to lowest section if scroll is at bottom of content
    if (window.scrollY >= height)
      this.current = `${sideNavTitles[sideNavTitles.length - 1].getAttribute(
        'id'
      )}`; //runs through links to set current active link
    this.updateActiveSideNavLink(sideNavLinks);

    // Check if wrapper top has hit top of viewport
    if (this.wrapperTop) {
      this.wrapperFixed = this.wrapperTop <= window.scrollY - 178;
    }
  }

  private updateActiveSideNavLink(sideNavLinks: NodeListOf<HTMLAnchorElement>) {
    sideNavLinks.forEach((link) => {
      const fragment = link.hash.substring(1);
      link.classList.remove('active-link');
      if (
        this.current != '' &&
        fragment === this.current &&
        link instanceof HTMLElement
      ) {
        //class active needed for styling as well as focus to prevent negative interaction if using both clicking + scrolling
        link.classList.add('active-link');
      } else if (this.current === '' && link instanceof HTMLElement) {
        sideNavLinks[0].classList.add('active-link');
      }
    });
  }

  navBarData: ISideNavDataInterface[] = [];
  currentLanguage: string = '';
  mobile = false; // If window is under mobile view
  showMenu = true; // If show or hide side menu
  showActive = false; // If show active nav item
  navClassName = '';
  navStatus = 'nav-closed';
  barsIconConfig: IIconConfig = {
    FA_keywords: 'fa-regular fa-bars'
  };
  xmarkIconConfig: IIconConfig = {
    FA_keywords: 'fa-regular fa-x'
  };
  width: string = '100%'; // Width of component

  // Check if current url's fragment match
  readonly fragMatchOptions: IsActiveMatchOptions = {
    queryParams: 'ignored',
    matrixParams: 'exact',
    paths: 'exact',
    fragment: 'exact'
  };

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private navBarConfig: SideNavConfig,
    private slugify: SlugifyPipe,
    private renderer: Renderer2,
    private router: Router
  ) {
    if (el?.nativeElement?.className) {
      this.navClassName = el?.nativeElement?.classList[0];
    }
  }

  ngOnInit() {
    // See node_modules/@ircc-ca/ds-sdc-core/tokens/_sizes.scss:3
    this.currentLanguage = this.translate.currentLang;
    this.showActive = this.el?.nativeElement.classList[0] === 'left-nav';
    this.navBarData = this.navBarConfig.getRightNavBarConfig(this.rightNavLOVs);
    if (this.mobileToggleIcon) {
      this.toggleMobile();
    }
    this.adjustWidth();
    // Subscribe to url fragment change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check for anchor changes here
        const urlTree = this.router.parseUrl(event.url);
        this.current = urlTree.fragment ? urlTree.fragment : this.current;
        this.navigationEnd = true;
      }
    });
  }

  ngAfterViewInit() {
    if (window.location.hash != '') {
      const hashID = window.location.hash;
      const el: HTMLAnchorElement = document.querySelector(
        `a[href$='${hashID}']`
      ) as HTMLAnchorElement;
      const aTags: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
        '.rightnav a'
      ) as NodeListOf<HTMLAnchorElement>;
      if (el != aTags[aTags.length - 1]) {
        setTimeout(() => {
          el.click();
        }, 200);
      } else {
        window.scrollTo(0, document.body.scrollHeight);
      }
    }

    // Get section top margin by querying parent dom
    const sectionTopDiv = this.renderer
      .parentNode(this.el.nativeElement)
      .querySelector('app-title-slug-url > div.h2-heading-type');
    this.sectionTopMargin =
      parseFloat(getComputedStyle(sectionTopDiv).marginTop) > 0
        ? parseFloat(getComputedStyle(sectionTopDiv).marginTop)
        : 80;
    // Initiate fake scroll event on page load
    this.onWindowScroll(new Event('scroll'));
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
    // Record relative height from top of page for sidenav
    this.wrapperTop = this.el.nativeElement?.getBoundingClientRect().top;
  }

  private toggleMobile() {
    if (window.innerWidth <= 992) {
      this.mobile = true;
      this.showMenu = false;
      this.navStatus = 'nav-closed';
    } else {
      this.mobile = false;
      this.showMenu = true;
      this.navStatus = 'nav-open';
    }
  }

  /**
   * Grab width from parent element and bind it to child
   * If side nav does not show up, check if row is enabled in component style sheet.
   */
  private adjustWidth() {
    this.width =
      this.el.nativeElement.clientWidth > 0
        ? this.el.nativeElement.clientWidth.toString() + 'px'
        : '100%';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (this.mobileToggleIcon) {
      this.toggleMobile();
    }
    this.adjustWidth();
  }

  toggleMobileMenu(hideOnClickMobileView: boolean) {
    if (hideOnClickMobileView) {
      //minimize left nav after menu item clicked in mobileView
      if (this.mobile && this.navStatus === 'nav-open') {
        this.navStatus = 'nav-closed';
        this.showMenu = !this.showMenu;
      }
    } else {
      if (this.showMenu) {
        window.scrollTo(0, 0);
        this.navStatus = 'nav-closed';
        this.showMenu = !this.showMenu;
      } else {
        window.scrollTo(0, 0);
        this.showMenu = !this.showMenu;
        this.navStatus = 'nav-open';
      }
    }
  }

  getINavigationItemLinkFromISideNavData(
    data: ISideNavDataInterface
  ): INavigationItemLink {
    let anchor = this.translate.instant(data.path ?? '');
    anchor = this.slugify.transform(anchor);

    return {
      id: 'nav-item-' + anchor,
      href: '.',
      anchor: anchor,
      label: data.text,
      type: NavigationItemType.link,
      size: DSSizes.small,
      border: false,
      external: false,
      children: []
    };
  }
}
