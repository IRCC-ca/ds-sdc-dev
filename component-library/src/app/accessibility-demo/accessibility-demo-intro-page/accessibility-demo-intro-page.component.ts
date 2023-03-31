import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IButtonConfig } from 'ircc-ds-angular-component-library';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';


@Component({
  selector: 'app-accessibility-demo-intro-page',
  templateUrl: './accessibility-demo-intro-page.component.html',
  styleUrls: ['./accessibility-demo-intro-page.component.scss']
})
export class AccessibilityDemoIntroPageComponent implements OnInit {

  introBtnConfig : IButtonConfig = {
    id: 'intro_btn'
  }
  altPathKey = '';
  altLangURL = '';

  navToDemo() {
    this.router.navigateByUrl(this.getMainPageLink);
  }

  constructor(private router: Router,
    private translate: TranslateService,
    private altLang: LanguageSwitchService,
  ) { }
  ngOnInit() {
    //Set orientation of the progress bar and get initial window width
    this.altLang.setAltLangLink('AccessibilityDemoIntro-alt');
    this.altLang.getAltLangLink().subscribe((altLang: string) => {
      this.altPathKey = altLang;
      this.setAltLangURL();
      console.log(this.altLangURL);
    });
  }

  get getMainPageLink() {
    const curLang = this.translate.currentLang;
    this.translate.use((curLang === 'en-US') || (curLang === 'en') ? 'en-US' : 'fr-FR');
    const lang = ((curLang === 'en-US') || (curLang === 'en') ? 'en' : 'fr');
    console.log('327', curLang, ('/' + lang + '/' + this.translate.instant('ROUTES.AccessibilityDemo')))

    // return ''
    return ('/' + lang + '/' + this.translate.instant('ROUTES.AccessibilityDemo'));
  }

  /*************** LANGUAGE FUNCTIONS ********************/


  /** Toggles language without reloading component */
  //This currently uses both 'en' and 'en-US' language values, sine in some cases, en is provided in initial load
  changeLang() {
    const curLang = this.translate.currentLang;
    this.translate.use((curLang === 'en-US') || (curLang === 'en') ? 'fr-FR' : 'en-US');
    // Changes the html lang attribute
    // console.log((curLang === "en-US") || (curLang === 'en') ? 'fr' : 'en');
    document.documentElement.lang = ((curLang === "en-US") || (curLang === 'en') ? 'fr' : 'en');
    // Pushes page into history to allow the use of the 'Back' button on browser
    window.history.pushState('', '', this.altLangURL);
    this.setAltLangURL();
    console.log(this.altLangURL, this.altPathKey);
  }

  //Alt-language url key must be in the corresponding language, but have the french work
  setAltLangURL() {
    console.log(this.translate.currentLang);
    this.altLangURL = ((this.translate.currentLang === "en-US") || (this.translate.currentLang === 'en') ? 'fr' : 'en');
    this.getAltLanguageValues();

    if (this.altPathKey) this.altLangURL += '/' + this.translate.instant('ROUTES.' + this.altPathKey);
  }

  /**
* Generates an alt-language path based on the current url and the translate values. Currently not the best
* code in the world and should likely be refactored.
*/
  getAltLanguageValues() {
    const urlParts = this.router.url.split('/');
    const translateIndex = Object.keys(this.translate.translations).indexOf(urlParts[1]);
    const translateValues = (Object.values(this.translate.translations)[translateIndex] as any).ROUTES;
    let translatedURLPieces: string[] = [];
    urlParts.forEach((val: string, index: number) => {
      if (index > 1) {
        let i = Object.values((translateValues as any)).indexOf(val);
        translatedURLPieces.push(Object.keys(translateValues as any)[i]);
      }
    });
    translatedURLPieces.forEach(piece => {
      //Operates on the assumption that the alt route is the same as the route, but with '-alt' appended
      let k = this.translate.instant('ROUTES.' + piece + '-alt');
      if (this.translate.instant('ROUTES.' + this.altPathKey) !== k) {
        this.altLangURL += ('/' + k);
      }
    });
  }
}
