import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IProgressIndicatorConfig } from 'ircc-ds-angular-component-library';
import { AccessbilityDemoFormStateService } from '../accessbility-demo-form-state.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageSwitchService } from '../../@shared/language-switch/language-switch.service';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';

@Component({
  selector: 'app-accessibility-demo-next-page',
  templateUrl: './accessibility-demo-next-page.component.html',
  styleUrls: ['./accessibility-demo-next-page.component.scss']
})
export class AccessibilityDemoNextPageComponent implements OnInit {
  routerSub?: Subscription;
  progressIndicatorSub?: Subscription;
  progressIndicatorConfig: IProgressIndicatorConfig = {
    id: ''
  };
  altPathKey = '';
  altLangURL = '';

  constructor(
    private router: Router,
    private progressIndicator: AccessbilityDemoFormStateService,
    private translate: TranslateService,
    private altLang: LanguageSwitchService,
    private lang: LangSwitchService
  ) {}

  ngOnInit() {
    this.lang.setAltLangLink('AccessibilityDemoNext');
    // this.lang.getAltLangLink().subscribe((altLang: string) => {
    //   this.altPathKey = altLang;
    //   this.setAltLangURL();
    //   console.log(this.altLangURL);
    // });

    this.progressIndicator.updateSelected(2);
    //if the page has moved to this one via a back or forward browser button, this detects the move and updates the page.
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const tempConfig = this.progressIndicatorConfig;
        tempConfig.selected = 1;
        this.progressIndicator.updateProgressIndicator(tempConfig);
      }
    });

    this.progressIndicatorSub =
      this.progressIndicator.progressIndicatorObs$.subscribe((response) => {
        this.progressIndicatorConfig = response;
      });
  }

  progressTabButtonEvent(event: Event) {
    const eventInt = parseInt(event.toString());
    if (this.progressIndicatorConfig.selected !== undefined) {
      if (eventInt !== this.progressIndicatorConfig.selected) {
        switch (eventInt) {
          case 0:
            if (this.router.url !== this.getPreviousButtonLink)
              this.router.navigateByUrl(this.getPreviousButtonLink);
            break;

          case 1:
            console.log(this.router.url, this.getMainPageLink);
            if (this.router.url !== this.getMainPageLink)
              this.router.navigateByUrl(this.getMainPageLink);
            break;

          case 2:
            if (this.router.url !== this.getNextButtonLink)
              this.router.navigateByUrl(this.getNextButtonLink);
            break;
        }
      }
    }
  }

  /**
   * Getter for the previous page button
   */
  get getPreviousButtonLink() {
    return (
      this.translate.currentLang +
      '/' +
      this.translate.instant('ROUTES.AccessibilityDemoPrevious')
    );
  }

  get getNextButtonLink() {
    return (
      this.translate.currentLang +
      '/' +
      this.translate.instant('ROUTES.AccessibilityDemoNext')
    );
  }

  /**
   * Getter for the main page link
   */
  get getMainPageLink() {
    const curLang = this.translate.currentLang;
    this.translate.use(
      curLang === 'en-US' || curLang === 'en' ? 'en-US' : 'fr-FR'
    );
    const lang = curLang === 'en-US' || curLang === 'en' ? 'en' : 'fr';
    console.log(
      '327',
      curLang,
      '/' + lang + '/' + this.translate.instant('ROUTES.AccessibilityDemo')
    );

    // return ''
    return (
      '/' + lang + '/' + this.translate.instant('ROUTES.AccessibilityDemo')
    );
  }

  /*************** LANGUAGE FUNCTIONS ********************/

  /** Toggles language without reloading component */
  //This currently uses both 'en' and 'en-US' language values, sine in some cases, en is provided in initial load
  changeLang() {
    const curLang = this.translate.currentLang;
    this.translate.use(
      curLang === 'en-US' || curLang === 'en' ? 'fr-FR' : 'en-US'
    );
    // Changes the html lang attribute
    // console.log((curLang === "en-US") || (curLang === 'en') ? 'fr' : 'en');
    document.documentElement.lang =
      curLang === 'en-US' || curLang === 'en' ? 'fr' : 'en';
    // Pushes page into history to allow the use of the 'Back' button on browser
    window.history.pushState('', '', this.altLangURL);
    this.setAltLangURL();
    console.log(this.altLangURL, this.altPathKey);
  }

  //Alt-language url key must be in the corresponding language, but have the french work
  setAltLangURL() {
    console.log(this.translate.currentLang);
    this.altLangURL =
      this.translate.currentLang === 'en-US' ||
      this.translate.currentLang === 'en'
        ? 'fr'
        : 'en';
    this.getAltLanguageValues();

    if (this.altPathKey)
      this.altLangURL +=
        '/' + this.translate.instant('ROUTES.' + this.altPathKey);
  }

  /**
   * Generates an alt-language path based on the current url and the translate values. Currently not the best
   * code in the world and should likely be refactored.
   */
  getAltLanguageValues() {
    const urlParts = this.router.url.split('/');
    const translateIndex = Object.keys(this.translate.translations).indexOf(
      urlParts[1]
    );
    const translateValues = (
      Object.values(this.translate.translations)[translateIndex] as any
    ).ROUTES;
    const translatedURLPieces: string[] = [];
    urlParts.forEach((val: string, index: number) => {
      if (index > 1) {
        const i = Object.values(translateValues as any).indexOf(val);
        translatedURLPieces.push(Object.keys(translateValues as any)[i]);
      }
    });
    translatedURLPieces.forEach((piece) => {
      //Operates on the assumption that the alt route is the same as the route, but with '-alt' appended
      const k = this.translate.instant('ROUTES.' + piece + '-alt');
      if (this.translate.instant('ROUTES.' + this.altPathKey) !== k) {
        this.altLangURL += '/' + k;
      }
    });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    this.progressIndicatorSub?.unsubscribe();
  }
}
