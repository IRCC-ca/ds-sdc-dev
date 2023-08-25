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
  DSSizes,
  NavigationItemType,
  LanguageHeaderFooterSwitchService,
  NavigationService
} from 'ircc-ds-angular-component-library';
import { LangSwitchService } from '../share/lan-switch/lang-switch.service';
import { DisplayLanguages, Languages } from '../share/global-params';
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

  forDeveloperPage: INavigationItemLink = {
    id: 'forDeveloperPagenNavItem',
    label: 'For developers',
    type: 'link',
    children: [],
    href: 'ROUTES.forDevelopers'
  };

  forDesignersPage: INavigationItemLink = {
    id: 'forDesignersPageNavItem',
    label: 'For designers',
    type: 'link',
    children: [],
    href: 'ROUTES.forDesigners'
  };

  requestFormPage: INavigationItemLink = {
    id: 'requestFormPageNavItem',
    label: ' Submit a request ',
    type: 'link',
    children: [],
    href: 'ROUTES.requestForm'
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

  multiCheckboxPage: INavigationItemLink = {
    id: 'multiCheckboxPageNavItem',
    label: ' Multi Checkbox ',
    type: 'link',
    children: [],
    href: 'ROUTES.multiCheckbox'
  };

  checkboxPage: INavigationItemLink = {
    id: 'checkboxPageNavItem',
    label: ' Checkbox ',
    type: 'link',
    children: [],
    href: 'ROUTES.checkbox'
  };

  spinnerPage: INavigationItemLink = {
    id: 'spinnerPageNavItem',
    label: ' Spinner ',
    type: 'link',
    children: [],
    href: 'ROUTES.spinner'
  };

  autoCompletePage: INavigationItemLink = {
    id: 'autoCompletePageNavItem',
    label: ' AutoComplete ',
    type: 'link',
    children: [],
    href: 'ROUTES.autocomplete'
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
      this.autoCompletePage,
      this.bannerPage,
      this.buttonsPage,
      this.datePickerPage,
      this.iconBtnPage,
      this.checkboxPage,
      this.spinnerPage,
      this.inputPage
    ]
  };

  supportNav: INavigationItemAccordion = {
    open: true,
    id: 'supportNavAccordian',
    label: 'Support',
    type: 'accordion',
    children: [this.requestFormPage]
  };

  requiredPDF: INavigationItemLink = {
    id: 'accordionNav',
    label: 'Required PDF Forms',
    type: 'link',
    children: [],
    href: '/en/naseer-en',
    header: true
  };

  addForms: INavigationItemLink = {
    id: 'accordionNav',
    label: 'Additonal Forms',
    type: 'link',
    children: [],
    href: '/en/bobby-en',
    header: true
  };

  navConfig: INavigationConfig = {
    id: 'shell_nav',
    size: 'small',
    height: '100vh',
    marginTop: 182,
    scrolling: true,
    fixed: true,
    navigationConfig: [
      this.gettingStartedNav,
      this.foundationsNav,
      this.componentNav,
      this.supportNav
    ]
  };

  randomHeader: string = '';
  randomFooter: string = '';

  constructor(
    private translate: TranslateService,
    private altLang: LangSwitchService,
    private languageSwitchButton: LanguageHeaderFooterSwitchService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private navBarConfig: SideNavConfig,
    private navService: NavigationService
  ) {}

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
