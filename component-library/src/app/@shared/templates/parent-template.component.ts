import { Component, OnInit } from '@angular/core';
import { StandAloneFunctions } from 'ircc-ds-angular-component-library';
import { LanguageSwitchService } from '../language-switch/language-switch.service';
import { TranslateService } from '@ngx-translate/core';

export class ParentTemplateComponent {
  currentBaseUrl: string = '';
  language: string = '';
  baseUrlKey: string = '';

  constructor(
    protected altLang: LanguageSwitchService,
    protected translate: TranslateService,
    protected standAloneFunctions: StandAloneFunctions
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
