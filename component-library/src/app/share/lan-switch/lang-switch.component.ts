import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
// @ts-ignore
import en from '../../../assets/locales/en.json';
// @ts-ignore
import fr from '../../../assets/locales/fr.json';
import { LangSwitchService } from './lang-switch.service';
import { DisplayLanguages, Languages } from '../global-params';

@Component({
  selector: 'app-lan-switch',
  templateUrl: './lang-switch.component.html',
  styleUrls: ['./lang-switch.component.scss']
})
export class LangSwitchComponent implements OnInit {
  /** String for storing the URL of the page with the alternative language set */
  altLangURL: string = '';
  altPathKey: string = '';

  /** Boolean for whether the current window size is mobile or not */
  mobile = false;
  language: string = this.translate.currentLang;
  constructor(
    private translate: TranslateService,
    private altLang: LangSwitchService,
    private router: Router
  ) {
    // Embed languages to avoid extra HTTP requests
    translate.setTranslation(Languages.English, en);
    translate.setTranslation(Languages.French, fr);
  }

  ngOnInit() {
    this.altLang.getAltLangLink().subscribe((altLang: string) => {
      this.altPathKey = altLang;
      this.setAltLangURL();
    });
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.mobile = window.innerWidth <= 992;
    this.changeLangStr();
  }

  setAltLangURL() {
    this.altLangURL = this.translate.currentLang ?? Languages.English;
    if (this.altPathKey) {
      console.log('ROUTES.' + this.altPathKey);
      this.altLangURL +=
        '/' + this.translate.instant('ROUTES.' + this.altPathKey);
    }
  }

  /** Toggles language without reloading component */
  changeLang(e: Event) {
    e.preventDefault();
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
    // Force page reload so all the anchor still work
    window.location.replace(this.altLangURL);
    // this.router.navigateByUrl(this.altLangURL);
    this.changeLangStr();
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
