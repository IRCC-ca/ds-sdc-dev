import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  AfterViewChecked
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
import { IsActiveMatchOptions } from '@angular/router';

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
export class SideNavComponent implements OnInit, AfterViewChecked {
  @Input() mobileToggleIcon: boolean = false; // If display toggle menu icon
  @Input() navBarData: ISideNavDataInterface[] = [];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let current = '';
    //calculating real height of scrollable content
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const sideNavTitles = document.querySelectorAll('h2');
    const sideNavLinks = document.querySelectorAll('.right-nav a');
    //runs through sections to locate TOP of each heading
    sideNavTitles.forEach((section) => {
      const sectionTop = section.offsetTop;
      //content begins 215px below sectionTop. Set current when scrollY passes top of section.
      if (window.scrollY >= sectionTop - 215 && window.scrollY != height)
        current = `${section.getAttribute('id')}`;
    });
    //set current to lowest section is scroll is at bottom of content
    if (window.scrollY >= height)
      current = `${sideNavTitles[sideNavTitles.length - 1].getAttribute('id')}`; //runs through links to set current active link
    sideNavLinks.forEach((link) => {
      link.classList.remove('active');
      //blur required to remove focus from previous link if it was clicked
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
      if (
        current != '' &&
        link.getAttribute('href')?.endsWith(current) &&
        link instanceof HTMLElement
      ) {
        //class active needed for styling as well as focus to prevent negative interaction if using both clicking + scrolling
        link.classList.add('active');
        link.focus();
      }
    });
  }

  currentLanguage: string = '';
  mobile = false; // If window is under mobile view
  showMenu = true; // If show or hide side menu
  showActive = false; // If show active nav item
  navClassName = '';
  navStatus = 'nav-closed';
  barsIconConfig: IIconConfig = {
    unicode: 'f0c9',
    fontFamily: 'fa-light'
  };
  xmarkIconConfig: IIconConfig = {
    unicode: 'f00d',
    fontFamily: 'fa-light'
  };
  width: string = '100%'; // Width of component

  // Check if current url's fragment match
  readonly fragMatchOptions: IsActiveMatchOptions = {
    queryParams: 'ignored',
    matrixParams: 'exact',
    paths: 'exact',
    fragment: 'exact'
  };

  constructor(private el: ElementRef, private translate: TranslateService) {
    if (el?.nativeElement?.className) {
      this.navClassName = el?.nativeElement?.classList[0];
    }
  }

  ngOnInit() {
    // See node_modules/@ircc-ca/ds-sdc-core/tokens/_sizes.scss:3
    this.currentLanguage = this.translate.currentLang;
    this.showActive = this.el?.nativeElement.classList[0] === 'left-nav';
    if (this.mobileToggleIcon) {
      this.toggleMobile();
    }
    this.adjustWidth();
  }

  ngAfterViewChecked() {
    //fake scroll event when ViewChecked to give focus and active to top link (if not navigating by heading ID)
    dispatchEvent(new CustomEvent('scroll'));
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
}
