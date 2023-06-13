import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {
  LanguageSwitchButtonService,
  NavigationService
} from 'ircc-ds-angular-component-library';
import { LangSwitchService } from '../share/lan-switch/lang-switch.service';
import { DisplayLanguages, Languages } from '../share/global-params';
import { ISideNavDataInterface } from '@app/components/side-nav/side-nav.model';
import { SideNavConfig } from '@app/components/side-nav/side-nav.config';

import {
  INavigationConfig,
  INavigationItemLink,
  INavigationItemAccordion,
  INavigationItemHeading,
  INavigationDivider,
  INavigationIndicator
} from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  title = 'ds-sdc-doc';
  leftNavData: ISideNavDataInterface[];
  mobile = false;
  navStatus = 'nav-open';
  public innerWidth: any; // Width of viewport window
  /** String for storing the URL of the page with the alternative language set */
  altLangURL: string = '';
  altPathKey: string = '';
  language: string = this.translate.currentLang;

  itemAA: INavigationItemLink = {
    label: 'Overview.Heading',
    href: 'ROUTES.overview',
    external: false,
    id: 'Overview.Heading',
    icon: 'fa-regular fa-user',
    trailingIcon: 'fa-regular fa-arrow-right',
    type: 'link',
    children: [],
    indicator: { status: 'information', icon: 'fa-regular fa-circle' }
  };

  itemDivider: INavigationDivider = {
    id: '',
    label: '',
    type: 'divider',
    children: []
  };

  itemAB: INavigationItemLink = {
    label: 'Designers.Heading',
    href: 'ROUTES.forDesigners',
    id: 'Designers.Heading',
    icon: '',
    type: 'link',
    children: []
  };
  itemAC: INavigationItemLink = {
    label: 'Overview.DeveloperHeading',
    href: 'ROUTES.forDevelopers',
    anchor: 'themes',
    id: 'Overview.DeveloperHeading',
    icon: '',
    type: 'link',
    children: []
  };
  itemA: INavigationItemHeading = {
    id: 'GetStartedHeading',
    label: 'Developers.GetStartedHeading',
    icon: 'fa-light fa-basketball',
    type: 'heading',
    children: []
  };

  michael: INavigationItemLink = {
    label: 'michael',
    href: 'ROUTES.michael',
    id: 'michael',
    icon: '',
    type: 'link',
    children: []
  };

  naseer: INavigationItemLink = {
    label: 'naseer',
    href: 'ROUTES.naseer',
    id: 'naseer',
    icon: '',
    type: 'link',
    children: []
  };

  mike: INavigationItemLink = {
    label: 'mike',
    href: 'ROUTES.mike',
    id: 'mike',
    icon: '',
    type: 'link',
    children: []
  };
  bobby: INavigationItemLink = {
    label: 'bobby',
    href: 'ROUTES.bobby',
    id: 'bobby',
    icon: '',
    type: 'link',
    children: []
  };

  mashsa: INavigationItemLink = {
    label: 'mahsa',
    href: 'ROUTES.mahsa',
    id: 'mahsa',
    icon: '',
    type: 'link',
    children: [this.michael, this.naseer, this.mike]
  };

  accessibility: INavigationItemLink = {
    label: 'Accessibility Demo',
    href: '/en/accessibility-demo',
    id: 'accessibility',
    icon: '',
    type: 'link',
    children: []
  };

  banner: INavigationItemLink = {
    label: 'Banner Documentation',
    href: '/en/banner-doc',
    id: 'banner',
    icon: '',
    type: 'link',
    children: []
  };

  codeview: INavigationItemLink = {
    label: 'Code Viewer',
    href: '/en/codeview',
    id: 'codeview',
    icon: '',
    type: 'link',
    children: []
  };

  button: INavigationItemLink = {
    label: 'Button Documentation',
    href: '/en/button-doc',
    id: 'button',
    icon: '',
    type: 'link',
    children: []
  };

  input: INavigationItemLink = {
    label: 'Input Documentation',
    href: '/en/input-documentation',
    id: 'input',
    icon: '',
    type: 'link',
    children: []
  };

  other: INavigationItemAccordion = {
    id: 'other',
    label: 'Other Pages',
    type: 'accordion',
    open: true,
    children: [
      this.accessibility,
      this.banner,
      this.codeview,
      this.button,
      this.input
    ]
  };

  itemQA: INavigationItemAccordion = {
    id: 'qa',
    label: 'QA.header',
    type: 'accordion',
    children: [this.mashsa, this.michael, this.naseer, this.mike, this.bobby],
    open: true
  };

  navQATesting: INavigationItemHeading = {
    icon: '',
    id: 'header_link',
    label: 'Header Title',
    type: 'heading',
    children: []
  };

  navQATestingLinkOne: INavigationItemLink = {
    label: 'Nav Title',
    href: 'ROUTES.overview',
    id: 'input',
    icon: '',
    type: 'link',
    children: [],
    indicator: {
      status: 'critical',
      icon: 'fa-light fa-circle',
      label: 'Not Started'
    }
  };

  navQATestingLinkTwo: INavigationItemLink = {
    label: 'Nav Title',
    href: '/en/input-documentation',
    id: 'input',
    icon: '',
    type: 'link',
    children: [],
    indicator: {
      status: 'primary',
      icon: 'fa-solid fa-circle-half-stroke',
      label: 'Not Complete'
    }
  };

  navQATestingLinkThree: INavigationItemLink = {
    label: 'Nav Title',
    href: 'ROUTES.bobby',
    id: 'input',
    icon: '',
    type: 'link',
    children: [],
    indicator: {
      status: 'information',
      icon: 'fa-solid fa-circle',
      label: 'Complete'
    }
  };

  navQATestingLinkFour: INavigationItemLink = {
    label: 'Nav Title',
    href: 'ROUTES.michael',
    id: 'input',
    icon: '',
    type: 'link',
    children: [],
    indicator: {
      status: 'critical',
      icon: 'fa-light fa-circle',
      label: 'indicator'
    }
  };

  navQATestingLinkFive: INavigationItemLink = {
    label: 'Nav Title',
    href: 'ROUTES.mahsa',
    id: 'input',
    icon: 'fa-light fa-circle',
    type: 'link',
    children: []
  };

  navQATestingLinkSix: INavigationItemLink = {
    label: 'Nav Title',
    href: '/en/codeview',
    id: 'input',
    trailingIcon: 'fa-light fa-circle',
    type: 'link',
    children: []
  };

  navQATestingLinkSeven: INavigationItemLink = {
    label: 'Nav Title',
    href: 'ROUTES.mahsa',
    id: 'input',
    icon: 'fa-light fa-circle',
    trailingIcon: 'fa-light fa-circle',
    indicator: {
      status: 'information',
      icon: 'fa-light fa-circle',
      label: ''
    },
    type: 'link',
    children: []
  };

  navQATestingLinkLong: INavigationItemLink = {
    label: 'Nav TitleNav TitleNav TitleNav',
    href: 'https://google.com',
    external: true,
    id: 'input',
    icon: 'fa-light fa-circle',
    trailingIcon: 'fa-light fa-circle',
    indicator: {
      status: 'information',
      icon: 'fa-light fa-circle',
      label: 'indicator'
    },
    type: 'link',
    children: []
  };

  navQATestingLinkLongLong: INavigationItemLink = {
    label: 'Nav TitleNav TitleNav TitleNav',
    href: '/en/codeview',
    id: 'input',
    type: 'link',
    children: []
  };

  navQATestingLinkAccordion: INavigationItemLink = {
    label: 'Nav Title',
    href: 'https://google.com',
    external: true,
    id: 'input',
    type: 'link',
    children: []
  };

  navQATestingLinkStep: INavigationItemAccordion = {
    id: 'qa',
    label: 'Step Title',
    type: 'accordion',
    children: [
      this.navQATestingLinkAccordion,
      this.navQATestingLinkAccordion,
      this.navQATestingLinkAccordion,
      this.navQATestingLinkSeven
    ],
    open: true
  };

  navConfig: INavigationConfig = {
    id: 'shell_nav',
    size: 'small',
    label: 'Nav title',
    height: '90vh',
    marginTop: 182,
    iconLeading: 'fa-light fa-arrow-left',
    iconTrailing: 'fa-light fa-arrow-right',
    scrolling: true,
    navigationConfig: [
      // this.navQATesting,
      // this.navQATestingLinkOne,
      // this.navQATestingLinkTwo,
      // this.navQATestingLinkThree,
      // this.itemDivider,
      this.navQATestingLinkFour,
      this.navQATestingLinkFive,
      this.navQATestingLinkSix,
      this.itemDivider,
      this.navQATestingLinkSeven,
      this.navQATestingLinkLong,
      this.navQATestingLinkLongLong,
      this.navQATestingLinkStep
    ]
  };

  randomHeader: string = '';
  randomFooter: string = '';

  constructor(
    private translate: TranslateService,
    private altLang: LangSwitchService,
    private languageSwitchButton: LanguageSwitchButtonService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private navBarConfig: SideNavConfig,
    private navService: NavigationService
  ) {
    this.leftNavData = navBarConfig.getLeftNavBarConfig();
  }

  ngOnInit() {
    this.onResize();

    this.altLang.getAltLangLink().subscribe((altLang: string) => {
      this.altPathKey = altLang;
      this.setAltLangURL();
    });

    this.languageSwitchButton.languageClickObs$.subscribe((response) => {
      if (response) this.changeLang(); //Has to ignore the first response.
    });

    this.randomHeader = `//picsum.photos/id/${Math.floor(
      Math.random() * (1084 - 1) + 1
    )}/200/200`;

    this.randomFooter = `//picsum.photos/id/${Math.floor(
      Math.random() * (1084 - 1) + 1
    )}/200/200`;

    this.navService.setNavConfig(this.navConfig);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 992) {
      this.mobile = true;
      this.navStatus = 'nav-closed';
    } else {
      this.mobile = false;
      this.navStatus = 'nav-open';
    }
  }

  /** Toggles language without reloading component */
  changeLang() {
    // e.preventDefault();
    // Swaps language
    const curLang = this.translate.currentLang;
    this.translate.use(
      curLang === Languages.English ? Languages.French : Languages.English
    );
    // Changes the html lang attribute
    document.documentElement.lang =
      curLang === Languages.English ? Languages.French : Languages.English;
    // Pushes page into history to allow the use of the 'Back' button on browser
    window.history.pushState('', '', this.altLangURL);
    this.setAltLangURL();

    this.router.navigateByUrl(this.altLangURL);
    this.changeLangStr();
  }

  setAltLangURL() {
    this.altLangURL = this.translate.currentLang ?? Languages.English;
    if (this.altPathKey)
      this.altLangURL +=
        '/' + this.translate.instant('ROUTES.' + this.altPathKey);
  }

  /** Change display string of language **/
  changeLangStr() {
    const curLang = this.translate.currentLang;
    if (this.mobile) {
      curLang === Languages.English
        ? (this.language = DisplayLanguages.FR)
        : (this.language = DisplayLanguages.EN);
    } else {
      curLang === Languages.English
        ? (this.language = DisplayLanguages.French)
        : (this.language = DisplayLanguages.English);
    }
  }
}
