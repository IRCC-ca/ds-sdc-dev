import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SideNavConfig } from '../side-nav/side-nav.config';
import { ISideNavDataInterface } from '../side-nav/side-nav.model';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import { LanguageSwitchButtonService } from "ircc-ds-angular-component-library";
import { LangSwitchService } from "../share/lan-switch/lang-switch.service";
import { DisplayLanguages, Languages } from "../share/global-params";

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

  constructor(
    private translate: TranslateService,
    private altLang: LangSwitchService,
    private languageSwitchButton: LanguageSwitchButtonService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private navBarConfig: SideNavConfig
  ) {
    this.leftNavData = navBarConfig.getLeftNavBarConfig();
  }

  ngOnInit(): void {
    this.onResize()

    this.altLang.getAltLangLink().subscribe((altLang: string) => {
      this.altPathKey = altLang;
      this.setAltLangURL();
    });

    this.languageSwitchButton.languageClickObs$.subscribe(response => {
      if (response) this.changeLang(); //Has to ignore the first response.
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 992 ) {
      this.mobile = true;
      this.navStatus = 'nav-closed';
    }
    else {
      this.mobile = false;
      this.navStatus = 'nav-open';
    }
  }

  /** Toggles language without reloading component */
  changeLang() {
    // e.preventDefault();
    // Swaps language
    const curLang = this.translate.currentLang;
    this.translate.use(curLang === Languages.English ? Languages.French : Languages.English);
    // Changes the html lang attribute
    document.documentElement.lang = (curLang === Languages.English ? Languages.French : Languages.English);
    // Pushes page into history to allow the use of the 'Back' button on browser
    window.history.pushState('', '', this.altLangURL);
    this.setAltLangURL();

    this.router.navigateByUrl(this.altLangURL);
    this.changeLangStr();
  }

  setAltLangURL() {
    this.altLangURL = this.translate.currentLang ?? Languages.English;
    if (this.altPathKey) this.altLangURL += '/' + this.translate.instant('ROUTES.' + this.altPathKey);
  }

  /** Change display string of language **/
  changeLangStr() {
    const curLang = this.translate.currentLang;
    if (this.mobile) {
      curLang === Languages.English ? this.language = DisplayLanguages.FR : this.language = DisplayLanguages.EN;
    } else {
      curLang === Languages.English ? this.language = DisplayLanguages.French : this.language = DisplayLanguages.English;
    }
  }
}
