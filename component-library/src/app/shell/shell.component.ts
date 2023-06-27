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

  imm5406: INavigationItemLink = {
    id: 'accordionNav',
    label: 'IMM 5406',
    type: 'link',
    children: [],
    href: '/en/developers',
    indicator: {
      status: 'neutral',
      icon: 'fa-solid fa-circle-half-stroke'
    },
    header: true
  };

  imm5669: INavigationItemLink = {
    id: 'accordionNav',
    label: 'IMM 5669',
    type: 'link',
    children: [],
    href: '/en/mahsa-en',
    indicator: {
      status: 'neutral',
      icon: 'fa-solid fa-circle'
    },
    header: true
  };

  accordionNav1: INavigationItemAccordion = {
    open: true,
    id: 'accordionNav',
    label: 'Required forms',
    type: 'accordion',
    icon: 'fa-solid fa-circle-half-stroke',
    children: [this.imm5406, this.imm5669]
  };

  imm008: INavigationItemLink = {
    id: 'accordionNav',
    label: 'IMM 0008',
    type: 'link',
    children: [],
    href: '/en/overview',
    indicator: {
      status: 'neutral',
      icon: 'fa-regular fa-circle'
    },
    header: true
  };
  accordionNav: INavigationItemAccordion = {
    open: true,
    id: 'accordionNav',
    label: 'Required forms',
    type: 'accordion',
    children: [this.imm008, this.accordionNav1]
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
    height: '50vh',
    marginTop: 182,
    scrolling: false,
    navigationConfig: [this.accordionNav, this.requiredPDF, this.addForms]
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
