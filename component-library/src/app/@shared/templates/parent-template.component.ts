import { Component, OnInit } from '@angular/core';
import { StandAloneFunctions } from 'ircc-ds-angular-component-library';
import { LanguageSwitchService } from '../language-switch/language-switch.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

export class ParentTemplateComponent {
  currentBaseUrl: string = '';
  language: string = '';
  baseUrlKey: string = '';
  altPathKey: string = '';
  altLangURL: string = '';

  constructor(
    protected altLang: LanguageSwitchService,
    protected translate: TranslateService,
    protected standAloneFunctions: StandAloneFunctions,
    protected router: Router
  ) {}

  getLanguage() {
    const curLang = this.translate.currentLang;
    this.language = curLang === 'en-US' || curLang === 'en' ? 'en' : 'fr';
  }

  getURL() {
    const curLang = this.translate.currentLang;
    const langKey = curLang === 'en-US' || curLang === 'en' ? 'en' : 'fr';
    const i = window.location.href.slice(
      window.location.href.indexOf(langKey),
      window.location.href.length
    );

    return i;
  }

  setAltLangSetting(altLink: string) {
    this.altLang.setAltLangLink(altLink);
    this.altLang.getAltLangLink().subscribe((altLang: string) => {
      this.altPathKey = altLang;
      this.setAltLangURL();
    });
  }

  //Alt-language url key must be in the corresponding language, but have the french work
  setAltLangURL() {
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

  setBaseUrl() {
    this.currentBaseUrl = '';
    const i = this.getURL().split('/');

    i.forEach((j: string, index: number) => {
      if (index !== i.length - 1) {
        this.currentBaseUrl += '/' + j;
      } else if (j === this.translate.instant(this.baseUrlKey || '')) {
        this.currentBaseUrl += '/' + j;
      }
    });

    if (this.currentBaseUrl[this.currentBaseUrl.length] !== '/')
      this.currentBaseUrl += '/';
  }
}
