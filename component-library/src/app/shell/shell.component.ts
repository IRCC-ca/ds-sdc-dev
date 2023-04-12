import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { Location } from '@angular/common';
import { LanguageSwitchButtonService } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  /** String for storing the URL of the page with the alternative language set */
  altLangURL: string = '';
  altPathKey: string = '';

  /** Boolean for whether the current window size is mobile or not */
  isMobile = false;

  constructor(
    private translate: TranslateService,
    private altLang: LanguageSwitchService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private location: Location,
    private languageSwitchButton: LanguageSwitchButtonService
  ) {}

  /** Sets the alt language string and subscribes to language changes that occur if the link is clicked */
  ngOnInit() {
    this.altLang.getAltLangLink().subscribe((altLang: string) => {
      this.altPathKey = altLang;
      this.setAltLangURL();
      console.log(this.altLangURL);
    });

    this.languageSwitchButton.languageClickObs$.subscribe((response) => {
      if (response) this.changeLang(); //Has to ignore the first response.
    });
  }

  /** Toggles language without reloading component */
  //This currently uses both 'en' and 'en-US' language values, sine in some cases, en is provided in initial load
  changeLang() {
    const curLang = this.translate.currentLang;
    this.translate.use(
      curLang === 'en-US' || curLang === 'en' ? 'fr-FR' : 'en-US'
    );
    // Changes the html lang attribute
    console.log(curLang === 'en-US' || curLang === 'en' ? 'fr' : 'en');
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

  /** Required to implement OnDestroy, which triggers the UnitDestroyed function */
  ngOnDestroy() {}
}
