import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from './share/global-params';
// @ts-ignore
import en from '../assets/locales/en.json';
// @ts-ignore
import fr from '../assets/locales/fr.json';
import { isPlatformBrowser } from '@angular/common';

// https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
const isInViewport = (elem: Element) => {
  const bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'ds-sdc-doc';
  mobile = false;
  navStatus = 'nav-open';
  innerWidth: any; // Width of viewport window
  readonly HEADER_OFFSET = -190;
  readonly SCROLL_DELAY = 200;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private element: ElementRef,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    translate.setDefaultLang(Languages.English);
    translate.setTranslation(Languages.English, en);
    translate.setTranslation(Languages.French, fr);

    // Set initial language
    /**
     * Subscribe to router events because the init cycle for this component happens
     * before the router functionality
     */
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.translate.use(
          this.router.url.includes('/fr') ? Languages.French : Languages.English
        );
        //Sets the html language attribute to current language
        document.documentElement.lang = this.translate.currentLang.substring(
          0,
          2
        );
      }
      // https://gist.github.com/tkutcher/3863b53ea5bc2d766fb22a4b55cac6ca
      if (
        event instanceof Scroll &&
        event.anchor &&
        isPlatformBrowser(this.platformId)
      ) {
        setTimeout(() => {
          const targetElement = document.querySelector('#' + event.anchor);
          if (!targetElement) {
            window.scrollTo(0, 0);
          } else if (!isInViewport(targetElement)) {
            targetElement.scrollIntoView();
            window.scrollBy(0, this.HEADER_OFFSET);
          }
        }, this.SCROLL_DELAY);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // shadowRoot seems to be empty
      // const shadowRoot = this.element.nativeElement.shadowRoot;
      const tabbableElements: NodeListOf<Element> =
        this.element.nativeElement?.querySelectorAll(
          'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        );

      const tabOrder = Array.from(tabbableElements)
        .map((el) => {
          const tabIndex = el?.getAttribute('tabindex') || '0';
          return {
            element: el,
            order: parseInt(tabIndex, 10)
          };
        })
        .sort((a, b) => a.order - b.order)
        .map((el) => el.element);

      console.log(tabOrder);
    });
  }
}
