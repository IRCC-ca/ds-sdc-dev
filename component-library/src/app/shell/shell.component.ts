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
import { environment } from '../../environments/environment';

import {
  INavigationConfig,
  INavigationItemLink,
  INavigationItemAccordion
} from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  dateModified = environment.dateModified;
  title = 'ds-sdc-doc';
  leftNavData: ISideNavDataInterface[];
  mobile = false;
  navStatus = 'nav-open';
  public innerWidth: any; // Width of viewport window
  /** String for storing the URL of the page with the alternative language set */
  altLangURL: string = '';
  altPathKey: string = '';
  language: string = this.translate.currentLang;

  overviewPage: INavigationItemLink = {
    id: 'overviewPageNavItem',
    label: ' Overview ',
    type: 'link',
    children: [],
    href: 'ROUTES.overview'
  };

  forDeveloperPageAnchorOne: INavigationItemLink = {
    id: 'forDeveloperPageStartedNavItem',
    label: 'Getting Started',
    type: 'link',
    children: [],
    href: 'ROUTES.forDevelopers',
    anchor: 'getting-started'
  };

  forDeveloperPageAnchorTwo: INavigationItemLink = {
    id: 'forDeveloperPageUsageNavItem',
    label: 'Usage',
    type: 'link',
    children: [],
    href: 'ROUTES.forDevelopers',
    anchor: 'usage'
  };

  forDeveloperPage: INavigationItemLink = {
    id: 'forDeveloperPagenNavItem',
    label: 'For developers',
    type: 'link',
    children: [this.forDeveloperPageAnchorOne, this.forDeveloperPageAnchorTwo],
    href: 'ROUTES.forDevelopers'
  };

  forDesignersPage: INavigationItemLink = {
    id: 'forDesignersPageNavItem',
    label: 'For designers',
    type: 'link',
    children: [],
    href: 'ROUTES.forDesigners'
  };

  utilPage: INavigationItemLink = {
    id: 'utilPageNavItem',
    label: ' Utilities ',
    type: 'link',
    children: [],
    href: 'ROUTES.utilities'
  };

  buttonsPage: INavigationItemLink = {
    id: 'buttonsPageNavItem',
    label: ' Buttons ',
    type: 'link',
    children: [],
    href: 'ROUTES.buttons'
  };

  bannerPage: INavigationItemLink = {
    id: 'bannerPageNavItem',
    label: ' Banner ',
    type: 'link',
    children: [],
    href: 'ROUTES.banner'
  };

  inputPage: INavigationItemLink = {
    id: 'inputPageNavItem',
    label: ' Input ',
    type: 'link',
    children: [],
    href: 'ROUTES.input'
  };

  datePickerPage: INavigationItemLink = {
    id: 'datePickerPageNavItem',
    label: ' Date Picker ',
    type: 'link',
    children: [],
    href: 'ROUTES.datePicker'
  };

  iconBtnPage: INavigationItemLink = {
    id: 'iconBtnPageNavItem',
    label: ' Icon Button ',
    type: 'link',
    children: [],
    href: 'ROUTES.iconButton'
  };

  gettingStartedNav: INavigationItemAccordion = {
    open: true,
    id: 'gettingStartedNavAccordian',
    label: 'Getting Started',
    type: 'accordion',
    children: [this.overviewPage, this.forDeveloperPage, this.forDesignersPage]
  };

  foundationsNav: INavigationItemAccordion = {
    open: true,
    id: 'foundationsNavAccordian',
    label: 'Foundations',
    type: 'accordion',
    children: [this.utilPage]
  };

  componentNav: INavigationItemAccordion = {
    open: true,
    id: 'componentNavAccordian',
    label: 'Components',
    type: 'accordion',
    children: [
      this.buttonsPage,
      this.bannerPage,
      this.inputPage,
      this.datePickerPage,
      this.iconBtnPage
    ]
  };

  mahsaNav: INavigationItemLink = {
    id: 'mahsaNav',
    label: 'Mahsa',
    type: 'link',
    children: [],
    href: '/en/mahsa-en'
  };
  michaelNav: INavigationItemLink = {
    id: 'michaelNav',
    label: 'Michael',
    type: 'link',
    children: [],
    href: '/en/michael-en'
  };

  mikeNav: INavigationItemLink = {
    id: 'mikeNav',
    label: 'Mike',
    type: 'link',
    children: [],
    href: '/en/mike-en'
  };

  naseerNav: INavigationItemLink = {
    id: 'naseerNav',
    label: 'Naseer',
    type: 'link',
    children: [],
    href: '/en/naseer-en'
  };

  bobbyNav: INavigationItemLink = {
    id: 'bobbyNav',
    label: 'Bobby',
    type: 'link',
    children: [],
    href: '/en/bobby-en'
  };

  qaNav: INavigationItemAccordion = {
    open: true,
    id: 'QA',
    label: 'QA Pages',
    type: 'accordion',
    children: [
      this.mahsaNav,
      this.michaelNav,
      this.mikeNav,
      this.naseerNav,
      this.bobbyNav
    ]
  };

  navConfig: INavigationConfig = {
    id: 'shell_nav',
    size: 'small',
    height: '50vh',
    marginTop: 182,
    scrolling: false,
    navigationConfig: [
      this.gettingStartedNav,
      this.foundationsNav,
      this.componentNav,
      this.qaNav
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
